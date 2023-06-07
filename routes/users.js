const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/usermodel'); // Requiring user model

/* imports for forgot password */
const crypto = require('crypto');
const async =  require('async');
const nodemailer = require('nodemailer');

// checks if user is authenticated
function isAuthenticatedUser(req, res, next) {
    if (req.isAuthenticated()) {
        return next(); // 다음 middleware
    }

    req.flash('error_msg', 'Please Login first to access this page');
    res.redirect('/login');
}

// Get routes 
router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/dashboard', isAuthenticatedUser, (req, res) => {
    res.render('dashboard');
});

router.get('/logout', isAuthenticatedUser, (req, res, next) => {
    req.logOut(function(err) {
        if (err) {
            return next(err); 
        }
        req.flash('success_msg', 'You have been logged out');
        res.redirect('/login');
    });
});

router.get('/forgot', (req, res) => {
    res.render('forgot');
});

router.get('/reset/:token', (req, res) => {
    User.findOne({
        resetPasswordToken  : req.params.token,
         resetPasswordExpires : {$gt : Date.now()}
    }).then(user => {
        if (!user) {
            req.flash('error_msg', 'Password reset token is invalid or has been expired');
            res.redirect('/forgot');
        }

        res.render('newpassword', {token : req.params.token});
    })
    .catch(err => {
        req.flash('error_msg', 'ERROR: ' +err);
        res.redirect('/forgot');
    });
})

router.get('/password/change', isAuthenticatedUser,(req, res) => {
    res.render('changepassword');
})

// Post routes
router.post('/login', passport.authenticate('local', {
    successRedirect : '/dashboard',
    failureRedirect : '/login',
    failureFlash : 'Invalid email or password. Try Again!'
}));

router.post('/signup', (req, res) => {
    let {name, email, password} = req.body;

    let userData = {
        name : name,
        email : email,
    };

    /* passport가 자동적으로 password를 encrypt해서 DB에 넣는다고 함. 근데 어떻게?? */
    User.register(userData, password, (err, user) => {
        if(err) {
            req.flash('error_msg', 'ERROR :' + err);
            res.redirect('/signup');
        }

        passport.authenticate('local') (req, res, () => {
            req.flash('success_msg', 'Account created succesfully');
            res.redirect('/login');
        })
    });
})


router.post('/password/change', (req, res) => {
    if (req.body.password !== req.body.confirmpassword) {
        req.flash('error_msg', "Password don't match");
        return res.redirect('/password/change');
    }

    User.findOne({
        email : req.user.email
    })
    .then(user => {
        user.setPassword(req.body.password, err => {
            user.save()
            .then(user => {
                req.flash('error_msg', 'Password changed successfully');
                res.redirect('/dashboard');
            })
            .catch(err => {
                req.flash('error_msg', 'ERROR: ' + err);
                res.redirect('/password/change');
            })
        })
    })
})

// Routes to handle forgot password
router.post('/forgot', (req, res, next) => {
    let recoveryPassword = '';
    async.waterfall([
        (done) => {
            crypto.randomBytes(30, (err, buf) => {
                let token = buf.toString('hex'); // generate token
                done(err, token);
            })
        }, 
        (token, done) => {
            User.findOne({email : req.body.email}) // search user
                .then(user => {
                    if (!user) {
                        req.flash('error_msg', 'User does not exists with this email');
                        return res.redirect('/forgot');
                    }

                    // 유저가 존재할 시 토큰 생성
                    user.resetPasswordToken = token; 
                    user.resetPasswordExpires = Date.now() + 1800000; //  30분(millesecond)

                    // 토큰을 DB에 저장
                    user.save(err => {
                        done(err, token, user);
                    });
                })
                .catch(err => {
                    req.flash('error_msg', 'ERROR: ' + err);
                    res.redirect('/forgot');
                })
        },
        (token, user) => { /* 6/5problem: cannot send email via google because app password cannot be applied...  */
            let smtpTransport = nodemailer.createTransport({
                service: 'Gmail',
                auth : {
                    user : process.env.GMAIL_EMAIL,
                    pass : process.env.GMAIL_PASSWORD
                }
            });

            let mailOptions = {
                to: user.email,
                from : '1park4170@gmail.com',
                subject : 'Recovery Email from Auth Project',
                text : 'Please click the following link to recover your passoword: \n\n'+
                        'http://'+ req.headers.host +'/reset/'+token+'\n\n'+
                        'If you did not request this, please ignore this email.'
            };
            smtpTransport.sendMail(mailOptions, err=> {
                req.flash('success_msg', 'Email send with further instructions. Please check that.');
                res.redirect('/forgot');
            });
        }

    ], err => {
        if (err) res.redirect('/forgot');
    })
} );

router.post('/reset/:token', (req, res) => {
    async.waterfall([
        (done) => {
            User.findOne({
                resetPasswordToken  : req.params.token,
                resetPasswordExpires : {$gt : Date.now()}})
                .then(user => {
                    if (!user) {
                        req.flash('error_msg', 'Password reset token is invalid or has been expired');
                        res.redirect('/forgot');
                    }
                    
                    if (req.body.password !== req.body.confirmpassword) {
                        req.flash('error_msg', "Password don't match");
                        return res.redirect('/forgot');
                    }

                    user.setPassword(req.body.password, err => {
                        user.resetPasswordToken = undefined;  // 더이상 얘는 필요없음
                        user.resetPasswordExpires = undefined;

                        user.save(err => {
                            req.logIn(user, err => {
                                done(err, user);
                            })
                        });
                    });

                })
                .catch(err => {
                    req.flash('error_msg', 'ERROR: ' + err);
                    res.redirect('/forgot');
                })
        },

        (user) => {
            let smtpTransport = nodemailer.createTransport({
                service : 'Gmail',
                auth : {
                    user : process.env.GMAIL_EMAIL,
                    pass : process.env.GMAIL_PASSWORD
                }
            });

            let mailOptions = {
                to : user.email,
                from : '1park4170@gmail.com',
                subject : "Your password is changed",
                text : 'Hello, ' + user.name + '\n\n' +
                    'This is the confirmation that the password for your account ' + user.email + 'has been changed'
            };

            smtpTransport.sendMail(mailOptions, err => {
                req.flash('success_msg', 'Your password has been changed successfully');
                res.redirect('/login');
            })
        }

    ],err => {
        res.redirect('/login');
    })
})

module.exports = router;
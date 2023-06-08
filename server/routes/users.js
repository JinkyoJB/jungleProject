const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/usermodel'); // Requiring user model

/* imports for forgot password */
const crypto = require('crypto');
const async = require('async');
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
// router.get('/login', (req, res) => {
//     res.render('login');
// });

// router.get('/signup', (req, res) => {
//     res.render('signup');
// });

// router.get('/dashboard', isAuthenticatedUser, (req, res) => {
//     res.render('dashboard');
// });

/**
 * @swagger
 * /logout:
 *   get:
 *     tags:
 *      - user
 *     summary: Log out the current user
 *     description: This endpoint logs out the current user and return a status message
 *     responses:
 *       200:
 *         description: The user has been successfully logged out
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "logged out"
 *       500:
 *         description: There was an error logging out the user
 */
router.get('/logout', isAuthenticatedUser ,(req, res, next) => {
  req.logOut(function(err) {
    if (err) {
      return next(err);
    }
    req.flash('success_msg', 'You have been logged out');
    // res.redirect('/login');
    res.status(200).json({'message': 'logged out'});
  });
});

// router.get('/forgot', (req, res) => {
//     res.render('forgot');
// });

/**
 * @swagger
 * /reset/{token}:
 *   get:
 *     tags:
 *      - user
 *     summary: Reset user's password with provided token
 *     description: This endpoint validates the password reset token and sends a file for resetting the password
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: The password reset token
 *     responses:
 *       200:
 *         description: Sends a file for resetting the password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: The password reset token is invalid or expired
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Password reset token is invalid or expired"
 *       500:
 *         description: There was an error processing the reset token
 */
router.get('/reset/:token', (req, res) => {
  User.findOne({
    resetPasswordToken  : req.params.token,
    resetPasswordExpires : {$gt : Date.now()}
  }).then(user => {
    if (!user) {
      req.flash('error_msg', 'Password reset token is invalid or has been expired');
      // res.redirect('/forgot');
      res.status(400).json({'message': 'Password reset token is invalid or expired'});
    }

    // res.render('newpassword', {token : req.params.token});
    res.sendFile('newpassword', {token : req.params.token});
  })
    .catch(err => {
      req.flash('error_msg', 'ERROR: ' +err);
      res.status(400).json({'message': 'Password reset token is invalid or expired'});
      // res.redirect('/forgot');
    });
});

// router.get('/password/change', isAuthenticatedUser,(req, res) => {
//     res.render('changepassword');
// })

// Post routes

/**
 * @swagger
 * paths:
 *  /login:
 *   post:
 *    tags:
 *    - user
 *    description: 로그인
 *    parameters:
 *    - in: body
 *      name: body
 *      required: true
 *      schema:
 *       properties:
 *        email:
 *         type: string
 *        password:
 *         type: string
 *
 *    responses:
 *     200:
 *      description: 로그인 성공
 *      schema:
 *       properties:
 *        message:
 *         type: string
 *     400:
 *      description: 로그인 실패
 *      schema:
 *       properties:
 *        message:
 *         type: string
 *
 */
router.post('/login', passport.authenticate('local', {
  successRedirect : '/dashboard',
  failureRedirect : '/login',
  failureFlash : 'Invalid email or password. Try Again!'
}));

/**
 * @swagger
 * paths:
 *  /signup:
 *   post:
 *    tags:
 *    - user
 *    description: 회원가입
 *    parameters:
 *    - in: body
 *      name: body
 *      required: true
 *      schema:
 *       properties:
 *        name:
 *         type: string
 *        email:
 *         type: string
 *        password:
 *         type: string
 *
 *    responses:
 *     200:
 *      description: 회원가입 성공
 *      schema:
 *       properties:
 *        message:
 *         type: string
 *     400:
 *      description: 회원가입 실패
 *      schema:
 *       properties:
 *        message:
 *         type: string
 *
 */
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
      res.status(400).json({'message': err});
      // res.redirect('/signup');
    }

    passport.authenticate('local') (req, res, () => {
      req.flash('success_msg', 'Account created successfully');
      res.status(200).json({'message': 'Account created successfully'});

      // res.redirect('/login');
    });
  });
});

/**
 * @swagger
 * paths:
 *  /password/change:
 *   post:
 *    tags:
 *    - user
 *    description: 비밀번호 변경
 *    parameters:
 *    - in: body
 *      name: body
 *      required: true
 *      schema:
 *       properties:
 *        password:
 *         type: string
 *        confirmpassword:
 *         type: string
 *
 *    responses:
 *     200:
 *      description: 비밀번호 변경
 *      schema:
 *       properties:
 *        message:
 *         type: string
 *     400:
 *      description: 비밀번호 변경 실패
 *      schema:
 *       properties:
 *        message:
 *         type: string
 *
 */
router.post('/password/change', (req, res) => {
  if (req.body.password !== req.body.confirmpassword) {
    // req.flash('error_msg', "Password don't match");
    res.status(400).json({'message': 'Password don\'t match'});

    // return res.redirect('/password/change');
  }

  User.findOne({
    email : req.user.email
  })
    .then(user => {
      user.setPassword(req.body.password, err => {
        user.save()
          .then(user => {
            req.flash('error_msg', 'Password changed successfully');
            // res.redirect('/dashboard');
            res.status(200).json({'message': 'Password changed successfully'});
          })
          .catch(err => {
            // req.flash('error_msg', 'ERROR: ' + err);
            res.status(400).json({'message': 'ERROR: ' + err});

            // res.redirect('/password/change');
          });
      });
    });
});

/**
 * @swagger
 * paths:
 *  /forgot:
 *   post:
 *    tags:
 *    - user
 *    description: 비밀번호 찾기 이메일 전송
 *    parameters:
 *    - in: body
 *      name: body
 *      required: true
 *      schema:
 *       properties:
 *        email:
 *         type: string
 *
 *    responses:
 *     200:
 *      description: 메일 전송 성공
 *      schema:
 *       properties:
 *        message:
 *         type: string
 *     400:
 *      description: 메일 전송 실패
 *      schema:
 *       properties:
 *        message:
 *         type: string
 *
 */
// Routes to handle forgot password
router.post('/forgot', (req, res, next) => {
  let recoveryPassword = '';
  async.waterfall([
    (done) => {
      crypto.randomBytes(30, (err, buf) => {
        let token = buf.toString('hex'); // generate token
        done(err, token);
      });
    },
    (token, done) => {
      User.findOne({email : req.body.email}) // search user
        .then(user => {
          if (!user) {
            // req.flash('error_msg', 'User does not exists with this email');
            res.status(400).json({'message': 'ERROR: ' + err});
            return;
            // return res.redirect('/forgot');
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
          res.status(400).json({'message': 'ERROR: ' + err});

          // res.redirect('/forgot');
        });
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
        res.status(200).json({'message': 'Email send with further instructions. Please check that.'});

        // res.redirect('/forgot');
      });
    }

  ], err => {
    // if (err) res.redirect('/forgot');
    if (err) res.status(400).json({'message': 'cannot send email'});

  });
} );

/**
 * @swagger
 * paths:
 *  /reset/{token}:
 *   post:
 *     summary: Resets user password
 *     description: This endpoint allows for the resetting of a user's password, given a valid password reset token.
 *     tags:
 *       - user
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: The password reset token.
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             password:
 *               type: string
 *             confirmpassword:
 *               type: string
 *     responses:
 *       200:
 *         description: Password has been successfully reset.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Your password has been changed successfully"
 *       400:
 *         description: Error in resetting password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Password reset token is invalid or has been expired"
 */
router.post('/reset/:token', (req, res) => {
  async.waterfall([
    (done) => {
      User.findOne({
        resetPasswordToken  : req.params.token,
        resetPasswordExpires : {$gt : Date.now()}})
        .then(user => {
          if (!user) {
            req.flash('error_msg', 'Password reset token is invalid or has been expired');
            res.status(400).json({'message': 'Password reset token is invalid or has been expired'});

            // res.redirect('/forgot');
          }

          if (req.body.password !== req.body.confirmpassword) {
            req.flash('error_msg', 'Password don\'t match');
            res.status(400).json({'message': 'Password don\'t match'});

            // return res.redirect('/forgot');
          }

          user.setPassword(req.body.password, err => {
            user.resetPasswordToken = undefined; // 더이상 얘는 필요없음
            user.resetPasswordExpires = undefined;

            user.save(err => {
              req.logIn(user, err => {
                done(err, user);
              });
            });
          });

        })
        .catch(err => {
          req.flash('error_msg', 'ERROR: ' + err);
          res.status(400).json({'message': 'ERROR: ' + err});

          // res.redirect('/forgot');
        });
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
        subject : 'Your password is changed',
        text : 'Hello, ' + user.name + '\n\n' +
                    'This is the confirmation that the password for your account ' + user.email + 'has been changed'
      };

      smtpTransport.sendMail(mailOptions, err => {
        req.flash('success_msg', 'Your password has been changed successfully');
        res.status(200).json({'message': 'Your password has been changed successfully'});
        // res.redirect('/login');
      });
    }

  ],err => {
    // res.redirect('/login');
    res.status(400).json({'message': 'reset failed'});

  });
});

module.exports = router;
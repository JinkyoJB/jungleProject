const express = require('express');
const app = express();

const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; 
/* passport 안에는 여러 strategies가 있는데, 이는 authentication을 데이터베이스에 적용하고 싶다는 것
    facebook strategy 같은것도 있다고 함
*/

/* ---------------- swagger 사용 설정 -------------------- */
const { swaggerUi, specs } = require('./modules/swagger');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
/* ---------------- swagger 사용 설정 -------------------- */


// Requiring user route
const userRoutes = require('./routes/users');

// Requiring user model
const User = require('./models/usermodel');

dotenv.config({path : './config.env'});

mongoose.connect(process.env.DATABASE_LOCAL , {
    // userNewUrlParser : true,
    useUnifiedTopology : true,
    // useCreateIndex : true
});

// middleware for session
app.use(session({
    secret : 'Just a simple login/sign up application.',
    resave : true,
    saveUninitialized : true
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy({usernameField : 'email'}, User.authenticate()));
/* passport는 현재 로그인한 유저에 대한 세션을 유지
밑의 2개의 라인으로 그 세션을 유지할 수 있음
- 유저가 dashboard에 접근할수 있게 하려면(세션을 기반으로)
searlize/ deserialize로 이를 가능케 함(??)
*/
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// midleware for flash messages
app.use(flash());

// setting middleware globally 
app.use((req, res, next) => {
    res.locals.success_msg = req.flash(('success_msg'));
    res.locals.error_msg = req.flash(('error_msg'));
    res.locals.error = req.flash(('error'));
    res.locals.currentUser = req.user;
    next();
});

app.use(bodyParser.urlencoded({extended: true}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(userRoutes);

app.listen(process.env.PORT, () => {
    console.log('Server is started');
});
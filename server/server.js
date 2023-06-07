require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; 

const PORT = 3000;
const app = express();

// PARSE ALL REQUESTS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Parses cookies attached to the client request object

// SERVE STATIC FILES
app.use(express.static(path.join(__dirname, '../client/dist')));

// ROUTES
// const userRoutes = require('./routes/users');
app.use('/api', require('./routes/api'));

// Requiring user model
const User = require('./models/usermodel');

dotenv.config({path : './config.env'});

//HANDLE CLIENT-SIDE ROUTING
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
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

// UNKNOWN ROUTE HANDLER
app.use((req, res) => res.status(404).send('404 Not Found'));
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

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.use(bodyParser.urlencoded({extended: true}));
app.set('views', path.join(__dirname, '../client/views'));
app.use(express.static('public'));
// app.use(userRoutes);

// MONGODB CONNECTION
mongoose.connect('process,env.MONGO_URI', {
  // useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

// SERVER LISTEN
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

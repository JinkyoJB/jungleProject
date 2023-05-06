require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const PORT = 8087 || process.env.PORT;
const app = express();

// PARSE ALL REQUESTS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Parses cookies attached to the client request object

// SERVE STATIC FILES
app.use(express.static(path.join(__dirname, '../client/dist')));

// ROUTES
app.use('/api', require('./routes/api'));


//HANDLE CLIENT-SIDE ROUTING
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// UNKNOWN ROUTE HANDLER
app.use((req, res) => res.status(404).send('404 Not Found'));

// GLOBAL ERROR HANDLER
app.use((err, req, res) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});



// // MONGODB CONNECTION
// mongoose.connect('process,env.MONGO_URI', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.log(err));

// SERVER LISTEN
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
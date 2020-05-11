'use strict';
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const {CLIENT_ORIGIN} = require('./config');
const postsRouter = require('./posts/posts-router');
const userRouter = require('./user/user-router');
const authRouter = require('./auth/auth-router');
const commentsRouter = require('./comment/comment-router');

const cloudinary = require('cloudinary')
const formData = require('express-form-data')
const app = express ();
const bodyParser = require('body-parser')


const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

app.use('/api/comments', commentsRouter);
app.use('/api/posts', postsRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);


cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_API_SECRET
});
  
app.use(formData.parse());

app.post('/api/meme-upload', (req, res)=>{
  const values = Object.values(req.files);
  const promises = values.map(image => cloudinary.uploader.upload(image.path));
    
  Promise
    .all(promises)
    .then(results => {
      res.json(results);
    });   
});


  
app.post('/api/image-upload', (req, res) => {
  
  const values = Object.values(req.files);
  const promises = values.map(image => cloudinary.uploader.upload(image.path));
    
  Promise
    .all(promises)
    .then(results => {
      console.log(results);
      res.json(results);
    });
});

app.post('/user-setting',  function (req, res) {
  function writeError(message) {
    res.status(400);
    res.json({ message: message, status: 400 });
    res.end();
  }

  function saveAccount() {
    req.user.name = req.body.name;

    req.user.save(function (err) {
      if (err) {
        return writeError(err.userMessage || err.message);
      }
      res.end();
    });
  }

  if (req.body.password) {
    var application = req.app.get('stormpathApplication');

    application.authenticateAccount({
      username: req.user.username,
      password: req.body.existingPassword
    }, function (err) {
      if (err) {
        return writeError('The existing password that you entered was incorrect.');
      }

      req.user.password = req.body.password();

      saveAccount();
    });
  } else {
    saveAccount();
  }
});


app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
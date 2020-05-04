require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const postsRouter = require('./posts/posts-router');
const userRouter = require('./user/user-router');
const authRouter = require('./auth/auth-router');
const commentsRouter = require('./comment/comment-router');
<<<<<<< HEAD
const cloudinary = require('cloudinary');
const formData = require('express-form-data');
=======
const cloudinary = require('cloudinary')
const formData = require('express-form-data')
>>>>>>> 07c9b2ed0eaf7c3dad87f7d2e5ffcc0d8dbfb9c7
const app = express ();


const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.use('/api/comments', commentsRouter);
app.use('/api/posts', postsRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);


app.post('/api/meme-upload', (req, res)=>{

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_API_SECRET
});
  
app.use(formData.parse());
  
app.post('/api/image-upload', (req, res) => {
  
  const values = Object.values(req.files);
  const promises = values.map(image => cloudinary.uploader.upload(image.path));
    
  Promise
    .all(promises)
    // .then(res => res.json ())
    .then(results => {
      console.log(results);
      res.json(results);
    });
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
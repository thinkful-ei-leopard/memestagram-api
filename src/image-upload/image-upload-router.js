'use strict';
require('dotenv').config();
const cloudinary = require('cloudinary');
const express = require('express');
const formData = require('express-form-data');
const ImageUploadService = require('./image-upload-service');
//const { CLIENT_ORIGIN } = require('./config');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

const authRouter = express.Router();

authRouter
  .route('/signup')
  .post(formData.parse(), (req, res, next) => {
    const values = Object.values(req.files);
    const promises = values.map(image => cloudinary.uploader.upload(image.path));

    // ImageUploadService.insertImage(req.app.get('db'), newImage)
    Promise
      .all(promises)
      .then(results => res.json(results));
  });

// POST the photo when creating a new post
// authRouter
//   .route('/photo')
//   .post(formData.parse(), (req, res) => {
//     const values = Object.values(req.files);
//     const promises = values.map(image => cloudinary.uploader.upload(image.path));

//     Promise
//       .all(promises)
//       .then(results => res.json(results));
//   });
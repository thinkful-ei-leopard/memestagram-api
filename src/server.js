require('dotenv').config()
const express = require('express')
const cloudinary = require('cloudinary')
const formData = require('express-form-data')
const cors = require('cors');
const app = require('./app');
const knex = require('knex');
const { PORT, DATABASE_URL } = require('./config');

// cloudinary.config({ 
//   cloud_name: process.env.CLOUD_NAME, 
//   api_key: process.env.API_KEY, 
//   api_secret: process.env.API_SECRET
// });
    

//   app.use(cors({ 
//     origin: PORT 
//   })) 
  
// app.use(formData.parse());
  
// app.post('/image-upload', (req, res) => {
  
//   const values = Object.values(req.files);
//   const promises = values.map(image => cloudinary.uploader.upload(image.path));
    
//   Promise
//     .all(promises)
//     .then(results => res.json(results));
// });


const db = knex({
  client: 'pg',
  connection: DATABASE_URL,
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost${PORT}`);
});

app.set('db',db);
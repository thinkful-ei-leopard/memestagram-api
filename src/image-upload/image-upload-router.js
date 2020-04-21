require('dotenv').config()
const cloudinary = require('cloudinary')
const formData = require('express-form-data')
const { CLIENT_ORIGIN } = require('./config')

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
})

const authRouter = express.Router()

authRouter
  .route('/')
  .post(formData.parse(), (req, res) => {
    const values = Object.values(req.files)
    const promises = values.map(image => cloudinary.uploader.upload(image.path))

    Promise
    .all(promises)
    .then(results => res.json(results))
  })
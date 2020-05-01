const express = require('express')
const path = require('path')
const UserService = require('./user-service')

userRouter = express.Router()
const jsonBodyParser = express.json()

userRouter 
    .post('/', jsonBodyParser, async (req, res, next) => {
        const { password, username, name } = req.body

        for (const field of ['name', 'username', 'password' ])
        if (!req.body[field])
        return res.status(400).json({
            error: `Missing '${field}' in request body`
        })

        try {
            const passwordError = UserService.validatePassword(password)

            if (passwordError)
            return res.status(400).json ({ error: passwordError })

            const hasUserWithUserName = await UserService.hasUserWithUserName(
                req.app.get('db'),
                username
            )
            if (hasUserWithUserName)
                return res.status(400).json({ error: `Username already take`})

                const hashedPassword = await UserService.hashPassword(password)

                const newUser = {
                    username, 
                    password: hashedPassword,
                    name,
                    // userImg
                }

                const user = await UserService.insertUser(
                    req.app.get('db'),
                    newUser
                )

                res
                    .status(201)
                    .location(path.posix.join('req.originalURL', `/${user.id}`))
                    .json(UserService.serializeUser(user))
        } catch(error) {
            next(error)
          }
    })
    .post('/image-upload', (req, res) => {
  
        const values = Object.values(req.files);
        const promises = values.map(image => cloudinary.uploader.upload(image.path));
          
        Promise
          .all(promises)
          .then(results => res.json(results));
      });

    module.exports = userRouter

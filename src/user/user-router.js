const express = require('express');
const path = require('path');
const UserService = require('./user-service');
const userRouter = express.Router();
const jsonBodyParser = express.json();

userRouter 
  .post('/', jsonBodyParser, (req, res, next) => {
    console.log(req.body.user);
    console.log(req.body.user.name);
    console.log(req.body.user.password);
    console.log(req.body.user.username);
    console.log(req.body.user.userImg);
    const {name, password, username, userImg } = req.body.user;

    for (const field of ['name', 'username', 'password', 'userImg'])
      if (!req.body.user[field])
        return res.status(400).json({
          error: `Missing '${field}' in request body`
        });

    try {
      const passwordError = UserService.validatePassword(password);

      if (passwordError)
        return res.status(400).json ({ error: passwordError });

      /*const hasUserWithUserName = UserService.hasUserWithUserName(
        req.app.get('db'),
        username
      );
      if (hasUserWithUserName)
        return res.status(400).json({ error: `Username already taken`});*/

      const hashedPassword = UserService.hashPassword(password);

      const newUser = {
        name,
        username, 
        password: hashedPassword,
        userImg
      };

      const user = UserService.insertUser(
        req.app.get('db'),
        newUser
      );

      res
        .status(201)
        .location(path.posix.join('req.originalURL', `/${user.id}`))
        .json(UserService.serializeUser(user));
    } catch(error) {
      next(error);
    }
  });
/*.post('/image-upload', (req, res) => {
  
    const values = Object.values(req.files);
    const promises = values.map(image => cloudinary.uploader.upload(image.path));
          
    Promise
      .all(promises)
      .then(results => res.json(results));
  });*/

module.exports = userRouter;
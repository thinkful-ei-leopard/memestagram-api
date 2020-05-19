const express = require('express');
const path = require('path');
const UserService = require('./user-service');
const { requireAuth } = require('../middleware/jwt-auth');
const userRouter = express.Router();
const jsonBodyParser = express.json();

userRouter 
  .post('/', jsonBodyParser, (req, res, next) => {
    const { name, password, username, userImg } = req.body.user;

    for (const field of ['name', 'username', 'password', 'userImg'])
      if (!req.body.user[field])
        return res.status(400).json({
          error: `Missing '${field}' in request body`
        });
    const passwordError = UserService.validatePassword(password);
    if(passwordError)
      return res.status(400).json({error: passwordError});
    UserService.hasUserWithUserName(
      req.app.get('db'),
      username
    )
    
      .then(hasUserWithUserName =>{
        if(hasUserWithUserName)
          return res.status(400).json({error: 'Username already taken'});
            
        return UserService.hashPassword(password)
          .then(hashedPassword =>{
            const newUser={
              name,
              username,
              password: hashedPassword,
              userImg
              
            };
    
            return UserService.insertUser(
              req.app.get('db'),
              newUser
            )
              .then(user =>{
                res
                  .status(201)
                  .location(path.posix.join(req.originalUrl, `/${user.id}`))
                  .json(UserService.serializeUser(user));
              });
          });
      })
      .catch(next);
  });
userRouter
  .route('/:user_id')
  .patch(requireAuth, jsonBodyParser, (req, res, next)=>{
    const { id, username } = req.body;

    UserService.updateUserName(
      req.app.get('db'),
      id,
      username
    )
      .then(newName=>{
        res.status(204).end();
      })
      .catch(next);
  });



module.exports = userRouter;
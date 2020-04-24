const express =require('express');
const path = require('path');
const postsRouter = express.Router();
const { requireAuth } = require('../middleware/jwt-auth');
const PostsService = require('./posts-service');
const jsonBodyParser= express.json();

const serializePost = data =>({
  id:data.id,
  memeImg:data.memeImg,
  description:data.description,
  likes:data.likes,
  user_id:data.user_id
});

postsRouter
  .route('/')
  .get(requireAuth, (req, res, next) => {
    PostsService.getAllPosts(
      req.app.get('db'),
      req.user.id
    )
      .then(data =>{
        if(!data){
          return res.status(404).json({
            error:{message:`Data doesn't exist`}
          });
        }
        res.json(data.map(PostsService.serializePost));
      })
      .catch(next);
  })
 
  .post(requireAuth, jsonBodyParser, (req, res, next)=>{
    const {memeImg, description, likes, user_id}=req.body;
    const newPost={memeImg, description, likes, user_id}
       
    for(const [key, value] of Object.entries(newPost))
      if(value == null)
        return res.status(400).json({
          error:{ message: `Missing '${key}' in request body`}
        });
    PostsService.insertMyPost(
      req.app.get('db'),
      newPost
    )
      .then(post =>{
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${post.id}`))
          .json(serializePost(post));
      })
      .catch(next);
  });

postsRouter
  .route('/:user_id')
  .get(requireAuth, (req, res, next) => {
    PostsService.getAllUserPosts(
      req.app.get('db'),
      req.user.id
    )
      .then(data =>{
        if(!data){
          return res.status(404).json({
            error:{message:`Data doesn't exist`}
          });
        }
        res.json(data.map(serializePost));
      })
      .catch(next);
  });

postsRouter
  .route('/:post_id')
  .all(requireAuth, (req, res, next)=>{
    PostsService.getById(
      req.app.get('db'),
      req.params.post_id
    )
      .then(post =>{
        if(!post){
          return res.status(404).json({
            error:{ message: `Post doesn't excist`}
          });
        }
        res.post = post;
        next()
      })
      .catch(next);
  })
  .get((req, res, next)=>{
    res.json(serializePost(res.post));
  })
  .delete((req, res, next)=>{
    PostsService.deleteMyPost(
      req.app.get('db'),
      req.params.post_id
    )
      .then(data =>{
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = postsRouter;
    
       
   


  
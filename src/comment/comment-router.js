const express = require('express')
const path = require('path')
const CommentsService = require('./comment-service')
const { requireAuth } = require('../middleware/jwt-auth');
const commentsRouter = express.Router();
const jsonBodyParser = express.json();
const xss = require('xss');

const serializeGetComment = comment =>({
  id: comment.id,
  comment:xss(comment.comment),
  username:comment.username,
  posts_id:comment.posts_id,
  user_id: comment.user_id  
});

commentsRouter
  .route('/')
  .get(requireAuth, (req, res, next)=>{
    CommentsService.getPostAllcomment(
      req.app.get('db'),
      req.params.posts.id
    )
      .then(data =>{
        if(!data){
          return res.status(404).json({
            error:{message:`comments doesn't exist`}
          });
        }
        res.json(data.map(serializeGetComment));
      })
      .catch(next);
  })
  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    const {comment,user_id, posts_id}=req.body;
    const newComment ={comment, user_id, posts_id};
    for (const [key, value] of Object.entries(newComment))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        })

    CommentsService.insertComment(
      req.app.get('db'),
      newComment
    )
      .then(comment => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${comment.id}`))
          .json(CommentsService.serializeComments(comment));
      })
      .catch(next);
  });

module.exports = commentsRouter;
  

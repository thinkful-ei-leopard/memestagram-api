const express = require('express')
const path = require('path')
const CommentsService = require('./comment-service')
const xss = require('xss')

const commentsRouter = express.Router()
const jsonBodyParser = express.json()

const serializeComment = comment => ({
    id: comment.id,
    comment: xss(comment.comment),
    posts_id: comment.posts_id,
    user_id: comment.user_id
  })

commentsRouter
  .route('/:post_id')
  .get(requireAuth, (req, res, next) => {
    CommentsService.getComments(
      req.app.get('db'),
      req.user.id
    )
      .then(data =>{
        if(!data){
          return res.status(404).json({
            error:{message:`Data doesn't exist`}
          });
        }
        res.json(data.map(serializeComment));
      })
      .catch(next);
  })
  .post(requireAuth, jsonBodyParser, (req, res, next) => {
      const {comment, post_id, user_id}=req.body;
      const newComment ={comment, post_id, user_id }
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
          .json(CommentsService.serializeReview(comment))
      })
      .catch(next)
    })
  }
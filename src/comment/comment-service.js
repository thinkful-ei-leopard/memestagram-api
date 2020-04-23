const xss = require('xss');

const CommentsService={
 
  insertComment(db, newComment) {
    return db
      .insert(newComment)
      .into('comments')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },

  serializeComments(comment){
    return{
      id: comment.id,
      comment:xss(comment.comment),
      posts_id:comment.posts_id,
      user_id: comment.user_id
    };
  }
};

module.exports = CommentsService;
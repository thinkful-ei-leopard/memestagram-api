const xss = require('xss')

const CommentsService={
  getComments(db){
    return db
      .from('comments') 
      .select('comments.*', 'posts.id')
      .rightJoin('posts','comments.posts_id', 'posts.id');   
  },
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
      post_id:comment.post_id
    };
  }
};

module.exports = CommentsService;
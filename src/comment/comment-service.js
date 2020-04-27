const xss = require('xss');

const CommentsService={
  getPostAllcommnet(db, id){
    return db
      .from('commnets')
      .select('commnets.*', 'user.username')
      .leftJoin('user','comments.user_id', 'user.id')
      .where('comments.posts_id', id);
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
      posts_id:comment.posts_id,
      user_id: comment.user_id
    };
  }
};

module.exports = CommentsService;
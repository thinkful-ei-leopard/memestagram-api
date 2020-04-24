const xss = require('xss')

const PostsService={
  getAllPosts(db){
    return db
      .from('posts')
      .select('posts.*', 'user.username', 'user.userImg')
      .leftJoin('user','posts.user_id', 'user.id');
  },
  getById(db, id){
    return db
      .from('posts')
      .select('posts.*', 'comments.comment', 'user.username', 'user.userImg')
      .leftJoin('comments', 'comments.user_id', 'posts.user_id')
      .leftJoin('user','posts.user_id', 'user.id')
      .where('id', id)
      .first();
  },
  getAllUserPosts(db, id){
    return db
      .from('posts')
      .select('posts.*', 'user.username', 'user.userImg')
      .leftJoin('user', 'posts.user_id', 'user.id')
      .where('posts.user_id', id);
  },
     
  deleteMyPost(db, id){
    return db 
      .from('posts')
      .select('posts.*', 'comments.comment')
      .leftJoin('comments', 'comments.user_id', 'posts.user_id')
      .leftJoin('user','posts.user_id', 'user.id')
      .where({id})
      .delete();
  },
  insertMyPost(db, newData){
    return db
      .insert(newData)
      .into('posts')
      .returning('*')
      .then(([data]) => data);
  },
  serializePost(post){ 
    return{
      id:post.id,
      memeImg:post.memeImg,
      description:xss(post.description),
      likes:post.likes,
      user_id:post.user_id,
      username:post.username,
      userImg:post.userImg
    };
  }
    
};

module.exports=PostsService;
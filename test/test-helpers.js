const knex = require('knex')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
function makeKnexInstance() {
  return knex({
    client: 'pg',
    connection: process.env.TEST_DATABASE_URL,
  })
}
function makeUsersArray() {
  return [
    {
      id: 1,
      username: 'test-user-1',
      name: 'Test user 1',
      password: 'password',
      userImg : 'http://userImg1.com'
    },
    {
      id: 2,
      username: 'test-user-2',
      name: 'Test user 2',
      password: 'password',
      userImg : 'http://userImg2.com'
    },
  ]
}
function makePostsArray() { 
  return [
    {
      id: 1,
      memeImg: 'http://memeImg1.com',
      description: 'test description',
      likes: 0,
      user_id: 1
    },
    {
        id: 2,
        memeImg: 'http://memeImg2.com',
        description: 'test description',
        likes: 0,
        user_id: 2
      }
  ]
}

function makeCommentsArray(users, posts) {
  return [
    {
      id: 1,
      comment: 'test comment',
      posts_id: 1,
      user_id: 1
    },
    {
        id: 2,
        comment: 'test comment',
        posts_id: 1,
        user_id: 2
      }
  ]
}

function makeExpectedPost( posts=[]){
    return {
        id: posts.id,
        memeImg: posts.memeImg,
        description: posts.description,
        likes: posts.likes,
        user_id: posts.user_id
    }
}

function makeExpectedCommets(comments=[]){
    return {
        id: comments.id,
        comment: comments.comment,
        posts_id: comments.posts_id,
        user_id: comments.user_id
    }
}

function makePostsFixtures(){
    const testUsers = makeUsersArray()
    const testPosts = makePostsArray(testUsers)
    const testComments = makeCommentsArray(testUsers, testPosts)
    return {testUsers, testPosts, testComments }
}


function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
    const token = jwt.sign({ user_id: user.id }, secret, {
      subject: user.username,
      algorithm: 'HS256',
    })
    return `Bearer ${token}`
  }

function cleanTables(db) {
    return db.raw(      
        `TRUNCATE
            user,
            posts,
            comments
            RESTART IDENTITY CASCADE`
    )
    
}
function seedPost(db, posts) {
    const newPosts = posts.map(post => ({
      ...post,
    }))
    return db.transaction(async trx => {
      await trx.into('post').insert(newPosts)
    })
}
function seedComment(db, comment) {
  const newComment = comment.map(comment => ({
    ...comment,
  }))
  return db.transaction(async trx => {
    await trx.into('comment').insert(newComment)
  })
}
function seedUsers(db, users) {
    const preppedUsers = users.map(user => ({
      ...user,
      password: bcrypt.hashSync(user.password, 1)
    }))
    return db.transaction(async trx => {
      await trx.into('user').insert(preppedUsers)
      await trx.raw(
        `SELECT setval('user_id_seq', ?)`,
        [users[users.length - 1].id],
      )
    })
  }
  module.exports = {
    makeKnexInstance,
    makeUsersArray,
    makeAuthHeader,
    makePostsArray,
    makeCommentsArray,
    makeExpectedPost,
    makeExpectedCommets,
    makePostsFixtures,
    cleanTables,
    seedPost,
    seedUsers,
    seedComment
  }
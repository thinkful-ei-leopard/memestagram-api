const knex = require('knex')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


function makeKnexInstance() {
  return knex({
    client: 'pg',
    connection: process.env.TEST_DB_URL,
  })
}

function makeUsersArray() {
  return [
    {
      id: 1,
      username: 'test-user-1',
      name: 'Test user 1',
      password: 'password',
    },
    {
      id: 2,
      username: 'test-user-2',
      name: 'Test user 2',
      password: 'password',
    },
  ]
}

function makePostsArray() {
  return [
    {
      id: 1,
      memeImg: data.memeImg,
      description: 'test description',
      likes: '111',
      user_id: 2
    }
  ]
}

function makeCommentArray() {
  return [
    {
      id: 1,
      comment: 'test comment',
      username: 'test username',
      posts_id: 2,
      user_id: 3
    }
  ]
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
    const token = jwt.sign({ user_id: user.id }, secret, {
      subject: user.username,
      algorithm: 'HS256',
    })
    return `Bearer ${token}`
  }

function cleanTables(db) {
  return db.transaction(trx =>
    trx.raw(
      `TRUNCATE
      "comments",
      "posts",
      "user"`
      )
      
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
    makeCommentArray,
    cleanTables,
    seedPost,
    seedUsers,
    seedComment
  }
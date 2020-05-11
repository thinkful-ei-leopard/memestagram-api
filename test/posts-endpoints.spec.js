'use strict';
const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe.only('Posts Endpoints', function () {
  let db;

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set('db', db);
  });

  after ('disconnect from db', () => db.destroy());
  
  before('cleanup', () => helpers.cleanTables(db));
  
  afterEach('cleanup', () => helpers.cleanTables(db));

  describe.only('GET /api/posts', () => {
    const testUser = {
      id: 1,
      username: 'test-user-1',
      name: 'Test user 1',
      password: 'password',
      userImg: 'testImg'
    };

    const testPosts = [
      {
        id: 1,
        memeImg: 'testImg',
        description: 'testDesc',
        likes: 0,
        user_id: 1
      },
      {
        id: 2,
        memeImg: 'testImg2',
        description: 'testDesc2',
        likes: 0,
        user_id: 1
      }
    ];

    const expectedPosts = [
      {
        id: 1,
        memeImg: 'testImg',
        description: 'testDesc',
        likes: 0,
        user_id: 1,
        userImg: 'testImg',
        username: 'test-user-1'
      },
      {
        id: 2,
        memeImg: 'testImg2',
        description: 'testDesc2',
        likes: 0,
        user_id: 1,
        userImg: 'testImg',
        username: 'test-user-1'
      }
    ];

    beforeEach('insert users and posts', () => {
      return db 
        .into('user')
        .insert(testUser)
        .then(() => {
          return db 
            .into('posts')
            .insert(testPosts);
        });
    });

    it('responds with a 200 and all the posts', () => {
      return supertest(app)
        .get('/api/posts')
        .set('Authorization', helpers.makeAuthHeader(testUser))
        .expect(200, expectedPosts);
    });

  });

  describe ('POST /api/', () => {
    let testUser = {
      id: 1,
      username: 'test-user-1',
      name: 'Test user 1',
      password: 'password',
      userImg: 'testImg'
    };

    const testPost = {
      id: 1,
      memeImg: 'testImg',
      description: 'testDesc',
      likes: 0,
      user_id: 1
    };

    beforeEach('insert users and posts', () => {
      return db 
        .into('user')
        .insert(testUser)
        .then(() => {
          return db 
            .into('posts')
            .insert(testPost);
        });
    });
  });
});



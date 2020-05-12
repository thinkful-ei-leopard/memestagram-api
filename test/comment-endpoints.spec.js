
const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Comments Endpoints', function() {
  let db;

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  before('cleanup', () => helpers.cleanTables(db));

  afterEach('cleanup', () => helpers.cleanTables(db));

  describe('GET /api/comments/:post_id', () => {
    const testUser = {
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

    const testComments = [
      {
        id: 1,
        comment: 'So true!',
        posts_id: 1,
        user_id: 1
      }
    ];

    const expectedComments = [
      {
        id: 1,
        comment: 'So true!',
        posts_id: 1,
        user_id: 1,
        username: 'test-user-1'
      }
    ];

    beforeEach('insert users, posts, and comments', () => {
      return db 
        .into('user')
        .insert(testUser)
        .then(() => {
          return db 
            .into('posts')
            .insert(testPost);
        })
        .then(() => {
          return db
            .into('comments')
            .insert(testComments);
        });
    });

    it('responds with a 200 and all the comments', () => {
      return supertest(app)
        .get('/api/comments/1')
        .set('Authorization', helpers.makeAuthHeader(testUser))
        .expect(200, expectedComments);
    }); 

  });

  describe('POST /api/comments/:post_id', () => {
    const testUser = {
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

    const testComment ={
      comment: 'So true!',
      posts_id: 1,
      user_id: 1
    };

    const expectedComments = [
      {
        id: 1,
        comment: 'So true!',
        posts_id: 1,
        user_id: 1,
        username: 'test-user-1'
      }
    ];

    beforeEach('insert users, and posts', () => {
      return db 
        .into('user')
        .insert(testUser)
        .then(() => {
          return db 
            .into('posts')
            .insert(testPost);
        });
    });

    it('responds 201 when user posts', () => {
      return supertest(app)
        .post('/api/comments/1')
        .set('Authorization', helpers.makeAuthHeader(testUser))
        .send(testComment)
        .expect(201);
    });
  });

});
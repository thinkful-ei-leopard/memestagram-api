const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe ('Post Endpoints', function () {
  let db;

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set('db', db);
  });

  after ('disconnect from db', () => db.destroy())
  
  before('cleanup', () => helpers.cleanTables(db))
  
  afterEach('cleanup', () => helpers.cleanTables(db))

  describe(`GET /api/`, () => {
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

    const expectedPost = [
    {
      id: 1,
      memeImg: 'http://memeImg.com',
      description: 'test-description',
      likes: '2',
      user_id: 3,
      username: 'test-user-1'
    }
  ]
    beforeEach('insert users and posts', () => {
      return db 
        .into('user')
        .insert(testUser)
        .then(() => {
          return db 
            .into('posts')
            .insert(testPost);
        })
    });
    it('responds with a 200 and all the posts', () => {
      return supertest(app)
        .get('/api/comments/1')
        .set('Authorization', helpers.makeAuthHeader(testUser))
        .expect(200, expectedPost);
    }); 


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
  })



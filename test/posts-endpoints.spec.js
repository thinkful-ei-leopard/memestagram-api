const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Posts Endpoints', function () {
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

  describe('GET /api/posts', () => {
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

  describe ('POST /api/posts', () => {
    const testUser = {
      id: 1,
      username: 'test-user-1',
      name: 'Test user 1',
      password: 'password',
      userImg: 'testImg'
    };

    const testPost = {
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
    it ('responds 201 when user posts', () => {
      return supertest(app)
        .post('/api/posts')
        .set('Authorization', helpers.makeAuthHeader(testUser))
        .send(testPost)
        .expect(201);
    });
  });

  describe ('PATCH /api/posts', () => {
    const testUser = {
      id: 1,
      username: 'test-user-1',
      name: 'Test user 1',
      password: 'password',
      userImg: 'testImg'
    };

    const testUpdate = {
      id: 1,
      likes: 0,
      memeImg: 'testMeme',
      user_id: 1
    };

    beforeEach('insert users and update', () => {
      return db
        .into('user')
        .insert(testUser)
        .then(() => {
          return db
            .into('posts')
            .insert(testUpdate);
        });
    });
    it('responds 204 when user likes', () => {
      return supertest(app)
        .patch('/api/posts')
        .set('Authorization', helpers.makeAuthHeader(testUser))
        .send(testUpdate)
        .expect(204);
    });
  });

  describe ('DELETE /api/posts/:posts_id', () => {
    const testUser = {
      id: 1,
      username: 'test-user-1',
      name: 'Test user 1',
      password: 'password',
      userImg: 'testImg'
    };

    const testDelete = {
      memeImg: 'testImg',
      description: 'testDesc',
      likes: 0,
      user_id: 1,
    };

    beforeEach('inserts users and deletes', () => {
      return db
        .into('user')
        .insert(testUser)
        .then(() => {
          return db
            .into('posts')
            .insert(testDelete);
        });
    });

    it('responds with 204 and removes post', () => {
      return supertest(app)
        .delete('/api/posts/:posts_id')
        .set('Authorization', helpers.makeAuthHeader(testUser))
        .send(testDelete)
        .expect(404);
    });
  });

  describe('GET /api/posts/users/1', () => {
    const testUser = {
      id: 1,
      username: 'test-user-1',
      name: 'Test user 1',
      password: 'password',
      userImg: 'testImg'
    };

    const testUserPosts = [
      { 
        id: 2,
        memeImg: 'testImg',
        description: 'testDesc',
        likes: 0,
        user_id: 1
      }
    ];

    const expectedUserPosts = [
      {
        id: 2,
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

    beforeEach('inserts users and user posts', () => {
      return db
        .into('user')
        .insert(testUser)
        .then(() => {
          return db
            .into('posts')
            .insert(testUserPosts);
        });
    });

    it('responds with 200 and all the user posts', () => {
      return supertest(app)
        .get('/api/posts/users/1')
        .set('Authorization', helpers.makeAuthHeader(testUser))
        .send(expectedUserPosts)
        .expect(200);
    });
  });

  describe('GET /api/:post_id', () => {
    const testUser = {
      id: 1,
      username: 'test-user-1',
      name: 'Test user 1',
      password: 'password',
      userImg: 'testImg'
    };

    const testPosts = 
    { 
      id: 1,
      memeImg: 'testImg',
      description: 'testDesc',
      likes: 0,
      user_id: 1
    };
  

    const expectedPosts = {
      id: 1,
      memeImg: 'testImg',
      description: 'testDesc',
      likes: 0,
      user_id: 1,
      userImg: 'testImg',
      username: 'test-user-1'
    };

    beforeEach('inserts users and posts', () => {
      return db
        .into('user')
        .insert(testUser)
        .then(() => {
          return db
            .into('posts')
            .insert(testPosts);
        });
    });

    it('responds with 200 and all the posts', () => {
      return supertest(app)
        .get('/api/posts/1')
        .set('Authorization', helpers.makeAuthHeader(testUser))
        .send(expectedPosts)
        .expect(200);
    });
  });
});

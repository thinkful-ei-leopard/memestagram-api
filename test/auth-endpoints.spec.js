const jwt = require('jsonwebtoken');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Auth Endpoints', function(){
  let db;

  const { testUsers } = helpers.makeDataFixtures();
  const testUser = testUsers[0];

  before('make knex instance', () =>{
    db = helpers.makeKnexInstance();
    
    app.set('db', db);
  });

  after('disconnect from db', ()=> db.destroy());
  before('cleanup', () => helpers.cleanTables(db));
  afterEach('cleanup', () => helpers.cleanTables(db));

  describe('POST/api/auth/login', ()=>{
    beforeEach('insert user', () =>
      helpers.seedUsers(
        db,
        testUsers
      )
    );
    const requireFields = ['username', 'password'];

    requireFields.forEach(field =>{
      const loginAttemptBody ={
        username:testUser.username,
        password:testUser.password
      };

      it(`responds with 400 required error when '${field}' is missing`, ()=> {
        delete loginAttemptBody [field];

        return supertest(app)
          .post('/api/auth/login')
          .send(loginAttemptBody)
          .expect(400, {
            error:`Missing ${field} in request body`,
          });
      });

    });
    it(`'responds 400 'invalid username or password' when bad username'`,()=> {
      const userInvalidUser ={ username:'user-not', password:'existy'};
      return supertest(app)
        .post('/api/auth/login')
        .send(userInvalidUser)
        .expect(400, {
          error:'Incorrect username or password'
        });
    });
    it(`responds 400 'invalid username or password' when bad username`,()=> {
      const userInvalidUser ={ username:'testUser.username', password:'incorrect'};
      return supertest(app)
        .post('/api/auth/login')
        .send(userInvalidUser)
        .expect(400, {
          error:'Incorrect username or password'
        });
    });
    it(`responds 200 and JWT auth token using secret when valid credentials`, ()=>{
      
      const userValidCreds={
        username: testUser.username,
        password: testUser.password
      };

      const expectedToken =jwt.sign(
        { user_id: testUser.id, userImg: testUser.userImg},
        process.env.JWT_SECRET,
        {
          subject:testUser.username,
          algorithm:'HS256'
        }
      );
      return supertest(app)
        .post('/api/auth/login')
        .send(userValidCreds)
        .expect(200, {
          authToken:expectedToken,
          user_id:testUser.id,
          username:testUser.username,
          userImg:testUser.userImg
        });
    });
    
  });
});






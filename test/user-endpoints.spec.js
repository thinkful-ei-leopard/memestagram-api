const bcrypt = require('bcryptjs')
const app = require('../src/app')

describe('User Endpoints', function () {
    let db
  
    const testUsers = helpers.makeUsersArray()
    const testUser = testUsers[0]
  
    before('make knex instance', () => {
      db = helpers.makeKnexInstance()
      app.set('db', db)
    })
  
    after('disconnect from db', () => db.destroy())
  
    before('cleanup', () => helpers.cleanTables(db))
  
    afterEach('cleanup', () => helpers.cleanTables(db))
  
    /**
     * @description Register a user and populate their fields
     **/
    describe(`POST /api/user`, () => {
      beforeEach('insert users', () => helpers.seedUsers(db, testUsers))
  
      const requiredFields = ['username', 'password', 'name']
  
      requiredFields.forEach(field => {
        const registerAttemptBody = {
          username: 'test username',
          password: 'test password',
          name: 'test name',
        }
  
        it(`responds with 400 required error when '${field}' is missing`, () => {
          delete registerAttemptBody[field]
  
          return supertest(app)
            .post('/api/users')
            .send(registerAttemptBody)
            .expect(400, {
              error: `Missing '${field}' in request body`,
            })
        })
      })

      it(`responds 400 'Password be longer than 6 characters' when empty password`, () => {
        const userShortPassword = {
          username: 'test username',
          password: '12345',
          name: 'test name',
        }
        return supertest(app)
          .post('/api/users')
          .send(userShortPassword)
          .expect(400, { error: `Password be longer than 6 characters` })
      })
  
      it(`responds 400 'Password be less than 30 characters' when long password`, () => {
        const userLongPassword = {
          username: 'test username',
          password: '*'.repeat(31),
          name: 'test name',
        }
        return supertest(app)
          .post('/api/users')
          .send(userLongPassword)
          .expect(400, { error: `Password be less than 30 characters` })
      })
  
      it(`responds 400 error when password starts with spaces`, () => {
        const userPasswordStartsSpaces = {
          username: 'test username',
          password: ' 1Aa!2Bb@',
          name: 'test name',
        }
        return supertest(app)
          .post('/api/users')
          .send(userPasswordStartsSpaces)
          .expect(400, { error: `Password must not start or end with empty spaces` })
      })
  
      it(`responds 400 error when password ends with spaces`, () => {
        const userPasswordEndsSpaces = {
          username: 'test username',
          password: '1Aa!2Bb@ ',
          name: 'test name',
        }
        return supertest(app)
          .post('/api/users')
          .send(userPasswordEndsSpaces)
          .expect(400, { error: `Password must not start or end with empty spaces` })
      })
  
      it(`responds 400 error when password isn't complex enough`, () => {
        const userPasswordNotComplex = {
          username: 'test username',
          password: '11AAaabb',
          name: 'test name',
        }
        return supertest(app)
          .post('/api/users')
          .send(userPasswordNotComplex)
          .expect(400, { error: `Password must contain one upper case, lower case, number and special character` })
      })
  
      it(`responds 400 'User name already taken' when username isn't unique`, () => {
        const duplicateUser = {
          username: testUser.username,
          password: '11AAaa!!',
          name: 'test name',
        }
        return supertest(app)
          .post('/api/users')
          .send(duplicateUser)
          .expect(400, { error: `Username already taken` })
      })
  
      describe(`Given a valid user`, () => {
        it(`responds 201, serialized user with no password`, () => {
          const newUser = {
            username: 'test username',
            password: '11AAaa!!',
            name: 'test name',
          }
          return supertest(app)
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect(res => {
              expect(res.body).to.have.property('id')
              expect(res.body.username).to.eql(newUser.username)
              expect(res.body.name).to.eql(newUser.name)
              expect(res.body).to.not.have.property('password')
              expect(res.headers.location).to.eql(`/api/users/${res.body.id}`)
            })
        })
  
        it(`stores the new user in db with bcryped password`, () => {
          const newUser = {
            username: 'test username',
            password: '11AAaa!!',
            name: 'test name',
          }
          return supertest(app)
            .post('/api/users')
            .send(newUser)
            .expect(res =>
              db
                .from('user')
                .select('*')
                .where({ id: res.body.id })
                .first()
                .then(row => {
                  expect(row.username).to.eql(newUser.username)
                  expect(row.name).to.eql(newUser.name)
  
                  return bcrypt.compare(newUser.password, row.password)
                })
                .then(compareMatch => {
                  expect(compareMatch).to.be.true
                })
            )
        })
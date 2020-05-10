/*const app = require('../src/app')
const helpers = require('./test-helpers')

describe ('Post Endpoints', function () {
  let db 
    
  const testUsers = helpers.makeUsersArray()
  const [testUser] = testUsers
  const [testPost] = helpers.makePostsArray()

  before ('make knex instance', () => {
    db = helpers.makeKnexInstance()
    app.set('db', db)
  })

  after ('disconnect from db', () => db.destroy())
  
  before('cleanup', () => helpers.cleanTables(db))
  
  afterEach('cleanup', () => helpers.cleanTables(db))

  describe(`GET /api/`, () => {
    const [userPost] = testPost.filter(
      post => post.user_id === testUser.id
    )
  })

  describe ('POST /api/', () => {
    this.beforeEach('insert newPost', () => {
      return helpers.seedPost(
        db, 
        testUser,
        testPost
      )
    })


    it(`responds with 404 if there is no image`, () => {
      return endpoint.method(endpoint.path)
        .set('Authorization', helpers.makeAuthHeader(testUsers[1]))
        .send({})
        .expect(404, {
          error: `You have no image`,
        })
    })

  })
})

it(`responds with 200 and user's posts`, () => {
  return supertest(app)
    .get(`/api/`)
    .set('Authorization', helpers.makeAuthHeader(testUser))
    .expect(200)
    .expect(res => {
      expect(res.body).to.have.keys('post')
      expect (res.body.post).to.have.property('id', userPost.id)
      expect (res.body.post).to.have.property('memeImg', userPost.memeImg)
      expect (res.body.post).to.have.property('description', userPost.description)
      expect (res.body.post).to.have.property('likes', userPost.likes)
      expect (res.body.post).to.have.property('user_id', userPost.user_id)
      expect (res.body.post).to.have.property('username', userPost.username)
      expect (res.body.post).to.have.property('userImg', userPost.userimg)
    })

})*/
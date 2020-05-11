/*const app = require('../src/app')
const helpers =require('./test-helpers')

describe ('Comment Endpoints', function () {
    let db

    const testUsers = helpers.makeUsersArray()
    const [testUser] = testUsers
    const [testComment] = helpers.makeCommentsArray()

    before ('make knex instance', () => {
        db = helpers.makeKnexInstance()
        app.set('db', db)
    })

    after ('disconnect from db', () => db.destroy())

    before ('cleanup', () => helpers.cleanTables(db))

    afterEach('cleanup', () => helpers.cleanTables(db))

    describe(`Get /api/:post_id`, () => {
        const [userComment] = testComment.filter(
            comment => comment.user_id === testUser.id
        )
    })

    describe ('POST /api/:post_id', () => {
        this.beforeEach('insert newComment', () => {
            return helpers.seedComment(
                db,
                testUser,
                testComment
            )
        })

        it(`responds with 404 if there is no comment`, () => {
            return endpoint.method(endpoint.path)
                .set('Authorization', helpers.makeAuthHeader(testUsers[1]))
                .send({})
                .expect(404, { 
                    error: `You have no comment`,
                })
        })

        it(`responds with 200 and user's comment`, () => {
            return supertest(app)
            .get(`/api/`)
            .set('Authorization', helpers.makeAuthHeader(testUser))
            .expect(200)
            .expect(res => {
                expect(res.body).to.have.keys('post')
                expect (res.body.comment).to.have.property('id', userPost.id)    
                expect(res.body.comment).to.have.property('comment', userComment.comment)     
                expect (res.body.comment).to.have.property('user_id', userComment.user_id)
                expect(res.body.comment).to.have.property('posts_id', userComment.posts_id)
                expect (res.body.comment).to.have.property('username', userComment.username)
        
            })
    
        })
    
    })
})*/
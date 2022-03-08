const request = require('supertest');
const app = require('../app')
const { sync } = require('../models/synchronize')
const User = require('../models/User')

describe('upload testing', () => {

    beforeAll((done) => {
        sync()
            .then(() => {
                console.log('db synchronized')
                return User.create({})
            })
            .then(() => {
                done()
            })
            .catch((e) => {
                console.error('db synchronization error', e)
                done(e)
            })
    })



    test('successfull file uploading', (done) => {
        request(app)
            .post('/upload')
            .set('Authorization', '1')
            .type('form')
            .attach('userFile', '././_test/test-image.png')
            .attach('userFile', '././_test/test-image2.png')
            .expect(200)
            .end((err, res) => {
                if (err) return (done(err))
                //@todo check row created in db
                done()
            })

    })

})
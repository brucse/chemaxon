const request = require('supertest');
const app = require('../app')
describe('upload testing', () =>{

    test('successfull file uploading', (done) =>{
        request(app)
        .post('/upload')
        .type('form')
        .attach('userFile','././_test/test-image.png')
        .expect(200)
        .end((err,res) =>{
            if (err) return (done(err))
                if (err) return (done(err))
                return done()
        })

    })

})
const request = require('supertest');
const app = require('../app')
const { sync } = require('../models/synchronize')
const FileData = require('../models/FileData')
const User = require('../models/User')

const testData = { fileId: 'testId', fileName: 'test.png', userId: 1 }

describe('file listing', () => {

    beforeAll((done) => {
        sync()
            .then(() => {
                console.log('db synchronized')
                return User.create({})
            })
            .then((data) => {
                return FileData.create(testData)
            })
            .then(data => {
                done()
            })
            .catch((e) => {
                console.error('db synchronization error', e)
                done(e)
            })
    })


    test('list files', (done) => {
        request(app)
            .get('/files')
            .set('Authorization', '1')
            .expect(200)
            .end((err, res) => {
                if (err) return (done(err))
                const rec = res.body.data[0]
                expect(rec.fileName).toEqual('test.png')
                done()
            })

    })

})
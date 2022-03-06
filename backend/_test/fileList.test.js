const request = require('supertest');
const app = require('../app')
const {sync} = require ('../models/synchronize')
const FileData = require('../models/FileData')

const testData = {fileId:'testId', fileName: 'test.png'}

describe('file listing', () =>{

    beforeAll((done) =>{
    sync()
    .then(() => {
        console.log('db synchronized')
        return FileData.create(testData)
    })
    .then(data =>{
        done()
    })
    .catch((e) => {
        console.error('db synchronization error', e)
        done(e)
    })
}) 


    test('list files', (done) =>{
        request(app)
        .get('/files')
        .expect(200)
        .end((err,res) =>{
            if (err) return (done(err))
            console.log('res', res.body)
            const {id,...received} = res.body.data[0]
            expect(received).toEqual(testData)
            done()
        })

    })

})
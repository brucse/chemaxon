require('./settings')
const { errorHandler, ClientError } = require('./ErrorHandler')
const express = require('express')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const cors = require('cors')

const FileData = require('./models/FileData')


const app = express()
app.use(cors())

app.post('/upload', upload.array('userFile'), function (req, res) {
    const file = req.files
    if (!file || file.length === 0) {
        throw new ClientError('There is no file to upload')
    } else {
        const promises = []
        file.forEach(f => {
            promises.push(FileData.create({ fileId: f.filename, fileName : f.originalname}))
        })
        
        Promise.all(promises)
        .then((values) => {
            res.status('200').send()
        })
        .catch(e => {
            throw new Error('database error', e)
        })
    }
})

app.use(errorHandler)

const port = process.env.APP_PORT
module.exports = app.listen(port)
console.log(`server started on port ${port}`)
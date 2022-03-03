require('./settings')
const { errorHandler, ClientError } = require('./ErrorHandler')
const express = require('express')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const app = express()

app.post('/uploads', upload.array('userFile'), function (req, res) {
    const file = req.files
    if (!file || file.length === 0) {
        throw new ClientError('There is no file to upload')
    } else {
        res.status('200').send()
    }
})

app.use(errorHandler)

const port = process.env.APP_PORT
module.exports = app.listen(port)
console.log(`server started on port ${port}`)
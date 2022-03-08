require('./settings')
const { errorHandler, ClientError } = require('./ErrorHandler')
const express = require('express')
const multer = require('multer')
const multerStorage = require('./multerSetting')
const { unlink } = require('fs/promises');

const upload = multer({ storage: multerStorage })

const checkUser = require('./CheckUser')


const cors = require('cors')

const FileData = require('./models/FileData')
const User = require('./models/User')


const app = express()
app.use(cors())

app.post('/upload', checkUser, upload.array('userFile'), function (req, res, next) {
    const userId = req.get('Authorization')
    const file = req.files
    if (!file || file.length === 0) {
        next(new ClientError('There is no file to upload'))
    } else {
        console.log('upload file names', file)
        const promises = []
        file.forEach(f => {
            promises.push(FileData.create({ fileName: f.filename, fileOriginalName: f.originalname, userId: userId, uploadTime : new Date() }))
        })

        Promise.all(promises)
            .then((values) => {
                res.status('200').send()
            })
            .catch(e => {
                next(new Error('database error', e))
            })
    }
})

app.get('/files', checkUser, function (req, res, next) {
    const userId = req.get('Authorization')
    console.log('dir', __dirname)
    console.log('url', req.get('host'))
    FileData.findAll({ where: { userId: userId } }).
        then(data => {
            // console.log('data', data)
            res.status('200').json({ data: data })
        })
        .catch(e => {
            console.error(e)
            next(new Error('Error in listing files', e))
        })
})


app.use(express.json())

app.post('/login', (req, res) => {
    console.log('login body', req.body)
    const login = req.body.login
    const password = req.body.password
    if (login && password) {
        User.findOne({ where: { login: login, password: password } })
            .then(data => {
                if (data) {
                    res.json({ id: data.id })
                } else {
                    res.status(400).json({ message: 'login failed' })
                }
            }).catch(e => {
                console.error(e)

            })
    } else {
        res.status(400).json({ message: 'login failed' })
    }

})

app.delete('/files/:id',checkUser,function(req,res,next){
    const fileId = req.params.id
    const userId = req.get('Authorization') 
    console.log('delete file', fileId, userId)
    FileData.findOne({where : {id : fileId, userId : userId }})
    .then(data =>{
        console.log('file found', data)
        if(!data){
            next(new ClientError('No file to delete'))
        }else{
            console.log('filename to delete', data.fileName)
            unlink(`uploads/${data.fileName}`)
            .then(() =>{
                return data.destroy()
            })
            .catch((e) =>{
                console.error(e)
            })
        }
    })
    .then(() =>{
       res.status('200').send()
    })
    .catch(e =>{
        next(new ClientError('No file to delete'))
    })
})

function allowFileDownload(req, res, next) {
    const userId = req.get('Authorization')
    const path = req.path.slice(1)
    console.log('path', path)
    if (!path) {
        next(new ClientError("Missing file name"))
    } else {
        FileData.findOne({ where: { fileName: path, userId: userId } })
            .then((file) => {
                if (file) next()
                else next( new ClientError("User not authorized to download this file"))

            })
    }
}

//if you want to restrict file download
// app.use('/file', checkUser, allowFileDownload, express.static('uploads'))
app.use('/file', express.static('uploads'))

app.use(errorHandler)

const port = process.env.APP_PORT
module.exports = app.listen(port)
console.log(`server started on port ${port}`)


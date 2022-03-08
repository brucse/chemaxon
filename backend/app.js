require('./settings')
const { errorHandler, ClientError } = require('./ErrorHandler')
const express = require('express')
const multer = require('multer')
const multerStorage = require('./multerSetting')

const upload = multer({storage : multerStorage})



const cors = require('cors')

const FileData = require('./models/FileData')
const User = require('./models/User')


const app = express()
app.use(cors())

app.post('/upload', upload.array('userFile'), function (req, res, next) {
    const file = req.files
    if (!file || file.length === 0) {
        next(new ClientError('There is no file to upload'))
    } else {
        console.log('upload file names', file)
        const promises = []
        file.forEach(f => {
            promises.push(FileData.create({ fileName: f.filename, fileOriginalName: f.originalname }))
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

app.get('/files', function (req, res, next) {
    console.log('dir', __dirname)
    console.log('url', req.get('host'))
    FileData.findAll().
        then(data => {
            console.log('data', data)
            res.status('200').json({ data: data })
        })
        .catch(e => {
            console.error(e)
            next(new Error('Error in listing files', e))
        })
})

function checkUser(req, res, next) {
    console.log('checkuser')
    // FileData.findAll({ where: { id: id } }).
    //     then(data => {
    //         console.log('data', data)
    //         res.status('200').json({ data: data })
    //     })
    //     .catch(e => {
    //         console.error(e)
    //         next(new Error('Error in listing files', e))
    //     })
    next()
}
app.use(express.json())
app.post('/login', (req,res) =>{
    console.log('login body',req.body)
    const login = req.body.login
    const password = req.body.password
    if(login && password){
        User.findOne({where : {login:login,password : password}})
        .then(data =>{
            if(data){
                res.json({id:data.id})
            }else{
                res.status(400).json({message:'login failed'})
            }
        }).catch(e =>{
            console.error(e)
            
        })
    }else{
        res.status(400).json({message:'login failed'})
    }

})

app.use('/file', checkUser, express.static('uploads'))
app.use(errorHandler)

const port = process.env.APP_PORT
module.exports = app.listen(port)
console.log(`server started on port ${port}`)
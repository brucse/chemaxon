const { v4: uuidv4 } = require('uuid');
const multer = require('multer')

module.exports = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, './uploads')
    },

    filename: function (req, file, cb) {
        console.log('file in storage', file)
        const fileName = uuidv4()
        const extension = file.originalname.split('.')[1]
        cb(null, `${fileName}.${extension}`)
    }
})

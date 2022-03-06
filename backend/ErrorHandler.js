const multer = require('multer')

class ClientError extends Error{
    constructor(message){
        super(message)
    }
}


function errorHandler(err,req,res,next){
    //@todo: use real logger instead
    console.error(err)
    if(err instanceof ClientError){
        res.status('400').send(err.message)
    }else if(err instanceof multer.MulterError){
        res.status('400').send('Technical error with upload')
    }else{
        res.status('500').send()
    }
}

module.exports.ClientError = ClientError
module.exports.errorHandler = errorHandler
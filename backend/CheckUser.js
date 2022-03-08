const { ClientError } = require('./ErrorHandler')
const User = require('./models/User')

module.exports = function checkUser(req, res, next) {
    console.log('checkuser', req.get('Authorization'))
    const userId = req.get('Authorization')
    if(userId){
        User.findOne({where :{id: userId}})
        .then((user) =>{
        console.log('user', user)
           if(user) next()
           else next(new ClientError('No such user'))
        })
    }else{
       next(new ClientError('Unauthorized user')) 
    }
}
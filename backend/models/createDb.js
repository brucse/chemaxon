const { sync } = require('./synchronize')
const FileData= require("./FileData")
const User = require("./User")
sync()
.then(() => {
    console.log('db synchronized')
    return User.create({login : 'test', password: 'test'})
})
.then(() =>{
    console.log('test user created')
}).catch((e) => {
    console.error('db synchronization error', e)
})
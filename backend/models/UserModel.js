const {sequelize}= require('./SequelizeInstance')
const {DataTypes} = require("sequelize")

const User = sequelize.define('User',{
    id : {
        type:DataTypes.INTEGER,
        primaryKey : true 
    },
    login : {type:DataTypes.STRING},
    password : {type:DataTypes.STRING},
}, 
{
    tableName : 'user',
    timestamps : false
})

module.exports = User
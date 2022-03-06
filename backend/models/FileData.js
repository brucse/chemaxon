const {sequelize}= require('./SequelizeInstance')
const {DataTypes} = require("sequelize")

const FileData = sequelize.define('FileData',{
    id : {
        type:DataTypes.INTEGER,
        primaryKey : true 
    },
    fileId: {type:DataTypes.STRING},
    fileName : {type:DataTypes.STRING}
}, 
{
    tableName : 'file_data',
    timestamps : false
})

module.exports = FileData


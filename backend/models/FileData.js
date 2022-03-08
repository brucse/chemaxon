const {sequelize}= require('./SequelizeInstance')
const {DataTypes} = require("sequelize")

const FileData = sequelize.define('FileData',{
    id : {
        type:DataTypes.INTEGER,
        primaryKey : true 
    },
    fileName: {type:DataTypes.STRING},
    fileOriginalName: {type:DataTypes.STRING},
    uploadTime : {type : DataTypes.DATE},
    userId : {type : DataTypes.INTEGER}
}, 
{
    tableName : 'file_data',
    timestamps : false
})

module.exports = FileData


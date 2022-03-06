require ("../settings")
const {sequelize} = require("./SequelizeInstance")
const FileData= require("./FileData")

exports.sync = () => {
    return sequelize.sync({alter : true})
}

require ("../settings")
const {sequelize} = require("./SequelizeInstance")
// const FileData= require("./FileData")
// const User = require("./User")

exports.sync = () => {
    return sequelize.sync({alter : true})
}

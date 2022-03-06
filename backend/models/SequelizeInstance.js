const {Sequelize} = require("sequelize")


let sequelize = null

if(!sequelize){
    console.log('new sequelize instance created')
     sequelize = new Sequelize(process.env.DB_SCHEMA, process.env.DB_USER, process.env.DB_PASSWORD,{
         dialect: process.env.DB_DIALECT,
         storage: process.env.DB_HOST 
    })
}else{
    console.log('instance already exists')
}

module.exports = {
    sequelize : sequelize
}
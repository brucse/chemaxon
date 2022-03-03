const dotenvOpt = {}
switch (process.env.NODE_ENV) {
    case 'dev':
        dotenvOpt.path = './.env.dev' 
        break;
    case 'test':
        dotenvOpt.path = './.env.test' 
        break;
    default:
        break;
}

const dotenv = require('dotenv').config(dotenvOpt)
if(dotenv.error){
    throw dotenv.error
}


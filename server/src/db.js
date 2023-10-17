require('dotenv').config();
const { Sequelize } = require('sequelize');
const {
  DB_USER, DB_PASSWORD, DB_DEPLOY,
} = process.env;

//localhost
// const sequelize = new Sequelize('store', DB_USER, DB_PASSWORD, {
//   host: 'localhost',
//   dialect: 'postgres',
//   logging: false
// });

//railway
const sequelize = new Sequelize({
  connectionString: DB_DEPLOY + "?sslmode=require",
}); 


module.exports =  sequelize ;

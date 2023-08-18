require('dotenv').config();
const { Sequelize } = require('sequelize');
const {
  DB_USER, DB_PASSWORD, DB_DEPLOY,
} = process.env;

const sequelize = new Sequelize('Store', DB_USER, DB_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',
  logging: false
});

//railway
// const sequelize = new Sequelize(DB_DEPLOY, {
//   logging: false,
//   native: false,
// }); 


module.exports =  sequelize ;

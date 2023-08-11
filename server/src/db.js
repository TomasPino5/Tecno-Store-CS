require('dotenv').config();
const { Sequelize } = require('sequelize');
const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_DEPLOY
} = process.env;

const sequelize = new Sequelize(DB_DEPLOY,{
  host: `${DB_HOST}`,
  dialect: 'postgres',
  logging: false
});


module.exports =  sequelize ;

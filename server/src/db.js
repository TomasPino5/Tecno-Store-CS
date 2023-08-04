require('dotenv').config();
const { Sequelize } = require('sequelize');
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const sequelize = new Sequelize('Store', DB_USER, DB_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',
  logging: false
});


module.exports =  sequelize ;
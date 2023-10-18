require('dotenv').config();
const { Sequelize } = require('sequelize');
const {
  POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, DB_PORT, POSTGRES_DATABASE
} = process.env;

//localhost
// const sequelize = new Sequelize('store', DB_USER, DB_PASSWORD, {
//   host: 'localhost',
//   dialect: 'postgres',
//   logging: false
// });

//railway
const sequelize = new Sequelize(POSTGRES_DATABASE, POSTGRES_USER, POSTGRES_PASSWORD, {
  host: POSTGRES_HOST,
  port: 5432,
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Puedes necesitar ajustar esto basándote en tu configuración de Vercel
    }
  }
});


module.exports =  sequelize ;

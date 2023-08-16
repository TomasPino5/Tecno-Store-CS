const server = require('./src/app');
const sequelize = require('./src/db');
require('./src/models/product');
require('./src/models/users');
require('dotenv').config();
const port = process.env.PORT || 3001;

sequelize.sync({ force: false }).then(() => { //true
  server.listen(port, () => {
    console.log('%s listening at 3001')
  });
});

// require('dotenv').config();
// const server = require('./src/app.js');
// const port = process.env.PORT || 3001;
// const sequelize = require('./src/db');

// sequelize.sync({ force: true }).then(() => {
//   server.listen(port, () => {
//   console.log(`Server raised in port ${port}`);
//   });
// });
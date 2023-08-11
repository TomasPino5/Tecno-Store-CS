// const server = require('./src/app');
// const sequelize = require('./src/db');
// require('./src/models/product');
// require('./src/models/users');

// sequelize.sync({ force: false }).then(() => { //true
//   server.listen(3001, () => {
//     console.log('%s listening at 3001')
//   });
// });

require('dotenv').config();
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const port = process.env.PORT || 3001;

conn.sync({ force: true }).then(() => {
  server.listen(port, () => {
  console.log(`Server raised in port ${port}`);
  });
});
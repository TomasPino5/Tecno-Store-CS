const server = require('./src/app');
const sequelize = require('./src/db');
require('./src/models/product');
require('./src/models/users');

sequelize.sync({ force: false }).then(() => { //true
  server.listen(3001, () => {
    console.log('%s listening at 3001')
  });
});

// server.listen(3001, () => {
//   console.log('%s listening at 3001')
// });
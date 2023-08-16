const server = require('./src/app');
const sequelize = require('./src/db');
require('dotenv').config();
require('./src/models/product');
require('./src/models/users');
const port = process.env.PORT || 3001

sequelize.sync({ force: false }).then(() => { //true
  server.listen(port, () => {
    console.log(`%s listening at ${port}`)
  });
});
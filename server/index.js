const server = require('./src/app');
const sequelize = require('./src/db');
require('./src/models/product');
require('./src/models/users');

//railway
require('dotenv').config();
const port = process.env.PORT || 3001;

//localhost
// sequelize.sync({ force: false }).then(() => { //true
// server.listen(3001, () => {
// console.log('%s listening at 3001')
// });
// });

//railway
sequelize.sync({ force: true }).then(() => { //true
   server.listen(port, () => {
     console.log(`%s listening at ${port}`)
   });
 });

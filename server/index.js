const server = require('./src/app.js');
const sequelize = require('./src/db.js')

sequelize.sync({force:false}).then(()=>{
  server.listen(3001, () => {
    console.log('%s listening at 3001')
  });  
})
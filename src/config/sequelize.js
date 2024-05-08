
const config = require('./');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(config.mysql.database, config.mysql.user, config.mysql.password, {
  host: config.mysql.host,
  dialect: 'mysql', 
  logging: false,
});


module.exports = sequelize;
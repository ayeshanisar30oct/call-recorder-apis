
const config = require('./');
const { Sequelize } = require('sequelize');
const { models } = require('../models');

const sequelize = new Sequelize(config.mysql.database, config.mysql.user, config.mysql.password, {
  host: config.mysql.host,
  dialect: 'mysql', 
  logging: false,
});


module.exports = sequelize;
// const mysql = require('mysql2/promise');
const config = require('./');
// const app = require('./app');

const { Sequelize } = require('sequelize');
const { models } = require('../models');
// Option 1: Passing parameters separately
const sequelize = new Sequelize(config.mysql.database, config.mysql.user, config.mysql.password, {
  host: config.mysql.host,
  dialect: 'mysql', // Use 'postgres', 'mssql', 'sqlite', 'mariadb' depending on your database system.
  // Additional options
  logging: false, // Disable logging; default is console.log. Set true for enabling logging.
});

// Import other models...
module.exports = sequelize;
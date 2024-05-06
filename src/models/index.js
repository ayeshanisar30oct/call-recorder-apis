const sequelize = require('../config/sequelize'); 
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;
const User = require('./user.model');
 Models = {
  User: User,
};

module.exports = Models;
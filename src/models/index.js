const sequelize = require("../config/sequelize");
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;

const User = require("./user.model");
// const Subscriptions = require("./subscriptions.model");

Models = {
  User: User,
  // Subscriptions: Subscriptions,
};

// console.log("associate");
// Object.values(Models).forEach((model) => {
//   // console.log(model);
//   if (model.associate) {
//     model.associate(Models);
//   }
// });

module.exports = Models;

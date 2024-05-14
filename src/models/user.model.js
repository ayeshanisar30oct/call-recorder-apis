const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize'); 
// const bcrypt = require('bcrypt');

class User extends Model {

  static associate(models) {

      User.hasOne(models.Subscriptions, {
        foreignKey: "uuid",
        // targetKey: "uuid",
        sourceKey: "uuid",
        as: "subscription",
        constraints: false,
      });

      User.hasMany(models.Calls, {
        foreignKey: "user_id",
        as: "calls",
        constraints: false,
      });

      User.hasMany(models.VoiceMemos, {
        foreignKey: "user_id",
        as: "voiceMemos",
        constraints: false,
      });

        User.hasMany(models.CallsQueue, {
          foreignKey: "user_id",
          as: "callsQueue",
          constraints: false,
        });
 }
}

User.init(
  {
  id: {
    autoIncrement: true,
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    primaryKey: true
  },
  uuid: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  phone_number: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: true,
    unique: "users_email_unique"
  },
  playerId: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  connectionId: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
   created_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  is_subscribed: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  deleted: {
   type: DataTypes.BOOLEAN,
    allowNull: true
  },
  deleted_at: {
   type: DataTypes.DATE,
    allowNull: true
  }
},

 {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  timestamps: false
}
);


module.exports = User;
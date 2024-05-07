const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../config/sequelize");

class Calls extends Model {
  static associate(Models) {}
}

Calls.init(
  {
    user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    dest_number: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
    },
    ip_address: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    account_sid: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    call_sid: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
    },
    recording_url: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    recording_status: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    recording_duration: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },

  {
    sequelize,
    modelName: "Calls",
    tableName: "calls",
    timestamps: false,
  }
);

module.exports = Calls;

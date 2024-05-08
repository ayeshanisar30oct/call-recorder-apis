const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/sequelize");

class CallsQueue extends Model {
  static associate(Models) {}
}

CallsQueue.init(
  {
    user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
    },
    dest_number: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    ip_address: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },

  {
    sequelize,
    modelName: "CallsQueue",
    tableName: "call_queue",
    timestamps: false,
  }
);

module.exports = CallsQueue;

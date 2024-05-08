const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/sequelize");

class Subscriptions extends Model {
  static associate(Models) {}
}

Subscriptions.init(
  {
    uuid: {
      type: DataTypes.STRING(255),
      allowNull: true,
      primaryKey: true
    },
    period_type: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    purchased_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    expiration_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    store: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    environment: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    last_event_type: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    transaction_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true
    },
    product_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    entitlement_ids: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    active_subscription: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    subscription_status: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    lifetime_value: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
  },
  {
    sequelize,
    modelName: "Subscriptions",
    tableName: "subscriptions",
    timestamps: false
  }
);

module.exports = Subscriptions;

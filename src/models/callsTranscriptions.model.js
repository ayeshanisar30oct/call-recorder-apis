const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/sequelize");

class CallsTranscriptions extends Model {
  
  static associate(models) {

     CallsTranscriptions.belongsTo(models.Calls, {
       foreignKey: "call_sid",
       as: "call_transcription",
     });

  }
}

CallsTranscriptions.init(
  {
    user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    call_sid: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
    },
    transcription: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    transcription_source: {
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
    modelName: "CallsTranscriptions",
    tableName: "calls_transcriptions",
    timestamps: false,
  }
);

module.exports = CallsTranscriptions;

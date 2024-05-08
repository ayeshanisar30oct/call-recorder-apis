const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/sequelize");

class VoiceMemos extends Model {
  static associate(models) {

    VoiceMemos.hasOne(models.VoiceMemosTranscriptions, {
      foreignKey: "memo_sid",
      as: "transcription",
    });
  }
}

VoiceMemos.init(
  {
    user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: "User",
        key: "id",
      },
    },
    ip_address: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    memo_sid: {
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
    modelName: "VoiceMemos",
    tableName: "voice_memos",
    timestamps: false,
  }
);

module.exports = VoiceMemos;

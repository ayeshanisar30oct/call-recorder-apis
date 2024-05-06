const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../config/sequelize");
const bcrypt = require("bcrypt");

class VoiceMemoTranscription extends Model {}

VoiceMemoTranscription.init(
  {
    user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    memo_sid: {
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
    modelName: "VoiceMemosTranscriptions",
    tableName: "voice_memos_transcriptions",
    timestamps: false,
  }
);

module.exports = VoiceMemoTranscription;

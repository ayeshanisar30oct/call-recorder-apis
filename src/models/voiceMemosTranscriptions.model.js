const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/sequelize");

class VoiceMemosTranscriptions extends Model {
  static associate(models) {

      VoiceMemosTranscriptions.belongsTo(models.VoiceMemos, {
        foreignKey: "memo_sid",
        as: "memo_transcription",
      });

  }
}

VoiceMemosTranscriptions.init(
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

module.exports = VoiceMemosTranscriptions;

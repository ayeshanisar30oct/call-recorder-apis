const sequelize = require("../config/sequelize");
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;

const User = require("./user.model");
const Subscriptions = require("./subscriptions.model");
const Calls = require("./calls.model");
const CallsTranscriptions = require("./callsTranscriptions.model");
const CallsQueue = require("./callsQueue.model");
const VoiceMemos = require("./voiceMemos.model");
const VoiceMemosTranscriptions = require("./voiceMemosTranscriptions.model");

Models = {
  User: User,
  Subscriptions: Subscriptions,
  Calls: Calls,
  CallsTranscriptions: CallsTranscriptions,
  CallsQueue: CallsQueue,
  VoiceMemos: VoiceMemos,
  VoiceMemosTranscriptions: VoiceMemosTranscriptions,
};

// console.log("associate");
Object.values(Models).forEach((model) => {
  // console.log(model);
  if (model.associate) {
    model.associate(Models);
  }
});

module.exports = Models;

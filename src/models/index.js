const sequelize = require("../config/sequelize");
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;

const User = require("./user.model");
// const CallQueue = require("./calls-queue.model");
// const CallTranscription = require("./calls-transcriptions.model");
// const Call = require("./calls.model");
// const Subscription = require("./subscriptions.model");
// const VoiceMemoTranscription = require("./voice-memos-transcriptions.model");
// const VoiceMemo = require("./voice-memos.model");
// const VoiceMemo = require('./voice-memos.model')

const Models = {
  User: User,
  // CallQueue: CallQueue,
  // CallTranscription: CallTranscription,
  // Call: Call,
  // Subscription: Subscription,
  // VoiceMemoTranscription: VoiceMemoTranscription,
  // VoiceMemo: VoiceMemo,
};

module.exports = Models;

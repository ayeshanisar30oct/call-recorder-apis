const { sequelize, DataTypes, literal } = require("sequelize");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/user.model");
const Subscriptions = require("../models/subscriptions.model");
const VoiceMemos = require("../models/voiceMemos.model");
const Calls = require("../models/calls.model");
const CallsTranscriptions = require("../models/callsTranscriptions.model");
const VoiceMemosTranscriptions = require("../models/voiceMemosTranscriptions.model");
const CallsQueue = require("../models/callsQueue.model");

const getUsers = catchAsync(async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
    //  console.log("users");
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
});

const getSubscriptions = catchAsync(async (req, res) => {
  try {
    const subscriptions = await Subscriptions.findAll();
    res.json(subscriptions);
    //  console.log("subscriptions");
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    throw error;
  }
});

const getVoiceMemos = catchAsync(async (req, res) => {
  try {
    const voiceMemos = await VoiceMemos.findAll();
    res.json(voiceMemos);
    //  console.log("voiceMemos");
  } catch (error) {
    console.error("Error fetching Voice-Memos:", error);
    throw error;
  }
});

const getCalls = catchAsync(async (req, res) => {
  try {
    const calls = await Calls.findAll();
    res.json(calls);
    //  console.log("calls");
  } catch (error) {
    console.error("Error fetching calls:", error);
    throw error;
  }
});

const userCall = catchAsync(async (req, res) => {
  try {
    const { user_id } = req.body;
    if (!user_id) {
      return res.status(400).json({ error: "'user_id' is required." });
    }
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.json({ message: "User not found." });
    }

    const calls = await Calls.findAll({ where: { user_id } });

    if (calls.length === 0) {
      return res.json({ message: "This user has no calls yet." });
    }
    res.json(calls);
    //  console.log("calls");
  } catch (error) {
    console.error("Error fetching calls:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

const userVoiceMemo = catchAsync(async (req, res) => {
  try {
    const { user_id } = req.body;
    if (!user_id) {
      return res.status(400).json({ error: "'user_id' is required." });
    }
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.json({ message: "User not found." });
    }

    const voiceMemos = await VoiceMemos.findAll({ where: { user_id } });

    if (voiceMemos.length === 0) {
      return res.json({
        message: "There is no voice memo recorded for the user.",
      });
    }
    res.json(voiceMemos);
  } catch (error) {
    console.error("Error fetching User's Voice Memos:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

const userSubscribed = catchAsync(async (req, res) => {
  try {
    const { user_id } = req.body;
    if (!user_id) {
      return res.status(400).json({ error: "'user_id' is required." });
    }

    const user = await User.findByPk(user_id, { attributes: ["id", "uuid"] });
    if (!user) {
      return res.json({ message: "User not found." });
    }

    const subscription = await Subscriptions.findOne({
      where: { uuid: user.uuid },
      attributes: ["active_subscription"],
    });
if (!subscription) {
  return res.json({ message: "No subscription found for the user." });
}
    if (subscription.active_subscription) {
      return res.json({ message: "User is subscribed." });
    } else {
      return res.json({ message: "User is not subscribed." });
    }
  } catch (error) {
    console.error("Error fetching subscription details:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

const callsTranscriptions = catchAsync(async (req, res) => {
  try {
    const { user_id } = req.body;
    if (!user_id) {
      return res.status(400).json({ error: "'user_id' is required." });
    }

    const user = await User.findByPk(user_id);
    if (!user) {
      return res.json({ message: "User not found." });
    }
    const calls = await Call.findAll({
      where: { user_id },
      attributes: ["call_sid"],
    });

    if (calls.length === 0) {
      return res.json({ message: "This user has no calls yet." });
    }

    const callSid = calls.map((call) => call.call_sid);

    const userCallsTranscriptions = await CallsTranscriptions.findAll({
      where: { call_sid: callSid },
      attributes: [
        "call_sid",
        // "transcription",
        [
          literal("JSON_UNQUOTE(JSON_EXTRACT(transcription, '$.text'))"),
          "transcription",
        ],
        "transcription_source",
        "created_at",
      ],
    });

    if (userCallsTranscriptions.length === 0) {
      return res.json({
        message: "No Transcriptions found for the User's Calls.",
      });
    }
    res.json({ "Calls Transcriptions of the User": userCallsTranscriptions });
  } catch (error) {
    console.error("Error fetching Calls Transcriptions:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

const voiceMemosTranscriptions = catchAsync(async (req, res) => {
  try {
    const { user_id } = req.body;
    if (!user_id) {
      return res.status(400).json({ error: "'user_id' is required." });
    }

    const user = await User.findByPk(user_id);
    if (!user) {
      return res.json({ message: "User not found." });
    }
    const userVoiceMemos = await VoiceMemos.findAll({
      where: { user_id },
      attributes: ["memo_sid"],
    });

    if (userVoiceMemos.length === 0) {
      return res.json({
        message: "There is no voice memo recorded for the user.",
      });
    }

    const memoSid = userVoiceMemos.map((voiceMemos) => voiceMemos.memo_sid);

    const userVoiceMemosTranscriptions = await VoiceMemosTranscriptions.findAll({
      where: { memo_sid: memoSid },
      attributes: [
        "memo_sid",
        // "transcription",
        [
          literal("JSON_UNQUOTE(JSON_EXTRACT(transcription, '$.text'))"),
          "transcription",
        ],
        "transcription_source",
        "created_at",
      ],
    });

    if (userVoiceMemosTranscriptions.length === 0) {
      return res.json({
        message: "No Transcriptions found for the User's Voice Memos.",
      });
    }
    res.json({
      "Voice Memos Transcriptions of the User": userVoiceMemosTranscriptions,
    });
  } catch (error) {
    console.error("Error fetching Voice Memos Transcriptions:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

const getCallsQueue = catchAsync(async (req, res) => {
  try {
    const callsQueue = await CallsQueue.findAll();
    res.json(callsQueue);
    // console.log("callsQueue");
  } catch (error) {
    console.error("Error fetching Calls Queue:", error);
    throw error;
  }
});

const getUserCallsQueue = catchAsync(async (req, res) => {
  try {
    const { user_id } = req.body;
    if (!user_id) {
      return res.status(400).json({ error: "'user_id' is required." });
    }
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.json({ message: "User not found." });
    }

    const userCallsQueue = await CallsQueue.findAll({ where: { user_id } });

    if (userCallsQueue.length === 0) {
      return res.json({ message: "You don't have any call in the queue" });
    }
    res.json(userCallsQueue);
  } catch (error) {
    console.error("Error fetching User's Call Queue:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = {
  getUsers,
  getSubscriptions,
  getVoiceMemos,
  getCalls,
  userCall,
  userSubscribed,
  userVoiceMemo,
  callsTranscriptions,
  voiceMemosTranscriptions,
  getCallsQueue,
  getUserCallsQueue,
};

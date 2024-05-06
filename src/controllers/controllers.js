const { sequelize, DataTypes, literal } = require("sequelize");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/user.model");
const Subscription = require("../models/subscriptions.model");
const VoiceMemo = require("../models/voice-memos.model");
const Call = require("../models/calls.model");
const CallTranscription = require("../models/calls-transcriptions.model");
const VoiceMemoTranscription = require("../models/voice-memos-transcriptions.model");
const CallQueue = require("../models/calls-queue.model");

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
    const subscriptions = await Subscription.findAll();
    res.json(subscriptions);
    //  console.log("subscriptions");
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    throw error;
  }
});

const getVoiceMemos = catchAsync(async (req, res) => {
  try {
    const voiceMemos = await VoiceMemo.findAll();
    res.json(voiceMemos);
    //  console.log("voiceMemos");
  } catch (error) {
    console.error("Error fetching Voice-Memos:", error);
    throw error;
  }
});

const getCalls = catchAsync(async (req, res) => {
  try {
    const calls = await Call.findAll();
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

    const calls = await Call.findAll({ where: { user_id } });

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

    const voiceMemos = await VoiceMemo.findAll({ where: { user_id } });

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

    const subscription = await Subscription.findOne({
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

    const callTranscriptions = await CallTranscription.findAll({
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

    if (callTranscriptions.length === 0) {
      return res.json({
        message: "No Transcriptions found for the User's Calls.",
      });
    }
    res.json({ "Calls Transcriptions of the User": callTranscriptions });
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
    const voiceMemos = await VoiceMemo.findAll({
      where: { user_id },
      attributes: ["memo_sid"],
    });

    if (voiceMemos.length === 0) {
      return res.json({
        message: "There is no voice memo recorded for the user.",
      });
    }

    const memoSid = voiceMemos.map((voiceMemo) => voiceMemo.memo_sid);

    const voiceMemoTranscriptions = await VoiceMemoTranscription.findAll({
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

    if (voiceMemoTranscriptions.length === 0) {
      return res.json({
        message: "No Transcriptions found for the User's Voice Memos.",
      });
    }
    res.json({
      "Voice Memos Transcriptions of the User": voiceMemoTranscriptions,
    });
  } catch (error) {
    console.error("Error fetching Voice Memos Transcriptions:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

const getCallsQueue = catchAsync(async (req, res) => {
  try {
    const callsQueue = await CallQueue.findAll();
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

    const callsQueue = await CallQueue.findAll({ where: { user_id } });

    if (callsQueue.length === 0) {
      return res.json({ message: "You don't have any call in the queue" });
    }
    res.json(callsQueue);
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

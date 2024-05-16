const { sequelize, DataTypes, literal } = require("sequelize");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/user.model");
const Subscriptions = require("../models/subscriptions.model");
const VoiceMemos = require("../models/voiceMemos.model");
const Calls = require("../models/calls.model");
const CallsTranscriptions = require("../models/callsTranscriptions.model");
const VoiceMemosTranscriptions = require("../models/voiceMemosTranscriptions.model");
const CallsQueue = require("../models/callsQueue.model");
const { v4: uuidv4 } = require('uuid');

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

const createUsers = catchAsync(async (req, res) => {
  try {
    let newUser = req.body; // Get the new user data from the request body

    // Generate a unique UUID for the new user
    let uuid = uuidv4();
    newUser.uuid = uuid;

    // Keep generating a new UUID until it's unique
    while (true) {
      try {
        // Attempt to create a new user in the database
        const createdUser = await User.create(newUser);
        res.status(201).json(createdUser); // Return the created user with status code 201 (Created)
        break; // Exit the loop if user creation is successful
      } catch (error) {
        // Check if the error is due to duplicate UUID
        if (error.code === 'ER_DUP_ENTRY' && error.sqlMessage.includes('uuid_UNIQUE')) {
          // Generate a new UUID and assign it to the new user
          uuid = uuidv4();
          newUser.uuid = uuid;
        } else {
          // If it's another type of error, rethrow it
          throw error;
        }
      }
    }
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Error creating user" });
  }
});



const updateUsers = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;
    const newData = req.body;
     console.log(id);
    console.log("id");
    console.log(newData);
    console.log("newData");

    // Find the user by id and update the data
    const [updatedRowsCount, updatedUsers] = await User.update(newData, {
      where: { id },
      returning: true, // Return the updated user
    });

    if (updatedRowsCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const updatedUser = updatedUsers[0]; // The first element in the returned array is the updated user

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Error updating user" });
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
let { user_id, id } = req.body;

if (!user_id && id) {
  user_id = id;
}

    if (!user_id) {
      return res.status(400).json({ error: "'user_id' is required." });
    }
    const user = await User.findByPk(user_id, {
      include: {
        model: Calls,
        as: "calls",
      },
    });
    if (!user) {
      return res.json({ message: "User not found." });
    }

    const calls = user.calls; 

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
     let { user_id, id } = req.body;

      if (!user_id && id) {
        user_id = id;
      }

    if (!user_id) {
      return res.status(400).json({ error: "'user_id' or 'id' is required." });
    }
    const user = await User.findByPk(user_id, {
      include: {
        model: VoiceMemos,
        as: "voiceMemos",
      },
    });
    if (!user) {
      return res.json({ message: "User not found." });
    }

 const voiceMemos = user.voiceMemos;

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

    const user = await User.findByPk(user_id, {
      attributes: ["id", "uuid"],
      include: {
        model: Subscriptions,
        as: "subscription",
        attributes: ["active_subscription"],
      },
    });

    if (!user) {
      return res.json({ message: "User not found." });
    }

    const subscription = user.subscription;

    if (!subscription) {
      return res.json({ message: "No subscription found for the user." });
    }

    const isSubscribed = subscription.active_subscription;
    return res.json({
      message: isSubscribed
        ? "User's subscription is active"
        : "User's subscription is inactive",
    });
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

    const user = await User.findByPk(user_id, {
      include: [
        {
          model: Calls,
          as: "calls",
          attributes: ["call_sid"],
          include: [
            {
              model: CallsTranscriptions,
              as: "transcription",
              attributes: [
                "call_sid",
                [
                  literal(
                    "JSON_UNQUOTE(JSON_EXTRACT(transcription, '$.text'))"
                  ),
                  "transcription",
                ],
                "transcription_source",
                "created_at",
              ],
            },
          ],
        },
      ],
    });

    if (!user) {
      return res.json({ message: "User not found." });
    }

    const userCalls = user.calls;
    if (userCalls.length === 0) {
      return res.json({ message: "This user has no calls yet." });
    }

    const callSids = userCalls.map((call) => call.call_sid);

    const userCallsTranscriptions = await CallsTranscriptions.findAll({
      where: { call_sid: callSids },
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

    const user = await User.findByPk(user_id, {
      include: [
        {
          model: VoiceMemos,
          as: "voiceMemos",
          attributes: ["memo_sid"],
          include: [
            {
              model: VoiceMemosTranscriptions,
              as: "transcription",
              attributes: [
                "memo_sid",
                [
                  literal(
                    "JSON_UNQUOTE(JSON_EXTRACT(transcription, '$.text'))"
                  ),
                  "transcription",
                ],
                "transcription_source",
                "created_at",
              ],
            },
          ],
        },
      ],
    });

    if (!user) {
      return res.json({ message: "User not found." });
    }

    const userVoiceMemos = user.voiceMemos;
    if (userVoiceMemos.length === 0) {
      return res.json({
        message: "There is no voice memo recorded for the user.",
      });
    }

    const memoSids = userVoiceMemos.map((voiceMemo) => voiceMemo.memo_sid);

    const userVoiceMemosTranscriptions = await VoiceMemosTranscriptions.findAll(
      {
        where: { memo_sid: memoSids },
      }
    );

    if (userVoiceMemosTranscriptions.length === 0) {
      return res.json({
        message: "No Transcriptions found for the User's Voice Memos.",
      });
    }

    res.json({
      "Voice memos Transcriptions of the User": userVoiceMemosTranscriptions,
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

    const user = await User.findByPk(user_id, { include: "callsQueue" });
    if (!user) {
      return res.json({ message: "User not found." });
    }

    const userCallsQueue = user.callsQueue;

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
  createUsers,
  updateUsers,
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



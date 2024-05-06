const express = require("express");
const router = express.Router();
const { register_route } = require("../utils/register.routes");
const controllers = require("../controllers/controllers");
const routes = [
  {
    route: "/users",
    methods: [
      {
        method: "GET",
        handler: controllers.getUsers,
      },
    ],
  },

  {
    route: "/subscriptions",
    methods: [
      {
        method: "GET",
        handler: controllers.getSubscriptions,
      },
    ],
  },
  {
    route: "/voice-memos",
    methods: [
      {
        method: "GET",
        handler: controllers.getVoiceMemos,
      },
    ],
  },
  {
    route: "/calls",
    methods: [
      {
        method: "GET",
        handler: controllers.getCalls,
      },
    ],
  },
  {
    route: "/user-call",
    methods: [
      {
        method: "POST",
        handler: controllers.userCall,
      },
    ],
  },
  {
    route: "/user-subscribed",
    methods: [
      {
        method: "POST",
        handler: controllers.userSubscribed,
      },
    ],
  },
  {
    route: "/user-voice-memo",
    methods: [
      {
        method: "POST",
        handler: controllers.userVoiceMemo,
      },
    ],
  },
  {
    route: "/calls-transcriptions",
    methods: [
      {
        method: "POST",
        handler: controllers.callsTranscriptions,
      },
    ],
  },
  {
    route: "/voice-memos-transcriptions",
    methods: [
      {
        method: "POST",
        handler: controllers.voiceMemosTranscriptions,
      },
    ],
  },
  {
    route: "/calls-queue",
    methods: [
      {
        method: "GET",
        handler: controllers.getCallsQueue,
      },
    ],
  },
  {
    route: "/user-calls-queue",
    methods: [
      {
        method: "POST",
        handler: controllers.getUserCallsQueue,
      },
    ],
  },
];

register_route(router, routes);
module.exports = router;

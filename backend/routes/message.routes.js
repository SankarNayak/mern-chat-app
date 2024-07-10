const express = require('express');
const messageController = require("../controllers/message.controller.js");
const protectRoute = require("../middleware/protectRoute.js");

const router = express.Router();

router.get("/:id", protectRoute, messageController.getMessages);
router.post("/send/:id", protectRoute, messageController.sendMessage);

module.exports = router;

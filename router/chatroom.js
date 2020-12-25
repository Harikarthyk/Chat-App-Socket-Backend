const express = require("express");
const {isSignedIn, isAuthenticated} = require("../controller/auth");
const {createNewChatRoom, allChatRoom} = require("../controller/chatroom");
const {getUserById} = require("../controller/user");
const router = express.Router();

router.param("userId", getUserById);

router.post(
	"/create/chatRoom/:userId",
	isSignedIn,
	isAuthenticated,
	createNewChatRoom,
);

router.get("/all/rooms/:userId", isSignedIn, isAuthenticated, allChatRoom);

module.exports = router;

const express = require("express");
const {isSignedIn, isAuthenticated} = require("../controller/auth");
const {
	createNewChatRoom,
	allChatRoom,
	getChatByRoomId,
	setChatRoomId,
} = require("../controller/chatroom");
const {getUserById} = require("../controller/user");
const router = express.Router();

router.param("userId", getUserById);

router.param("chatId", setChatRoomId);

router.post(
	"/create/chatRoom/:userId",
	isSignedIn,
	isAuthenticated,
	createNewChatRoom,
);

router.get("/all/rooms/:userId", isSignedIn, isAuthenticated, allChatRoom);

router.get(
	"/room/:chatId/:userId",
	isSignedIn,
	isAuthenticated,
	getChatByRoomId,
);

module.exports = router;

const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
	chatRoom: {
		type: mongoose.Schema.Types.ObjectId,
		required: "Chatroom is required!",
		ref: "ChatRoom",
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: "User is required!",
		ref: "User",
	},
	message: {
		type: String,
		required: "Message is required!",
	},
	visible: {
		type: Boolean,
		default: true,
	},
});

module.exports = mongoose.model("Message", messageSchema);

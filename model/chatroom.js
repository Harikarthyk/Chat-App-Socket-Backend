const mongoose = require("mongoose");

const users = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
});

const usersInChatSchema = mongoose.model("UsersInChatSchemna", users);

const chatRoomSchema = new mongoose.Schema(
	{
		roomName: {
			type: String,
			required: true,
		},
		admin: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		status: {
			type: String,
			default: "Update your room status name",
		},
		photo: {
			data: Buffer,
			contentType: String,
		},
		users: [users],
	},
	{timestamps: true},
);

const chatRoom = mongoose.model("ChatRoom", chatRoomSchema);

module.exports = {
	chatRoom,
	usersInChatSchema,
};

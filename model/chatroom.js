const mongoose = require("mongoose");

const allUsersSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
});

const usersInChatSchema = mongoose.model("usersInChatSchema", allUsersSchema);

const chatRoomSchema = new mongoose.Schema(
	{
		allUsers: [allUsersSchema],
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
	},
	{timestamps: true},
);

const ChatRoom = mongoose.model("ChatRoom", chatRoomSchema);

module.exports = {
	ChatRoom,
	usersInChatSchema,
};

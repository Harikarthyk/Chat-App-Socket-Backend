const mongoose = require("mongoose");

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
	},
	{timestamps: true},
);

module.exports = mongoose.model("ChatRoom", chatRoomSchema);

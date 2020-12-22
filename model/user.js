const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		photo: {
			data: Buffer,
			contentType: String,
		},
		friends: {
			type: Array,
			default: [],
		},
		status: {
			type: String,
			default: "I am Available",
		},
	},
	{timestamps: true},
);

module.exports = mongoose.model("User", userSchema);

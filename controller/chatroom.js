const ChatRoom = require("../model/chatroom");

// #TODO => UPLOAD PHOTOS OPTION
//Creating new chat Rooms.
exports.createNewChatRoom = (req, res) => {
	req.body.admin = req.user._id;
	let newChatRoom = new ChatRoom(req.body);
	newChatRoom
		.save()
		.then(() => {
			res.status(200).json({
				message: "ChatRoom created successfully",
			});
		})
		.catch((error) =>
			res.status(400).json({
				error: "Error in creating chat Rooms",
			}),
		);
};

//Setting up req.chatRoom
exports.getChatRoomByChatId = (req, res, next, id) => {
	Chatroom.findById(id).exec((error, result) => {
		if (error) {
			return res.status(400).json({
				error: "Error in find the chat room ",
			});
		}

		req.chatRoom = result;
		next();
	});
};

//ChatRoom information by req.chatRoom.
exports.chatRoomInfo = (req, res) => {
	ChatRoom.find({_id: req.chatRoom._id}, (error, result) => {
		if (error) {
			return res.status(400).json({
				error: "Error in finding the chat Rooms",
			});
		}
		return res.status(200).json({
			chatRoom: result,
		});
	});
};

// #TODO => UPLOAD PHOTOS OPTION
//Updating the chat Room
exports.updateChatRoom = (req, res) => {
	if (!req.chatRoom) {
		return res.status(400).json({
			error: "Error in updating the chat room",
		});
	}

	Chatroom.findOneAndUpdate({_id: req.chatRoom._id}, {$set: req.body}).exec(
		(error, result) => {
			if (error) {
				return res.status(400).json({
					error: "Error in updating the chat room",
				});
			}
			return res.status(200).json({
				message: "Updated Successfully",
			});
		},
	);
};


//Getting all chatRooms by userId 
exports.allChatRoom = (req,res) => {
	
}
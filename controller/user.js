const User = require("../model/user");

//Setting up req.user
exports.getUserById = (req, res, next, id) => {
	User.findById(id).exec((error, result) => {
		if (error) {
			return res.status(400).json({
				error: "Error in find the user ",
			});
		}

		//hiding the encrypted password.
		result.password = undefined;
		req.user = result;
		next();
	});
};

//Getting user Information by req.user
exports.getUserDetails = (req, res) => {
	console.log(req.user);
	if (!req.user) {
		return res.status(400).json({
			error: "User not found",
		});
	}
	return res.status(200).json({
		user: req.user,
	});
};

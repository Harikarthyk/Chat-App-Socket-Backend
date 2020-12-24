const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const expressJWT = require("express-jwt");

//Registeration of new user
exports.registerUser = (req, res) => {
	//Checking redundant user @email
	User.find({email: req.body.email}, (error, result) => {
		if (error) {
			return res.status(400).json({
				error: "Error in registering",
			});
		}

		//If email exists return error
		if (result.length >= 1) {
			return res.status(400).json({
				error: "Email Id already in use",
			});
		}

		//Encrypting password based on the salt rounds
		let salt = Number(process.env.SALT_ROUND);
		bcrypt.hash(req.body.password, salt, (err, hash) => {
			if (!hash) {
				console.log(hash);
				return res.status(400).json({
					error: "Error in creating Account",
					err: err,
				});
			}

			req.body.password = hash;
			let newUser = new User(req.body);

			//Save the new user in Database
			newUser
				.save()
				.then(() =>
					res.status(200).json({
						message: "Account created Successfully",
					}),
				)
				.catch((e) =>
					res.status(400).json({
						error: "Error in creating account",
					}),
				);
		});
	});
};

//Login
exports.login = (req, res) => {
	User.find({email: req.body.email}, (error, result) => {
		if (error) {
			return res.status(400).json({
				error: "Error in logging in",
			});
		}
		if (result.length === 0) {
			return res.status(400).json({
				error: "Account not found",
			});
		}

		//Compare the user_password and encrypted password in the database
		bcrypt.compare(req.body.password, result[0].password, (err, check) => {
			if (!check) {
				return res.status(400).json({
					error: "Missmatch username / password ",
				});
			}

			//Generate the JWT token
			var token = jwt.sign({_id: result[0]._id}, process.env.PRIVATE_KEY);

			//Setting up the cookies
			res.cookie("token", token, {
				expires: new Date(Date.now() + 10),
			});

			//Hiding the password
			result[0].password = undefined;

			//Setting up req.user
			req.user = result[0];

			return res.status(200).json({
				token: token,
				user: result[0],
			});
		});
	});
};

//Logout
exports.logout = (req, res) => {
	//clearing the existing cookie's
	res.clearCookie("token");

	res.status(200).json({
		message: "Sign Out Successfully",
	});
};

//Based on the token user_id (passed value in the login) is stored in req.auth
exports.isSignedIn = expressJWT({
	secret: process.env.PRIVATE_KEY,
	algorithms: ["HS256"],
	userProperty: "auth",
});

//Authentication route
exports.isAuthenticated = (req, res, next) => {
	let check = req.auth && req.user && req.auth._id == req.user._id;
	if (!check) {
		return res.status(400).json({
			error: "Unauthorized Access",
		});
	}
	next();
};

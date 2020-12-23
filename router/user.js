const express = require("express");
const {getUserDetails, getUserById} = require("../controller/user");
const router = express.Router();

//custom middleware getUserById when userId params is invoked.
router.param("userId", getUserById);

//Route => Getting user Information by userId
router.get("/userInfo/:userId", getUserDetails);

module.exports = router;

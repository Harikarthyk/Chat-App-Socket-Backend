//Import Dependencies
const express = require("express");
const {registerUser, login, logout} = require("../controller/auth");

const router = express.Router();

//Route => Creating new user
router.post("/register", registerUser);

//Route => Logging in
router.post("/login", login);

//Route => Log out
router.get("/logout", logout);

module.exports = router;

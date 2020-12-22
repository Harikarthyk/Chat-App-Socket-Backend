//Import Modules
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

//Database connection
mongoose
	.connect("", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.then(() => console.log(`DB Connection Enabled`))
	.catch(() => console.log(`Error in DB Connection`));

//Middlewares

const PORT = "5050";

app.get("/", (req, res) => {
	res.send("Checking route");
});

app.listen(PORT, () => console.log(`Server is running at at ${PORT}`));

//Import Modules
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();

//Import customRoutes and Middleware
const authRoute = require("./router/auth");
const userRoute = require("./router/user");

//Database connection
mongoose
	.connect(process.env.DATABASE, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.then(() => console.log(`DB Connection Enabled`))
	.catch((error) => console.log(`Error in DB Connection Error : ${error}`));

//Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || "5050";

app.get("/", (req, res) => {
	res.send("Checking route");
});

app.use("/api", authRoute);
app.use("/api", userRoute);

const server = app.listen(PORT, () =>
	console.log(`Server is running at at ${PORT}`),
);

const io = require("socket.io")(server);

io.use((socket, next) => {
	next();
});

io.on("connection", (socket) => {
	console.log("new user connected");

	socket.on("disconnect", () => {
		console.log("user left");
	});
});

//Import Modules
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const cookieParser = require("cookie-parser");

const app = express();
let arr = new Map();

//Import customRoutes and Middleware
const authRoute = require("./router/auth");
const userRoute = require("./router/user");
const chatRoomRoute = require("./router/chatroom");

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
app.use("/api", chatRoomRoute);

const server = app.listen(PORT, () =>
	console.log(`Server is running at at ${PORT}`),
);

const socket = require("socket.io");

const io = socket(server, {
	cors: true,
	origins: ["http://127.0.0.1:5347"],
});

io.use((socket, next) => {
	socket.userId = socket.handshake.query.userId;
	socket.userName = socket.handshake.query.userName;

	socket.color = socket.handshake.query.color;
	next();
});
io.on("connection", (socket) => {
	console.log("Connected user : ", socket.userId);
	socket.on("join_room", (data) => {
		if (arr.size == 0 || !arr.has(data)) {
			socket.emit("error_m	essage", {error: "No Discord found"});
			return;
		}
		socket.join(data);
		socket.emit("error_message", {data: arr.get(data)});
		socket.broadcast
			.to(data)
			.emit("in_user", `new user ${socket.userName} Joinned 👋🏼👋🏼`);
		console.log("User Joined Room: " + data);
	});

	socket.on("create_room", (data) => {
		socket.join(data.roomId);
		arr.set(data.roomId, data.roomName);
		console.log("New room created " + data);
	});

	socket.on("send_message", (data) => {
		data.content.color = socket.color;
		socket.broadcast.to(data.chatroom).emit("receive_message", data.content);
	});

	socket.on("disconnect", () => {
		console.log("USER DISCONNECTED");
	});
});

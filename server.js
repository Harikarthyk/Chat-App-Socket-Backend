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

	next();
});
io.on("connection", (socket) => {
	console.log("Connected user : ", socket.userId);

	socket.on("join_room", (data) => {
		socket.join(data);
		console.log("User Joined Room: " + data);
	});

	socket.on("send_message", (data) => {
		socket.broadcast.to(data.chatroom).emit("receive_message", data.content);
	});

	console.log(socket.adapter.rooms);

	socket.on("disconnect", () => {
		console.log("USER DISCONNECTED");
	});
});

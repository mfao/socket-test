const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Run when a client connects
// Emit only to the current user
// > socket.emit()
// Emit to everybody except the current user
// > socket.broadcast.emit();
// Emit to everybody
// > io.emit();
io.on("connection", socket => {
	// Welcome current user
	socket.emit("info", "Welcome to Chatbox");

	// Emit to everybody except the current user
	socket.broadcast.emit("info", "A User has joined the chat");

	// Listen for chatMessage
	socket.on("chatMessage", ({ message }) => {
		io.emit("message", message);
	});

	// User leaves
	socket.on("disconnect", () => {
		console.log("User left");
	});
});

app.use(router);

const PORT = 5000 || process.env.PORT;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
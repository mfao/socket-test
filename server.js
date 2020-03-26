const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Run when a client connects
io.on("connection", socket => {
	console.log("New Websocket connection");
	socket.emit("message", "Hello World");
});

const PORT = 5000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
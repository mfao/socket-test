import React from "react";
import io from "socket.io-client";
import "./App.css";
import "bulma/css/bulma.css";

import Chatbox from "./components/Chatbox";

function App() {
	const socket = io(":5000");
	socket.on("connect", () => {
		console.log("Socket connected");
	});

	return (
		<div className="App">
			<Chatbox socket={socket}></Chatbox>
		</div>
	);
}

export default App;
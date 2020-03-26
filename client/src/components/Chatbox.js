import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const Chatbox = () => {
	const [message, setMessage] = useState("");

	useEffect(() => {
		const socket = io("http://localhost:5000");
		socket.on("connect", () => {
			console.log("CONNECTED");
		});
		socket.on("message", data => {
			console.log("MESSAGE FROM SOCKET: " + message);
			setMessage(data);
		});
	});

	return (
		<div style={{ textAlign: "center" }}>
			{message ? <p>The Data is: {message}</p> : <p>Loading..</p>}
		</div>
	);
};

export default Chatbox;
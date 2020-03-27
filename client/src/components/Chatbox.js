import React, { useState, useEffect } from "react";

const Chatbox = ({ socket }) => {
	const [info, setInfo] = useState("Loading...");
	const [roomName, setRoomName] = useState("Lobby");
	const [chat, setChat] = useState([]);
	const [message, setMessage] = useState("");

	// SOCKET Room Title
	useEffect(() => {
		socket.on("info", msg => {
			setInfo(msg);
		});
	}, [socket, info]);

	// SOCKET Chat messages
	useEffect(() => {
		socket.on("message", msg => {
			setChat([...chat, msg]);
		});
	}, [socket, chat]);

	// SOCKET Sending messages
	const sendMessage = e => {
		e.preventDefault();
		socket.emit("chatMessage", { message: message });
		setMessage("");
	};

	return (
		<div
			className="container"
			style={{
				backgroundColor: "#b5b825",
				padding: "25px",
				marginTop: "10vh",
				borderRadius: "8px"
			}}>
			<div className="columns is-mobile" style={{ height: "80vh" }}>
				<div
					className="column is-3 is-primary"
					style={{
						backgroundColor: "#dbde35",
						textAlign: "left",
						borderTopLeftRadius: "8px",
						borderBottomLeftRadius: "8px"
					}}>
					<p className="is-size-5">Room Name</p>
					<p style={{ padding: "6px", backgroundColor: "#c9cc29" }}>
						{roomName}
					</p>
					<br />
					<p className="is-size-5">Users online</p>
				</div>
				<div
					className="column is-9"
					style={{
						backgroundColor: "#ffffff",
						padding: "0px"
					}}>
					<div
						style={{
							height: "calc(100% - 30px)",
							backgroundColor: "#EFEFEF"
						}}>
						<p style={{ padding: "4px" }}>{info}</p>
						<div
							style={{
								textAlign: "left",
								padding: "8px",
								marginTop: "3px",
								borderTop: "1px solid #aaaaaa"
							}}>
							{chat.map((message, index) => {
								return <p key={index}>{message}</p>;
							})}
						</div>
					</div>
					<form onSubmit={sendMessage}>
						<input
							type="text"
							placeholder="Enter your message"
							style={{
								height: "30px",
								width: "calc(100% - 100px)",
								float: "left"
							}}
							value={message}
							onChange={e => setMessage(e.target.value)}
							minLength="1"
							required></input>
						<button
							type="submit"
							value="Submit"
							className="button button-small is-success"
							style={{
								borderRadius: "0px",
								height: "30px",
								width: "100px"
							}}>
							Send
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Chatbox;
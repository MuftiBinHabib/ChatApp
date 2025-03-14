import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import "./styles.css"; // Import CSS file

// Update the socket connection to your local network IP address
const socket = io("http://192.168.68.103:8080"); // Use your local machine's IP address

export default function ChatApp() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null);

  useEffect(() => {
    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (message.trim() !== "") {
      socket.emit("message", message);
      setMessage("");
    }
  };

  return (
    <div className="chat-container">
      {/* Chat Messages */}
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.id === socket.id ? "sent" : "received"}`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input Box */}
      <div className="input-container">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

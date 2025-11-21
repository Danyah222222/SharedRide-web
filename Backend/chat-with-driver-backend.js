const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Simple AI-like responses for the driver
function getSmartReply(text) {
  text = text.toLowerCase();

  if (text.includes("hello") || text.includes("hi")) {
    return "Hello! How can I help you?";
  }

  if (text.includes("where are you") || text.includes("location") || text.includes("you close")) {
    return "I'm on my way, about 2 minutes away!";
  }

  if (text.includes("are you here") || text.includes("arrived")) {
    return "Yes, I just arrived. I'm outside!";
  }

  if (text.includes("wait") || text.includes("one minute") || text.includes("hold on")) {
    return "No problem, take your time!";
  }

  if (text.includes("thank")) {
    return "You're welcome!";
  }

  return "Got it! 👍"; // default reply
}

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("send_message", (msg) => {
    console.log("Received:", msg.text);

    // Reply based on message
    const reply = getSmartReply(msg.text);

    // Send reply to frontend
    setTimeout(() => {
      socket.emit("receive_message", {
        text: reply,
        sender: "driver",
        time: new Date().toISOString(),
      });
    }, 800); // small delay to feel real
  });
});

server.listen(3000, () => {
  console.log("Chat backend is running on port 3000");
});
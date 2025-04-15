import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
const app = express();
import { Server as SocketIO } from "socket.io";
const server = http.createServer(app);
const io = new SocketIO(server);
dotenv.config({
  path: "./.env",
});
app.use(cors());
app.use(express.json());

app.get(`/`, (req, res) => {
  res.send("imran");
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some(user => user.userId === userId) &&
    users.push({ userId, socketId });
};

// -RemvoeUser-
const removeUser = userId => {
  users = users.filter(user => user.userId !== userId);
};
// -getUser-
const getUser = userId => {
  return users.find(user => user.userId == userId);
};
// create-Message
const createMessage = ({ senderId, receiverId, text, images }) => ({
  senderId,
  receiverId,
  text,
  images,
  seen: false,
});

// user-Connection
io.on("connection", socket => {
  console.log(`user is connect ${socket.id}`);
  socket.on("addUser", userId => {
    addUser(userId, socket.id);
    io.emit("getUser", users);
  });
  // ---Message---
  const messages = {};
  socket.on("sendMessage", ({ senderId, receiverId, text, images }) => {
    const message = createMessage({
      senderId,
      receiverId,
      text,
      images,
    });

    const user = getUser(receiverId);

    if (!messages[receiverId]) {
      messages[receiverId] = [message];
    } else {
      messages[receiverId].push(message);
    }

    io.to(user?.socketId).emit("getMessage", message);
  });
  // message-Seen
  socket.on("messageSeen", ({ senderId, receiverId, messageId }) => {
    const user = getUser(senderId);
    if (messages[senderId]) {
      const message = messages[senderId].find(
        message => message.receiverId === receiverId && message.id === messageId
      );
      if (message) {
        message.seen = true;

        // send a message seen event to the sender
        io.to(user?.socketId).emit("messageSeen", {
          senderId,
          receiverId,
          messageId,
        });
      }
    }
  });
  socket.on("updateLastMessage", ({ lastMessage, lastMessagesId }) => {
    io.emit("getLastMessage", {
      lastMessage,
      lastMessagesId,
    });
  });
  socket.on("disconnect", () => {
    console.log(`a user disconnected! ${socket.id}`);
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
const PORT = process.env.PORT || 5500;
server.listen(PORT, (req, res, next) => {
  console.log(`Server Is Running on ${PORT}`);
});

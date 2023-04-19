import express, { Express } from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

interface user{
    userId ?: string;
    socketId ?: string;
}

interface messageSendUser{
    senderId : string;
    text : string;
}

const PORT: number = 8800;
const app: Express = express();

app.use(cors());

const server: http.Server = http.createServer(app);

let users : Array<user> = [];

interface ServerToClientEvents {
  getMessage : (res : messageSendUser) => void
}

interface ClientToServerEvents {
  addUser : (userId : string) => void;
  sendMessage : (senderId : string, receiverId : string|number|undefined, text : string) => void
  disconnect : () => void
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  name: string;
  age: number;
}

const addUser = (userId : string, socketId : string) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId : string) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId : string) => {
  return users.find((user) => user.userId === userId);
};

const io: Server = new Server<
  ServerToClientEvents,
  ClientToServerEvents,
  InterServerEvents,
  SocketData
>(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected.");

  socket.on("addUser", (userId : string) => {
    addUser(userId, socket.id);
  });

  socket.on("sendMessage", (senderId : string,receiverId : string,text : string) => {  
    const user = getUser(receiverId);

    if(user?.socketId === undefined){
        console.log("SocketId Undefined");
        return;
    }

    io.to(user?.socketId).emit("getMessage", {
        senderId,
        text,
      });
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Sockets Functioning on Port ${PORT}`);
});

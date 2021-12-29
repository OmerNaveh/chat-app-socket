import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import socket from "./socket";
const port = process.env.PORT || 4000;
const app = express();
app.use(cors());
const httpServer = createServer(app);
const io = new Server(httpServer);

httpServer.listen(port, () => {
  console.log(`running on ${port}`);
  socket({ io });
});

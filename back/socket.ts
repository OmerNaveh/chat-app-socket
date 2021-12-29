import { Server, Socket } from "socket.io";

export default function socket({ io }: { io: Server }) {
  io.on("connection", (socket: Socket) => {
    console.log(`connected successfully ${socket.id}`);

    io.emit("announce", `${0} has joined the chat`);

    socket.on("message", ({ name, message }) => {
      io.emit("messageBack", { name, message });
    });

    socket.on("disconnect", () => {
      io.emit("announce", `${0} has left the chat`);
    });
  });
}

import { Server, Socket } from "socket.io";

export default function socket({ io }: { io: Server }) {
  io.on("connection", (socket: Socket) => {
    let user: string;
    console.log(`connected successfully ${socket.id}`);

    socket.on("join", (name: string) => {
      io.emit("announce", `${name} has joined the chat`);
      user = name;
    });

    socket.on("message", ({ name, message }) => {
      io.emit("messageBack", { name, message });
    });

    socket.on("disconnect", () => {
      console.log(`${user} disconnected`);
      io.emit("announce", `${user} has left the chat`);
    });
  });
}

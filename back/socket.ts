import { Server, Socket } from "socket.io";

const participents: string[] = [];
export default function socket({ io }: { io: Server }) {
  io.on("connection", (socket: Socket) => {
    let user: string;
    console.log(`connected successfully ${socket.id}`);

    socket.on("join", (name: string) => {
      io.emit("announce", `${name} has joined the chat`);
      participents.push(name);
      io.emit("participents", participents);
      user = name;
    });

    socket.on("message", ({ name, message, mdirect }) => {
      mdirect
        ? io.emit("messageBackPrivate", { name, message, mdirect })
        : io.emit("messageBack", { name, message });
    });
    socket.on("unjoin", () => {
      console.log(`${user} logged out`);
      io.emit("announce", `${user} has left the chat`);
      participents.splice(participents.indexOf(user), 1);
      io.emit("participents", participents);
      console.log(user, participents);
    });
    socket.on("typing", () => {
      io.emit("announceTyping", user);
    });

    socket.on("disconnect", () => {
      console.log(`${user} disconnected`);
      if (participents.indexOf(user) !== -1) {
        io.emit("announce", `${user} has left the chat`);
        participents.splice(participents.indexOf(user), 1);
      }
      io.emit("participents", participents);
      console.log(user, participents);
    });
  });
}

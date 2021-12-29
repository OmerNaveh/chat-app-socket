import React, { useEffect, useContext, useRef, useState } from "react";
import { context } from "../App";
import { io } from "socket.io-client";
export default function Chat() {
  const [chat, setChat] = useState<solveTypes.chatState[]>([]);
  const { user } = useContext(context);
  const inputMsg = useRef<HTMLInputElement>(null);
  const sockerRef = useRef<any>();
  useEffect(() => {
    sockerRef.current = io("http://localhost:4000");
    sockerRef.current.emit("join", user);
    sockerRef.current.on(
      "messageBack",
      ({ name, message }: solveTypes.chatState) => {
        setChat((prevState: solveTypes.chatState[]) => {
          return [...prevState, { name, message }];
        });
      }
    );
    sockerRef.current.on("announce", (msg: string) => {
      setChat((prevState: solveTypes.chatState[]) => {
        return [...prevState, { name: "server", message: msg }];
      });
    });
  }, []);

  const renderChat = () => {
    return chat.map(({ name, message }) => (
      <p>
        {name}: {message}
      </p>
    ));
  };
  const sendMsg = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = inputMsg.current?.value;
    sockerRef.current.emit("message", { name: user, message });
  };
  return (
    <div className="chat">
      <div>{renderChat()}</div>
      <form onSubmit={sendMsg}>
        <input ref={inputMsg} placeholder="msg"></input>
        <button type="submit">send</button>
      </form>
    </div>
  );
}

import React, { useContext, useRef } from "react";
import { chatContext } from "./Chat";
import { context } from "../App";

export default function ChatInput() {
  const { sockerRef } = useContext(chatContext);
  const { user } = useContext(context);
  const inputMsg = useRef<HTMLInputElement>(null);
  const sendMsg = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputMsg.current) return;
    const message = inputMsg.current?.value;
    if (!sockerRef) return;
    sockerRef.current.emit("message", { name: user, message });
    inputMsg.current.value = "";
  };

  return (
    <form onSubmit={sendMsg}>
      <input autoFocus ref={inputMsg} placeholder="msg"></input>
      <button type="submit">send</button>
    </form>
  );
}

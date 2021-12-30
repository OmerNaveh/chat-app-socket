import React, { useContext, useRef } from "react";
import { chatContext } from "./Chat";
import { context } from "../App";

export default function ChatInput() {
  const { sockerRef, direct, setDirect } = useContext(chatContext);
  const { user } = useContext(context);
  const inputMsg = useRef<HTMLInputElement>(null);
  const sendMsg = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputMsg.current) return;
    const message = inputMsg.current?.value;
    if (!sockerRef) return;
    sockerRef.current.emit("message", { name: user, message, mdirect: direct });
    inputMsg.current.value = "";
  };
  const resetDirect = () => {
    if (!setDirect) return;
    setDirect("");
  };
  if (!direct)
    return (
      <form onSubmit={sendMsg}>
        <input autoFocus ref={inputMsg} placeholder="msg"></input>
        <button type="submit">send</button>
      </form>
    );
  else
    return (
      <form onSubmit={sendMsg}>
        <input
          autoFocus
          ref={inputMsg}
          placeholder={`private to ${direct}`}
        ></input>
        <button type="submit">send</button>
        <button
          type="button"
          onClick={() => {
            resetDirect();
          }}
        >
          x
        </button>
      </form>
    );
}

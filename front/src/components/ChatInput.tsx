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
  const typing = () => {
    if (!sockerRef) return;
    sockerRef.current.emit("typing");
  };
  if (!direct)
    return (
      <form onSubmit={sendMsg} className="chatInput">
        <input
          autoFocus
          ref={inputMsg}
          onChange={() => {
            typing();
          }}
          placeholder="Text Message"
          className="inputMsg"
        ></input>
        <button type="submit" className="sendMsg">
          <i className="fas fa-arrow-circle-right"></i>
        </button>
      </form>
    );
  else
    return (
      <form onSubmit={sendMsg} className="chatInput">
        <input
          autoFocus
          ref={inputMsg}
          className="inputMsg"
          placeholder={`private to ${direct}`}
        ></input>
        <button type="submit" className="sendMsg">
          <i className="fas fa-arrow-circle-right"></i>
        </button>
        <button
          className="noDirectBtn"
          type="button"
          onClick={() => {
            resetDirect();
          }}
        >
          <i className="fas fa-times-circle"></i>
        </button>
      </form>
    );
}

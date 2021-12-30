import React, { useContext } from "react";
import { nanoid } from "nanoid";
import { chatContext } from "./Chat";
import { context } from "../App";
export default function ChatLog() {
  const { chat } = useContext(chatContext);
  const { user } = useContext(context);
  const renderChat = () => {
    if (!chat) return <div></div>;
    return chat.map(({ name, message, mdirect }) => {
      const messageSender =
        name === "server" ? "server" : name === user ? "me" : "others";
      return !mdirect ? (
        <div key={nanoid()} className={messageSender}>
          {name !== "server" ? <p>{name}</p> : ""}
          <p>{message}</p>
        </div>
      ) : (
        <div key={nanoid()} className={messageSender}>
          {name + " (private)"}
          <p>{message}</p>
        </div>
      );
    });
  };
  return <div className="chatLog">{renderChat()}</div>;
}

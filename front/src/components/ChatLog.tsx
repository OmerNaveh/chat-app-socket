import React, { useContext } from "react";
import { nanoid } from "nanoid";
import { chatContext } from "./Chat";
export default function ChatLog() {
  const { chat } = useContext(chatContext);
  const renderChat = () => {
    if (!chat) return <div></div>;
    return chat.map(({ name, message, mdirect }) =>
      !mdirect ? (
        <p key={nanoid()}>
          {name}: {message}
        </p>
      ) : (
        <p key={nanoid()}>
          (private message) {name}: {message}
        </p>
      )
    );
  };
  return <div>{renderChat()}</div>;
}

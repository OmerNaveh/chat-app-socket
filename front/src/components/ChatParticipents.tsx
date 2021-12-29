import React, { useContext } from "react";
import { chatContext } from "./Chat";
import { nanoid } from "nanoid";

export default function ChatParticipents() {
  const { participents } = useContext(chatContext);
  console.log(participents);
  const counter = participents?.length;

  const showParticipents = () => {
    if (!participents) return <div></div>;
    return participents.map((user) => {
      return <p key={nanoid()}>{user}</p>;
    });
  };
  return (
    <div>
      <p>{counter}</p>
      {showParticipents()}
    </div>
  );
}

import React, { useContext } from "react";
import { chatContext } from "./Chat";
import { nanoid } from "nanoid";

export default function ChatParticipents() {
  const { participents, setDirect } = useContext(chatContext);
  const counter = participents?.length;

  const showParticipents = () => {
    if (!participents) return <div></div>;
    return participents.map((user) => {
      return (
        <p
          key={nanoid()}
          onClick={() => {
            privateDM(user);
          }}
        >
          {user}
        </p>
      );
    });
  };
  const privateDM = (user: string) => {
    if (!setDirect) return;
    setDirect(user);
  };
  return (
    <div className="chatParticipents">
      <p>{counter}</p>
      {showParticipents()}
    </div>
  );
}

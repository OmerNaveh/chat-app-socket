import React, { useContext } from "react";
import { context } from "../App";
import { chatContext } from "./Chat";
export default function ChatHeader() {
  const { setLogged } = useContext(context);
  const { sockerRef } = useContext(chatContext);
  const logOut = () => {
    if (!setLogged) return;
    setLogged(false);
    sockerRef?.current.emit("unjoin");
  };
  return (
    <div className="chatHeader">
      <button
        className="logoutBtn"
        onClick={() => {
          logOut();
        }}
      >
        LogOut
      </button>
      <h1>ChatRoom</h1>
    </div>
  );
}

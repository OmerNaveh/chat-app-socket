import React, {
  useEffect,
  useContext,
  useRef,
  useState,
  createContext,
} from "react";
import { context } from "../App";
import { io } from "socket.io-client";
import ChatLog from "./ChatLog";
import ChatInput from "./ChatInput";
export const chatContext = createContext<Partial<solveTypes.chatContext>>({});

export default function Chat() {
  const [chat, setChat] = useState<solveTypes.chatState[]>([]);
  const { user } = useContext(context);
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

  return (
    <chatContext.Provider value={{ chat, setChat, sockerRef }}>
      <div className="chat">
        <ChatLog />
        <ChatInput />
      </div>
    </chatContext.Provider>
  );
}

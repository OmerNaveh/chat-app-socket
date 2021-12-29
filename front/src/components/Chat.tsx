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
import ChatParticipents from "./ChatParticipents";
export const chatContext = createContext<Partial<solveTypes.chatContext>>({});

export default function Chat() {
  const [chat, setChat] = useState<solveTypes.chatState[]>([]);
  const [participents, setParticipents] = useState<solveTypes.participents>([]);
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
    sockerRef.current.on(
      "participents",
      (partiArr: solveTypes.participents) => {
        setParticipents([...partiArr]);
      }
    );
  }, []);

  return (
    <chatContext.Provider value={{ chat, setChat, sockerRef, participents }}>
      <div className="chat">
        <ChatLog />
        <ChatInput />
        <ChatParticipents />
      </div>
    </chatContext.Provider>
  );
}

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
import ChatHeader from "./ChatHeader";
export const chatContext = createContext<Partial<solveTypes.chatContext>>({});

export default function Chat() {
  const [chat, setChat] = useState<solveTypes.chatState[]>([]);
  const [participents, setParticipents] = useState<solveTypes.participents>([]);
  const [direct, setDirect] = useState<string>("");
  const [typing, setTyping] = useState<string>("");
  const { user } = useContext(context);
  const sockerRef = useRef<any>();
  const scroll = () => {
    const div = document.querySelector(".chatLog");
    if (!div) return;
    div.scroll({ top: div.scrollHeight, behavior: "smooth" }); //auto scroll
  };
  useEffect(() => {
    sockerRef.current = io("http://localhost:4000");
    sockerRef.current.emit("join", user);
    sockerRef.current.on(
      "messageBack",
      ({ name, message }: solveTypes.chatState) => {
        setChat((prevState: solveTypes.chatState[]) => {
          return [...prevState, { name, message }];
        });
        scroll(); //autoscroll
      }
    );
    sockerRef.current.on(
      "messageBackPrivate",
      ({ name, message, mdirect }: solveTypes.chatState) => {
        if (mdirect && (user === name || user === mdirect)) {
          //private messages only showing on sender and reciever side
          setChat((prevState: solveTypes.chatState[]) => {
            return [...prevState, { name, message, mdirect }];
          });
          scroll(); //autoscroll
        }
      }
    );
    sockerRef.current.on("announce", (msg: string) => {
      setChat((prevState: solveTypes.chatState[]) => {
        return [...prevState, { name: "server", message: msg }];
      });
      scroll();
    });
    sockerRef.current.on(
      "participents",
      (partiArr: solveTypes.participents) => {
        setParticipents([...partiArr]);
      }
    );
    sockerRef.current.on("announceTyping", async (userName: string) => {
      if (userName !== user) {
        setTyping(`${userName} is typing...`);
        console.log("typing");
        await setTimeout(() => {
          setTyping("");
        }, 3000); // remove typing msg after 3s if the user stopped typing- if hes still typing the function will run every onchange
      }
    });
  }, []);

  return (
    <chatContext.Provider
      value={{
        chat,
        setChat,
        sockerRef,
        participents,
        direct,
        setDirect,
        typing,
      }}
    >
      <div className="chat">
        <ChatHeader />
        <ChatLog />
        <ChatInput />
        <ChatParticipents />
      </div>
    </chatContext.Provider>
  );
}

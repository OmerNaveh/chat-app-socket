declare namespace solveTypes {
  type chatState = { name: string; message: string };
  interface context {
    user: string;
    setUser: React.Dispatch<React.SetStateAction<string>>;
    setLogged: React.Dispatch<React.SetStateAction<boolean>>;
  }
  interface chatContext {
    chat: chatState[];
    setChat: React.Dispatch<React.SetStateAction<chatState[]>>;
    sockerRef: React.MutableRefObject<any>;
  }
}

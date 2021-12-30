declare namespace solveTypes {
  type chatState = { name: string; message: string; mdirect?: string };
  interface context {
    user: string;
    setUser: React.Dispatch<React.SetStateAction<string>>;
    setLogged: React.Dispatch<React.SetStateAction<boolean>>;
  }
  type participents = string[];
  interface chatContext {
    chat: chatState[];
    setChat: React.Dispatch<React.SetStateAction<chatState[]>>;
    sockerRef: React.MutableRefObject<any>;
    participents: participents;
    direct: string;
    setDirect: React.Dispatch<React.SetStateAction<string>>;
  }
}

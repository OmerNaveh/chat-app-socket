declare namespace solveTypes {
  type chatState = { name: string; message: string };
  interface context {
    user: string;
    setUser: React.Dispatch<React.SetStateAction<string>>;
    setLogged: React.Dispatch<React.SetStateAction<boolean>>;
  }
}

import React, { createContext, useState } from "react";
import Chat from "./components/Chat";
import Login from "./components/Login";

export const context = createContext<Partial<solveTypes.context>>({});

function App() {
  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState<string>("default");

  return (
    <context.Provider value={{ setLogged, user, setUser }}>
      {!logged ? <Login /> : <Chat />}
    </context.Provider>
  );
}

export default App;

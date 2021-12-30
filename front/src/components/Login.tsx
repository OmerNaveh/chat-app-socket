import React, { useContext, useRef } from "react";
import { context } from "../App";

export default function Login() {
  const { setLogged, setUser } = useContext(context);
  const nameInput = useRef<HTMLInputElement>(null);
  const log = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!nameInput.current) return;
    const name = nameInput.current.value;
    if (!setUser || !setLogged || !name) return;
    setUser(name);
    setLogged(true);
  };
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={log}>
        <input ref={nameInput} placeholder="Name"></input>
        <button type="submit">Enter</button>
      </form>
    </div>
  );
}

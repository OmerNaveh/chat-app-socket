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
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={log}>
        <input
          className="loginInput"
          ref={nameInput}
          placeholder="Name"
        ></input>
        <button className="loginBtn" type="submit">
          Enter
        </button>
      </form>
    </div>
  );
}

import { useState } from "react";
import { api } from "./api";
import React from "react";


export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [accessToken, setAccessToken] = useState(null);
  const [log, setLog] = useState("");

  const logResult = (title, result) => {
    setLog(`${title}\n${JSON.stringify(result, null, 2)}`);
  };

  async function register() {
    const res = await api("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password, name }),
    });
    logResult("REGISTER", res);
  }

  async function login() {
    const res = await api("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) setAccessToken(res.data.accessToken);
    logResult("LOGIN", res);
  }

  async function me() {
    const res = await api("/user/me", {
      token: accessToken,
    });
    logResult("ME", res);
  }

  async function refresh() {
    const res = await api("/auth/refresh", {
      method: "POST",
    });

    if (res.ok) setAccessToken(res.data.accessToken);
    logResult("REFRESH", res);
  }

  async function logout() {
    const res = await api("/auth/logout", {
      method: "POST",
    });
    setAccessToken(null);
    logResult("LOGOUT", res);
  }

  async function logoutAll() {
    const res = await api("/auth/logout-all", {
      method: "POST",
      token: accessToken,
    });
    setAccessToken(null);
    logResult("LOGOUT ALL DEVICES", res);
  }

  return (
    <div style={{ padding: 20, fontFamily: "monospace" }}>
      <h2>Auth Test Client</h2>

      <input placeholder="email" onChange={e => setEmail(e.target.value)} />
      <br />
      <input placeholder="password" type="password" onChange={e => setPassword(e.target.value)} />
      <br />
      <input placeholder="name" onChange={e => setName(e.target.value)} />
      <br /><br />

      <button onClick={register}>Register</button>{" "}
      <button onClick={login}>Login</button>{" "}
      <button onClick={me}>/user/me</button>{" "}
      <button onClick={refresh}>Refresh</button>{" "}
      <button onClick={logout}>Logout</button>{" "}
      <button onClick={logoutAll}>Logout All</button>

      <pre style={{ marginTop: 20, background: "#111", color: "#0f0", padding: 10 }}>
        {log}
      </pre>
    </div>
  );
}

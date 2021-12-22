import "./App.css";
import React, { useState } from "react";

var sha256 = require("js-sha256");

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hash, setHash] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (username === "" || password === "") {
      return false;
    }

    setHash(sha256.sha256(password));
    console.log(`username: ${username} password:${password}`);
  };

  return (
    <div className="App">
      <form className="form" onSubmit={onSubmit}>
        <div className="input-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Username..."
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password..."
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="primary">LOGIN</button>
      </form>
    </div>
  );
}

export default App;

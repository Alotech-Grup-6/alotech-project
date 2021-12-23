import "./App.css";
import React, { useState } from "react";

//var sha256 = require("js-sha256");

function App() {
  
  const [inputs, setInputs] = useState("");
  const [option, setOption] = useState("Admin");
  
  //const [hash, setHash] = useState("");

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const onSubmit = (event) => {
    event.preventDefault();

  };

  const onChange = (event) => {
    setOption(event.target.value)
  }

  return (
    <div className="App">
      <h1><strong>Add User</strong></h1>
      <form className="form" onSubmit={onSubmit}>
        <div className="input-group">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={inputs.username || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group-name">
          <input
            type="text"
            name="user_name"
            placeholder="First Name"
            value={inputs.user_name || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group-surname">
          <input
            type="text"
            name="user_surname"
            placeholder="Last Name"
            value={inputs.user_surname || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group-email">
          <input
            type="text"
            name="user_email"
            placeholder="Email"
            value={inputs.user_email || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group-pass">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={inputs.password || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group-pass">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={inputs.password|| ""}
            onChange={handleChange}
            required
          />
        </div>
        <br/>
        <select value={option} className="option" name="type" onChange={onChange}>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        <br />
        <div>
          <button className="button">ADD</button>
        </div>
      </form>
    </div>
  );
}

export default App;

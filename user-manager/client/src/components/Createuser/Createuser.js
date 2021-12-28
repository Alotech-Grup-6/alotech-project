import "./Createuser.css";

export default function Createuser({
  createUser,
  rod,
  rodHandle,
  inputs,
  setInputs,
  option,
  setOption,
}) {
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const onSubmit = (event) => {
    createUser();
  };

  const onChange = (event) => {
    setOption(event.target.value);
  };

  return (
    <div className="App">
      <h1>
        <strong>Create User</strong>
      </h1>
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
            type="email"
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

        <br />
        <select
          value={option}
          className="option"
          name="type"
          onChange={onChange}
        >
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

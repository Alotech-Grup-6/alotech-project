import React, { useState } from "react";
import DeleteUser from "./DeleteUser/DeleteUser.js";
import "./AdminPage.css";
import UpdateUser from "./Updateuser/Updateuser";

function AdminPage({ users, delUser,inputs,setInputs,option,setOption ,updateUser}) {
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [updatePopUp, setUpdatePopUp] = useState(false);


  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const onSubmit = (event) => {
  };

  const onChange = (event) => {
    setOption(event.target.value);
  };

  const handledel = async (user) => {
    await delUser(user.user_id);
    setDeletePopUp(false);
  };

  const handleUpdate=async(user)=>{
    await updateUser(user.user_id)
    setUpdatePopUp(false)
  }

  return (
    <div>
      <div>
        <h1 className="title">Welcome to Admin Page</h1>
      </div>

      <div className="cards">
        {users.map((user) => (
          <div key={user.user_id} className="card">
            <div className="card-body">
              <div className="photo">
                <img src="/images/avatar.png" className="card-img" alt="" />
              </div>
-
              <h1>{user.username}</h1>
              <p>{`${user.user_name} ${user.user_surname}`}</p>
              <p>{user.user_email} </p> 
              <div className="buttons">
                <button
                  className="bn632-hover bn24"
                  onClick={() => setDeletePopUp(true)}
                >
                  Delete
                </button>
                <DeleteUser trigger={deletePopUp} setTrigger={setDeletePopUp}>
                  <h1>Are You Sure</h1>
                  <p>that you want to permanently delete user?</p>
                  <button
                    className="bn632-hover bn24"
                    onClick={() => handledel(user)}
                  >
                    Yes
                  </button>
                </DeleteUser>
                <button
                  className="bn632-hover bn24"
                  onClick={() =>{setUpdatePopUp(true); setInputs(user)}}
                >
                  Update
                </button>
                
              </div>
            </div>
          </div>
        ))}
        <UpdateUser  trigger={updatePopUp} setTrigger={setUpdatePopUp}>
                  <h1>
                    <strong>Update User</strong>
                  </h1>
                  <br />
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
                    <br />
                    <br />
                    <div>
                      <button className="bn632-hover bn24" onClick={()=>{handleUpdate(inputs)}}>Update</button>
                    </div>
                  </form>
                </UpdateUser>
      </div>
    </div>
  );
}

export default AdminPage;

import React, { useState } from 'react';
import DeleteUser from './DeleteUser/DeleteUser.js';
import './AdminPage.css';
import UpdateUser from './UpdateUser/UpdateUser.js';

function AdminPage() {
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [updatePopUp, setUpdatePopUp] = useState(false);

  const [inputs, setInputs] = useState('');
  const [option, setOption] = useState('');

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
  };

  const onChange = (event) => {
    setOption(event.target.value);
  };

  return (
    <div>
      <div>
        <h1 className='title'>Welcome to Admin Page</h1>
      </div>
      <div className='create-user'>
        <button className='bn3637 bn37'>
          <img src='/images/create.png' className='create-img' alt='' />
          Create User
        </button>
      </div>
      <div className='cards'>
        <div className='card'>
          <div className='card-body'>
            <div className='photo'>
              <img src='/images/avatar.png' className='card-img' alt='' />
            </div>
            <h1>Ad Soyad</h1>
            <p>user_email</p>
            <p>user_type</p>
            <div className='buttons'>
              <button
                className='bn632-hover bn24'
                onClick={() => setDeletePopUp(true)}
              >
                Delete
              </button>
              <DeleteUser trigger={deletePopUp} setTrigger={setDeletePopUp}>
                <h1>Are You Sure</h1>
                <p>that you want to permanently delete user?</p>
                <button
                  className='bn632-hover bn24'
                  onClick={() => console.log('selam')}
                >
                  Yes
                </button>
              </DeleteUser>
              <button
                className='bn632-hover bn24'
                onClick={() => setUpdatePopUp(true)}
              >
                Update
              </button>
              <UpdateUser trigger={updatePopUp} setTrigger={setUpdatePopUp}>
                <h1>
                  <strong>Update User</strong>
                </h1>
                <br />
                <form className='form' onSubmit={onSubmit}>
                  <div className='input-group'>
                    <input
                      type='text'
                      name='username'
                      placeholder='Username'
                      value={inputs.username || ''}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className='input-group-name'>
                    <input
                      type='text'
                      name='user_name'
                      placeholder='First Name'
                      value={inputs.user_name || ''}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className='input-group-surname'>
                    <input
                      type='text'
                      name='user_surname'
                      placeholder='Last Name'
                      value={inputs.user_surname || ''}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className='input-group-email'>
                    <input
                      type='text'
                      name='user_email'
                      placeholder='Email'
                      value={inputs.user_email || ''}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className='input-group-pass'>
                    <input
                      type='password'
                      name='password'
                      placeholder='Password'
                      value={inputs.password || ''}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <br />
                  <select
                    value={option}
                    className='option'
                    name='type'
                    onChange={onChange}
                  >
                    <option value='admin'>Admin</option>
                    <option value='user'>User</option>
                  </select>
                  <br />
                  <br />
                  <br />
                  <div>
                    <button className='bn632-hover bn24'>Update</button>
                  </div>
                </form>
              </UpdateUser>
            </div>
          </div>
        </div>
        <div className='card'>
          <div className='card-body'>
            <div className='photo'>
              <img src='/images/avatar.png' className='card-img' alt='' />
            </div>
            <h1>Ad Soyad</h1>
            <p>user_email</p>
            <p>user_type</p>
            <div className='buttons'>
              <button className='bn632-hover bn24'>Delete</button>
              <button className='bn632-hover bn24'>Update</button>
            </div>
          </div>
        </div>
        <div className='card'>
          <div className='card-body'>
            <div className='photo'>
              <img src='/images/avatar.png' className='card-img' alt='' />
            </div>
            <h1>Ad Soyad</h1>
            <p>user_email</p>
            <p>user_type</p>
            <div className='buttons'>
              <button className='bn632-hover bn24'>Delete</button>
              <button className='bn632-hover bn24'>Update</button>
            </div>
          </div>
        </div>
        <div className='card'>
          <div className='card-body'>
            <div className='photo'>
              <img src='/images/avatar.png' className='card-img' alt='' />
            </div>
            <h1>Ad Soyad</h1>
            <p>user_email</p>
            <p>user_type</p>
            <div className='buttons'>
              <button className='bn632-hover bn24'>Delete</button>
              <button className='bn632-hover bn24'>Update</button>
            </div>
          </div>
        </div>

        <div className='card'>
          <div className='card-body'>
            <div className='photo'>
              <img src='/images/avatar.png' className='card-img' alt='' />
            </div>
            <h1>Ad Soyad</h1>
            <p>user_email</p>
            <p>user_type</p>
            <div className='buttons'>
              <button className='bn632-hover bn24'>Delete</button>
              <button className='bn632-hover bn24'>Update</button>
            </div>
          </div>
        </div>
        <div className='card'>
          <div className='card-body'>
            <div className='photo'>
              <img src='/images/avatar.png' className='card-img' alt='' />
            </div>
            <h1>Ad Soyad</h1>
            <p>user_email</p>
            <p>user_type</p>
            <div className='buttons'>
              <button className='bn632-hover bn24'>Delete</button>
              <button className='bn632-hover bn24'>Update</button>
            </div>
          </div>
        </div>
        <div className='card'>
          <div className='card-body'>
            <div className='photo'>
              <img src='/images/avatar.png' className='card-img' alt='' />
            </div>
            <h1>Ad Soyad</h1>
            <p>user_email</p>
            <p>user_type</p>
            <div className='buttons'>
              <button className='bn632-hover bn24'>Delete</button>
              <button className='bn632-hover bn24'>Update</button>
            </div>
          </div>
        </div>
        <div className='card'>
          <div className='card-body'>
            <div className='photo'>
              <img src='/images/avatar.png' className='card-img' alt='' />
            </div>
            <h1>Ad Soyad</h1>
            <p>user_email</p>
            <p>user_type</p>
            <div className='buttons'>
              <button className='bn632-hover bn24'>Delete</button>
              <button className='bn632-hover bn24'>Update</button>
            </div>
          </div>
        </div>
        <div className='card'>
          <div className='card-body'>
            <div className='photo'>
              <img src='/images/avatar.png' className='card-img' alt='' />
            </div>
            <h1>Ad Soyad</h1>
            <p>user_email</p>
            <p>user_type</p>
            <div className='buttons'>
              <button className='bn632-hover bn24'>Delete</button>
              <button className='bn632-hover bn24'>Update</button>
            </div>
          </div>
        </div>
        <div className='card'>
          <div className='card-body'>
            <div className='photo'>
              <img src='/images/avatar.png' className='card-img' alt='' />
            </div>
            <h1>Ad Soyad</h1>
            <p>user_email</p>
            <p>user_type</p>
            <div className='buttons'>
              <button className='bn632-hover bn24'>Delete</button>
              <button className='bn632-hover bn24'>Update</button>
            </div>
          </div>
        </div>
        <div className='card'>
          <div className='card-body'>
            <div className='photo'>
              <img src='/images/avatar.png' className='card-img' alt='' />
            </div>
            <h1>Ad Soyad</h1>
            <p>user_email</p>
            <p>user_type</p>
            <div className='buttons'>
              <button className='bn632-hover bn24'>Delete</button>
              <button className='bn632-hover bn24'>Update</button>
            </div>
          </div>
        </div>
        <div className='card'>
          <div className='card-body'>
            <div className='photo'>
              <img src='/images/avatar.png' className='card-img' alt='' />
            </div>
            <h1>Ad Soyad</h1>
            <p>user_email</p>
            <p>user_type</p>
            <div className='buttons'>
              <button className='bn632-hover bn24'>Delete</button>
              <button className='bn632-hover bn24'>Update</button>
            </div>
          </div>
        </div>
        <div className='card'>
          <div className='card-body'>
            <div className='photo'>
              <img src='/images/avatar.png' className='card-img' alt='' />
            </div>
            <h1>Ad Soyad</h1>
            <p>user_email</p>
            <p>user_type</p>
            <div className='buttons'>
              <button className='bn632-hover bn24'>Delete</button>
              <button className='bn632-hover bn24'>Update</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;

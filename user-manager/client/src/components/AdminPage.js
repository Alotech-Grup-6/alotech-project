import React from 'react';
import './AdminPage.css';

function AdminPage({users}) {

  
  return (
    <div>
      <div>
        
        <h1 className='title'>Welcome to Admin Page</h1>
      </div>
      
      <div className='cards'>
        
      {users.map((user=>(
        <div className='card'>
          <div className='card-body'>
            <div className='photo'>
              <img src='/images/avatar.png' className='card-img' alt='' />
            </div>
            <h1>{user.username}</h1>
            <p>{user.user_name}</p>
            <p>{user.user_surname}</p>
            <div className='buttons'>
              <button className='bn632-hover bn24'>Delete</button>
              <button className='bn632-hover bn24'>Update</button>
            </div>
          </div>
        </div>
      )))}
      </div>
      
    </div>
  );
}

export default AdminPage;

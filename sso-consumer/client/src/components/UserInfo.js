import React from 'react';
import './UserInfo.css';

function UserInfo({userName,userSurname,userType,userEmail}) {
  return (
    <div>
      <div>
        <h1 className='title'>Welcome to User Page</h1>
      </div>
      <div className='card'>
        <div className='card-body'>
          <div className='photo'>
            <img src='/images/avatar.png' className='card-img' alt='' />
          </div>
          <h1>{userName}</h1>
          <p>{userSurname}</p>
          <p>{userEmail}</p>
          <p>{userType}</p>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;

import React from 'react';
import './UserInfos.css';

function UserInfos() {
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
          <h1>Ad Soyad</h1>
          <p>user_email</p>
          <p>user_type</p>
        </div>
      </div>
    </div>
  );
}

export default UserInfos;

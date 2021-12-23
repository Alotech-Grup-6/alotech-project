import React from 'react';
import './UserInfo.css';
// import Bg from '../../public/City_Landscape_Background.jpg';

function UserInfo() {
  const userDetails = (
    <div className='UserName'>
      <p>Name: `user_name user_surname` </p>
      <p>Email: `user_email`</p>
      <p>Name: `username` </p>
    </div>
  );
  return (
    <div>
      <h1 className='Welcome'>Welcome to User Page</h1>
      <div className='UserDetails'>
        <h1>User Details</h1>
        {userDetails}
      </div>
    </div>
  );
}

export default UserInfo;

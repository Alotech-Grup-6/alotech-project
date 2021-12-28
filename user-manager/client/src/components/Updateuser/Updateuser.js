import './Updateuser.css';
import '../DeleteUser/DeleteUser.css';
import React, { useState } from 'react';

function UpdateUser(props) {
  return props.trigger ? (
    <div className='delete-user'>
      <div className='delete-user-inner'>
        <button
          className='close-btn'
          onClick={() => {
            props.setTrigger(false);
          }}
        >
          &#10060;
        </button>
        {props.children}
      </div>
    </div>
  ) : (
    ''
  );
}

export default UpdateUser;

import React from 'react';
import './DeleteUser.css';

function DeleteUser(props) {
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

export default DeleteUser;

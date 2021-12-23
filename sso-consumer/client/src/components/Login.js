import React from 'react';

function Login() {
  let isAccesTokenValid = false;

  const onSubmit = (e) => {
    if (isAccesTokenValid === true) {
      window.location.href = 'http://localhost:8000';
    } else {
      window.location.href = 'http://localhost:3050';
    }
  };
  return (
    <button className='button' onClick={onSubmit}>
      LOGIN
    </button>
  );
}

export default Login;

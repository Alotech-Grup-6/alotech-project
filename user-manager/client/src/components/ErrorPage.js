import React, { useState } from 'react';
import '../App.css';

function ErrorPage() {
  const [second, setSecond] = useState(5);
  setInterval(() => {
    window.location.href = 'http://localhost:3000';
  }, 5000);
  setInterval(() => {
    setSecond(second - 1);
  }, 1000);

  return (
    <div>
      <h1>It seems you lost your way</h1>
      <p>Redirecting in {second} sn</p>
    </div>
  );
}

export default ErrorPage;

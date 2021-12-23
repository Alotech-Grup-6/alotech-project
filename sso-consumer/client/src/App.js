import React from 'react';
import './App.css'

function App() {
    let isAccesTokenValid = false;    

    const onSubmit = (e) => {
        if(isAccesTokenValid === true) {
            window.location.pathname='http://localhost:3000/userInfo';
        }
        else{
            window.location.href='http://localhost:3050'
        }
    }

    return (
        <div>
            <input className='button' onClick={onSubmit} type="checkbox" id="cb1" />
            <label for="cb1">LOGIN</label>
        </div>
    )
}

export default App


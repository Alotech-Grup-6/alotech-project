import React from 'react';
import './App.css'

function App() {
    let isAccesTokenValid = false;    

    const onSubmit = (e) => {
        if(isAccesTokenValid === true) {
            window.location.href='http://localhost:8000';
        }
        else{
            window.location.href='http://localhost:3050'
        }
    }

    return (
        <div>
            <button onClick={onSubmit} className="button">LOGIN</button>
        </div>
    )
}

export default App


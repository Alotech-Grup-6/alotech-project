import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserInfo from './components/UserInfo';
import UserInfos from './components/UserInfos';
import AdminPage from './components/AdminPage';
import Login from './components/Login';
import ErrorPage from './components/ErrorPage';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/user' element={<UserInfo />} />
          <Route path='/users' element={<UserInfos />} />
          <Route path='/admin' element={<AdminPage />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

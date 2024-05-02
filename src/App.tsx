import React from 'react';
import Login from './pages/Login/Login';
import Register from './pages/Register/register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import './App.css';

function App() {
    return (
        <BrowserRouter>
         <h1>코드이지</h1>
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      );
}

export default App;

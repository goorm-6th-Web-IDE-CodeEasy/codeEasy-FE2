import React from 'react';
import Login from './pages/Login/login';
import Register from './pages/Register/register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import './App.css';
// import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Header from './Layout/Header/Header';

function App() {
    return (
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      );
}

export default App;

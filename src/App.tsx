import React from 'react';
import { RecoilRoot } from "recoil";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Layout/Header/Header';
import Login from './pages/Login/Login';
import Register from './pages/Register/register';
import ThemeProvider from "./pages/Theme/ThemeProvider";
import ThemePage from "./pages/Theme/ThemePage";
import './App.css';

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <ThemeProvider>
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/theme" element={<ThemePage />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;

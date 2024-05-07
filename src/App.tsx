import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { RecoilRoot, useRecoilValue } from 'recoil'; // RecoilRoot
import { scaleState } from './recoil/state/scaleState';
import Header from './Layout/Header/Header';
import Main from './pages/Main/Main';
import Algorithm from './pages/Algorithm/Algorithm';
import Login from "./pages/Login/login";
import Register from "./pages/Register/register";
import { ThemePage } from './pages/Theme/ThemePage';
import { ThemeState } from './pages/Theme/ThemeState';

function App() {
    return (
        <RecoilRoot>
            <AppContent />
        </RecoilRoot>
    );
}

function AppContent() {
    const scale = useRecoilValue(scaleState);
    const theme = useRecoilValue(ThemeState);

    return (
        <HashRouter>
            <Header />
            <div className={`${theme}`} style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/algorithm" element={<Algorithm />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/theme" element={<ThemePage />} />


                    {/* 추가 라우트 경로들 */}
                </Routes>
            </div>
        </HashRouter>
    );

    }


    export default App;

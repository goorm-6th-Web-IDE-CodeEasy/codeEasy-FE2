import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { RecoilRoot, useRecoilValue } from 'recoil'; // RecoilRoot
import { scaleState } from './recoil/state/scaleState';
import Header from './Layout/Header/Header';
import Main from './pages/Main/Main';
import Algorithm from './pages/Algorithm/Algorithm';

function App() {
    return (
        <RecoilRoot>
            <AppContent />
        </RecoilRoot>
    );
}

function AppContent() {
    const scale = useRecoilValue(scaleState);

    return (
        <HashRouter>
            <Header />
            <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/algorithm" element={<Algorithm />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* 추가 라우트 경로들 */}
                </Routes>
            </div>
        </HashRouter>
    );
}

export default App;

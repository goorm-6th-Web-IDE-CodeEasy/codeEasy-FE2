import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { scaleState } from './recoil/state/scaleState';
import Header from './Layout/Header/Header';
import Main from './pages/Main/Main';
import Algorithm from './pages/Algorithm/Algorithm';
import { ThemePage } from './pages/Theme/ThemePage';

const App: React.FC = () => {
    return (
        <RecoilRoot>
            <AppContent />
        </RecoilRoot>
    );
};

const AppContent: React.FC = () => {
    const scale = useRecoilValue<number>(scaleState);

    return (
        <HashRouter>
            <Header /> 
            {/* 헤더 각각 페이지 컴포넌트에 나중에 따로 넣기 */}
            <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/algorithm" element={<Algorithm />} />
                    <Route path="/theme" element={<ThemePage />} />
                    {/* 추가 라우트 경로들 */}
                </Routes>
            </div>
        </HashRouter>
    );
};

export default App;

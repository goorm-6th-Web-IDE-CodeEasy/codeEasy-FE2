import React, { Suspense } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { scaleState } from './recoil/state/scaleState';
import Main from './pages/Main/Main';
import Algorithm from './pages/Algorithm/Algorithm';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import { ThemePage } from './pages/Theme/ThemePage';
import WebIDE from './pages/IDE/webIDE';
import Mypage from './pages/Mypage/Mypage';
import FAQ from './pages/FAQ/FAQ';

const ROUTES_INFO = [
    { path: '/', element: <Main /> },
    { path: '/algorithm', element: <Algorithm /> },
    { path: '/login', element: <Login /> },
    { path: '/mypage', element: <Mypage /> },
    { path: '/register', element: <Register /> },
    { path: '/faq', element: <FAQ /> },
    { path: '/theme', element: <ThemePage /> },
    { path: '/ide/:problemID', element: <WebIDE /> }, //IDE 경로 추가
    // 추가 라우트 경로들
];

const App: React.FC = () => {
    return (
        <RecoilRoot>
            <Suspense fallback={<div>Loading...</div>}>
                <AppContent />
            </Suspense>
        </RecoilRoot>
    );
};

const AppContent: React.FC = () => {
    const scale = useRecoilValue<number>(scaleState);

    return (
        <HashRouter>
            {/* 헤더와 푸터 각 페이지마다 따로 넣기 */}
            <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
                <Routes>
                    {ROUTES_INFO.map((route) => (
                        <Route key={route.path} path={route.path} element={route.element} />
                    ))}
                </Routes>
            </div>
        </HashRouter>
    );
};

export default App;

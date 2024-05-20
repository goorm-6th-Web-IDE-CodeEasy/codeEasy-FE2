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
import { ThemeState } from './pages/Theme/ThemeState';
import styles from './global.module.scss';

const ROUTES_INFO = [
    { path: '/', element: <Main /> },
    { path: '/algorithm', element: <Algorithm /> },
    { path: '/login', element: <Login /> },
    { path: '/mypage', element: <Mypage /> },
    { path: '/register', element: <Register /> },
    { path: '/faq', element: <FAQ /> },
    { path: '/theme', element: <ThemePage /> },
    { path: '/ide/:problemID', element: <WebIDE /> },
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
    const selectedTheme = useRecoilValue<string>(ThemeState);

    return (
        <HashRouter>
            <div
                className={`${styles.container} ${styles[`mode_${selectedTheme}`]}`}
                style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}
            >
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

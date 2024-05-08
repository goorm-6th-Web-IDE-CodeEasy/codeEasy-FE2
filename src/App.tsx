import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { scaleState } from './recoil/state/scaleState';
import Header from './Layout/Header/Header';
import Main from './pages/Main/Main';
import Algorithm from './pages/Algorithm/Algorithm';
import Login from './pages/Login/login';
import Register from './pages/Register/register';
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
      <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
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
};

export default App;

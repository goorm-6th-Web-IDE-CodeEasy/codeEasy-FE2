import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot, useRecoilValue } from "recoil"; // RecoilRoot
import { scaleState } from "./recoil/state/scaleState";
import Header from "./Layout/Header/Header";
import Main from "./pages/Main/Main";

function App() {
  return (
    <RecoilRoot>// RecoilRoot import
      <AppContent />
    </RecoilRoot>
  );
}

function AppContent() {
  const scale = useRecoilValue(scaleState);

  return (
    <HashRouter>
      <Header />
      <div
        style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}
      >
        <Routes>
          <Route path="/" element={<Main />} />
          {/* 추가 라우트 경로들 */}
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;

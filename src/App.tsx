import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Header from './Layout/Header/Header';
import Main from './pages/Main/Main';

function App() {
    return (
        <RecoilRoot>
            <HashRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Main />} />
                    {/* route 나중에 더 추가하기 알고리즘, 테마, 로그인, 회원가입*/}
                </Routes>
            </HashRouter>
        </RecoilRoot>
    );
}

export default App;

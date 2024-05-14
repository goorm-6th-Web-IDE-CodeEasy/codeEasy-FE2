import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // 확장자 tsx는 생략 가능
import './index.css';
import { worker } from './mocks/worker';

//개발환경에서 worker를 import해와서 동작시킴
if (process.env.NODE_ENV === 'development') {
    worker.start();
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

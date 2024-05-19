import axios from 'axios';

// Axios 인스턴스 생성
const api = axios.create({
    baseURL: 'http://localhost:8080/',
    //http://localhost:5173/
});

export default api;

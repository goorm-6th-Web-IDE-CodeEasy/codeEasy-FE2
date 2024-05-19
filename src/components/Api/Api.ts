import axios from 'axios';

// Axios 인스턴스 생성
const api = axios.create({
    baseURL: 'http://localhost:8080/',
    //http://localhost:8080/
});
export default api;

import axios from 'axios';

// Axios 인스턴스 생성
const api = axios.create({
    baseURL: 'http://localhost:5173/',
    //http://localhost:8080/
});
const API = axios.create({
    baseURL: 'https://emkc.org/api/v2/piston',
});

export const executeCode = async (language, sourceCode) => {
    const response = await API.post('/execute', {
        language: language,
        files: [
            {
                content: sourceCode,
            },
        ],
    });
    return response.data;
};

export default api;

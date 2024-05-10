import axios from 'axios'

// Axios 인스턴스 생성
const api = axios.create({
    baseURL: 'http://localhost:8080/api', // baseURL설정
})

export default api

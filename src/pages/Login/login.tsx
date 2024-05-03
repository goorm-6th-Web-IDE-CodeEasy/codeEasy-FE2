import React, { useState } from 'react';
import axios from 'axios';
import styles from './login.module.scss';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '', password: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { username, password } = formData;

        try {
            const response = await axios.post('http://localhost:8080/api/login', { username, password });
            localStorage.setItem('token', response.data.token); // 토큰 저장
            alert('로그인 성공!');
        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : error.message;
            console.error('로그인 실패:', errorMessage);
            alert(`로그인 실패: ${errorMessage}`);
        }
    };

    return (
        <div className={styles.background}>
            <div className={styles.container}>
                <h1>로그인</h1>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label>아이디</label>
                        <input type="text" name="username" value={formData.username} onChange={handleInputChange} placeholder="아이디를 입력하세요" required />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>비밀번호</label>
                        <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="비밀번호를 입력하세요" required />
                    </div>
                    <button type="submit">로그인</button>
                </form>
                <small>회원이 아니신가요?<a href="/">회원가입</a></small>
            </div>
        </div>
    );
};

export default Login;

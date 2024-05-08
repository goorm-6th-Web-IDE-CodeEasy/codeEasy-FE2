import React, { useState } from 'react';
import axios from 'axios';
import styles from './login.module.scss';
import GoogleButton from './GoogleButton';
import KakaoButton from './KakaoButton';
import GithubButton from './GithubButton';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate 추가
import { loggedInState } from '../../recoil/state/loggedInState';
import { useSetRecoilState } from 'recoil';
import { ThemeState } from "../Theme/ThemeState";
import { useRecoilValue } from "recoil";

const Login = () => {
    const setLoggedIn = useSetRecoilState(loggedInState);
    const [formData, setFormData] = useState({
        username: '', password: ''
    });
    const theme = useRecoilValue(ThemeState);
    const history = useNavigate(); // useNavigate를 사용하여 로그인 후 페이지 이동 처리

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { username, password } = formData;
        try {
            const response = await axios.post('http://localhost:8080/api/login', { username, password });
            localStorage.setItem('token', response.data.token); // 토큰 저장
            setLoggedIn(true); // 로그인 상태를 true로 설정
            alert('로그인 성공!');
            history.push('/mainpage'); // 메인 페이지로 이동
        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : error.message;
            console.error('로그인 실패:', errorMessage);
            alert(`로그인 실패: ${errorMessage}`);
        }
    };

    return (
        <div className={`${theme}`}>
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
                        <p>다른 서비스로 로그인:</p>
                        <div>
                            <GoogleButton />
                            <KakaoButton />
                            <GithubButton />
                        </div>
                    </form>
                    <small>회원이 아니신가요? <Link to="/register">회원가입</Link></small>
                </div>
            </div>
        </div>
    );
};

export default Login;

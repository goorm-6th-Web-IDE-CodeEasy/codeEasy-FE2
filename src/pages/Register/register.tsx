import React, { useState } from 'react';
import axios from 'axios';
import styles from './register.module.scss';
import { Link } from 'react-router-dom';
import { ThemeState } from '../Theme/ThemeState';
import { useRecoilValue } from 'recoil';

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        nickname: '',
        verificationCode: '',
    });
    const [availability, setAvailability] = useState({
        usernameAvailable: true,
        nicknameAvailable: true,
        emailVerified: false,
    });
    const [verificationCodeSent, setVerificationCodeSent] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const sendVerificationCode = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/register/send-certification', {
                email: formData.email,
            });
            setVerificationCodeSent(true);
            alert('인증 코드가 이메일로 전송되었습니다.');
        } catch (error) {
            console.error('인증 코드 전송 실패:', error);
            alert('인증 코드 전송에 실패했습니다.');
        }
    };

    const verifyCode = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/register/verify-code', {
                email: formData.email,
                code: formData.verificationCode,
            });
            if (response.data.success) {
                setAvailability((prev) => ({ ...prev, emailVerified: true }));
                alert('이메일 인증 성공!');
            } else {
                alert('인증 코드가 잘못되었습니다.');
            }
        } catch (error) {
            console.error('인증 실패:', error);
            alert('인증에 실패했습니다.');
        }
    };

    const checkAvailability = async (type) => {
        const value = formData[type];
        if (!value) return;
        try {
            const response = await axios.get(`http://localhost:8080/api/${type}-check`, { params: { [type]: value } });
            const { available } = response.data;
            setAvailability((prev) => ({ ...prev, [`${type}Available`]: available }));
            if (!available) {
                alert(`${type === 'username' ? '아이디' : '닉네임'}가 이미 사용 중입니다.`);
            }
        } catch (error) {
            console.error('요청 실패:', error);
            alert('서버에서 응답을 받지 못했습니다.');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { usernameAvailable, nicknameAvailable, emailVerified } = availability;
        const { email, username, password, confirmPassword, nickname, verificationCode } = formData;

        if (!usernameAvailable || !nicknameAvailable || !emailVerified) {
            alert('아이디, 닉네임, 혹은 이메일 인증을 확인해 주세요.');
            return;
        }
        if (password !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('올바른 이메일 형식이 아닙니다.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/register', {
                email,
                username,
                password,
                nickname,
            });
            alert('회원가입에 성공했습니다!');
        } catch (error) {
            console.error('회원가입에 실패했습니다:', error.response ? error.response.data.message : error.message);
            alert(`회원가입에 실패했습니다: ${error.response ? error.response.data.message : error.message}`);
        }
    };
    const theme = useRecoilValue(ThemeState);
    return (
        <div className={`${theme}`}>
            <div className={styles.background}>
                <div className={styles.container}>
                    <h1>회원가입</h1>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="username">아이디</label>
                            <input
                                id="username"
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                placeholder="아이디를 입력하세요"
                                required
                            />
                            <button type="button" onClick={() => checkAvailability('username')}>
                                아이디 중복 확인
                            </button>
                            {!availability.usernameAvailable && (
                                <div style={{ color: 'red' }}>이미 사용 중인 아이디입니다.</div>
                            )}
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="password">비밀번호</label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="비밀번호를 입력하세요"
                                required
                            />
                            <label htmlFor="confirmPassword">비밀번호 확인</label>
                            <input
                                id="confirmPassword"
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                placeholder="비밀번호를 확인하세요"
                                required
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="nickname">닉네임</label>
                            <input
                                id="nickname"
                                type="text"
                                name="nickname"
                                value={formData.nickname}
                                onChange={handleInputChange}
                                placeholder="닉네임을 입력하세요"
                                required
                            />
                            <button type="button" onClick={() => checkAvailability('nickname')}>
                                닉네임 중복 확인
                            </button>
                            {!availability.nicknameAvailable && (
                                <div style={{ color: 'red' }}>이미 사용 중인 닉네임입니다.</div>
                            )}
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="email">이메일</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="이메일을 입력하세요"
                                required
                            />
                            <button type="button" onClick={sendVerificationCode} disabled={verificationCodeSent}>
                                인증 코드 전송
                            </button>
                            {verificationCodeSent && (
                                <>
                                    <label htmlFor="verificationCode">인증 코드</label>
                                    <input
                                        id="verificationCode"
                                        type="text"
                                        name="verificationCode"
                                        value={formData.verificationCode}
                                        onChange={handleInputChange}
                                        placeholder="인증 코드를 입력하세요"
                                        required
                                    />
                                    <button type="button" onClick={verifyCode}>
                                        인증 코드 확인
                                    </button>
                                </>
                            )}
                        </div>
                        <button type="submit">가입하기</button>
                    </form>
                    <small>
                        이미 회원이세요? <Link to="/login">로그인</Link>
                    </small>
                </div>
            </div>
        </div>
    );
};

export default Register;

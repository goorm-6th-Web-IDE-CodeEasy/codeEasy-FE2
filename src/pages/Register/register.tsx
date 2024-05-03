import React, { useState } from 'react';
import axios from 'axios';
import styles from './register.module.scss';

const Register = () => {
    const [formData, setFormData] = useState({
        email: '', username: '', password: '', confirmPassword: '', nickname: '', verificationCode: ''
    });
    const [availability, setAvailability] = useState({
        usernameAvailable: true, nicknameAvailable: true, emailVerified: false
    });
    const [verificationCodeSent, setVerificationCodeSent] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    //백엔드 입력한 이메일 전송하기
    const sendVerificationCode = async () => {
        try {
            await axios.post('http://localhost:8080/api/send-verification-code', { email: formData.email });
            setVerificationCodeSent(true);
            alert('인증 코드가 이메일로 전송되었습니다.');
        } catch (error) {
            console.error('인증 코드 전송 실패:', error);
            alert('인증 코드 전송에 실패했습니다.');
        }
    };
    //백엔드 측 인증코드 검사
    const verifyCode = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/verify-code', { email: formData.email, verificationCode: formData.verificationCode });
            if (response.data.verified) {
                setAvailability(prev => ({ ...prev, emailVerified: true }));
                alert('이메일 인증 성공!');
            } else {
                alert('인증 코드가 잘못되었습니다.');
            }
        } catch (error) {
            console.error('인증 실패:', error);
            alert('인증에 실패했습니다.');
        }
    };
    
    // 아이디와 닉네임 중복 확인
    const checkAvailability = async (value, type) => {
        if (!value) return; // 값이 없으면 함수 종료
        try {
            const response = await axios.get(`http://localhost:8080/api/check-${type}`, {
                params: { [type]: value }
            });
            const { available } = response.data;
            setAvailability(prev => ({ ...prev, [`${type}Available`]: available }));
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
        const { email, username, password, confirmPassword, nickname, verificationCode } = formData;
        const { usernameAvailable, nicknameAvailable, emailVerified } = availability;

        if (!usernameAvailable || !nicknameAvailable || !emailVerified) {
            alert('아이디, 닉네임 혹은 이메일 인증을 확인해 주세요.');
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
                email, username, password, nickname
            });
            alert('회원가입에 성공했습니다!');
        } catch (error) {
            console.error('회원가입에 실패했습니다:', error.response ? error.response.data.message : error.message);
            alert(`회원가입에 실패했습니다: ${error.response ? error.response.data.message : error.message}`);
        }
    };

    return (
    <div className={styles.background}>
        <div className={styles.container}>
            <h1>회원가입</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputGroup}>
                    <label>아이디</label>
                    <input type="text" name="username" value={formData.username} onChange={handleInputChange} placeholder="아이디를 입력하세요" required />
                    <button type="button" onClick={() => checkAvailability('username')}>아이디 중복 확인</button>
                    {!availability.usernameAvailable && <div style={{ color: 'red' }}>이미 사용 중인 아이디입니다.</div>}
                </div>
                <div className={styles.inputGroup}>
                    <label>비밀번호</label>
                    <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="비밀번호를 입력하세요" required />
                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} placeholder="비밀번호를 확인하세요" required />
                </div>
                <div className={styles.inputGroup}>
                    <label>닉네임</label>
                    <input type="text" name="nickname" value={formData.nickname} onChange={handleInputChange} placeholder="닉네임을 입력하세요" required />
                    <button type="button" onClick={() => checkAvailability('nickname')}>닉네임 중복 확인</button>
                    {!availability.nicknameAvailable && <div style={{ color: 'red' }}>이미 사용 중인 닉네임입니다.</div>}
                </div>
                <div className={styles.inputGroup}>
                    <label>이메일</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="이메일을 입력하세요" required />
                    <button type="button" onClick={sendVerificationCode} disabled={verificationCodeSent}>인증 코드 전송</button>
                    {verificationCodeSent && (
                    <>
                        <input type="text" name="verificationCode" value={formData.verificationCode} onChange={handleInputChange} placeholder="인증 코드를 입력하세요" required />
                        <button type="button" onClick={verifyCode}>인증 코드 확인</button>
                    </>
                    )}
                </div>
                <button type="submit">가입하기</button>
            </form>
            <small>이미 회원이세요?<a href="/login">로그인</a></small>
        </div>
    </div>
    );
};

export default Register;

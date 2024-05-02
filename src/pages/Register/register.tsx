import React, { useState } from 'react';
//import { useRecoilState } from 'recoil';
//import { loggedInUserState } from './state';
//import styles from './styles.scss';

const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); //비밀번호 확인
    const [nickname, setNickname] = useState('');
    const [usernameAvailable, setUsernameAvailable] = useState(true); //아이디 중복 여부
    const [nicknameAvailable, setNicknameAvailable] = useState(true); //닉네임 중복 여부
    //const [, setLoggedInUser] = useRecoilState(loggedInUserState);

    const checkAvailability = async (value, type) => {
        if (!value) return;
        const response = await fetch(`http://localhost:8080/api/check-${type}?${type}=${value}`);
        const { available } = await response.json();
        if (type === 'username') {
            setUsernameAvailable(available);
        } else {
            setNicknameAvailable(available);
        }
        if (!available) {
            alert(`이미 사용 중인 ${type === 'username' ? '아이디' : '닉네임'}입니다.`);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!usernameAvailable || !nicknameAvailable) {
            alert('사용할 수 없는 아이디 또는 닉네임입니다. 다른 값을 입력해 주세요.');
            return;
        }
        if (password !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }
        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            alert('올바른 이메일 형식이 아닙니다.');
            return;
        }

        const response = await fetch('http://localhost:8080/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, username, password, nickname })
        });
        const data = await response.json();
        if (response.ok) {
            alert('회원가입 성공');
            //setLoggedInUser({ email: data.email, nickname: data.nickname });
        } else {
            console.error(data.message);
            alert('회원가입 실패: ' + data.message);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>이메일</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
                <label>아이디</label>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} onBlur={() => checkAvailability(username, 'username')} placeholder="Username" required />
                {!usernameAvailable && <div style={{ color: 'red' }}>이미 사용 중인 아이디입니다.</div>}
                <label>닉네임</label>
                <input type="text" value={nickname} onChange={e => setNickname(e.target.value)} onBlur={() => checkAvailability(nickname, 'nickname')} placeholder="Nickname" required />
                {!nicknameAvailable && <div style={{ color: 'red' }}>이미 사용 중인 닉네임입니다.</div>}
                <label>비밀번호</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
                <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm Password" required />
                <button type="submit">가입하기</button>
            </form>
        </div>
    );
};
export default Register;
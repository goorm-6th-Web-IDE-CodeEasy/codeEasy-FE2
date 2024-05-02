import React,{ useState } from 'react';
import { Link } from 'react-router-dom';

function Register() {  
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [emailCode, setEmailCode] = useState('');
  const [errors, setErrors] = useState({});

  const checkIdDuplicate = async () => {
    // 서버에 아이디 중복 검사 요청
    console.log('아이디 중복 검사 실행');
  };
  const checkNicknameDuplicate = async () => {
    // 서버에 닉네임 중복 검사 요청
    console.log('닉네임 중복 검사 실행');
  };

  const sendEmailCode = async () => {
    // 이메일 코드 보내기 요청
    console.log('이메일 코드 보냄');
  };

  const verifyEmailCode = async () => {
    // 입력한 코드가 서버에서 보낸 코드와 일치하는지 검사
    console.log('이메일 코드 검증');
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setErrors({ ...errors, confirmPassword: '비밀번호가 일치하지 않습니다.' });
      return;
    }
    console.log('폼 제출', { id, password, nickname, email });
  };

  return (
    <div className="background">
      <div className="position-align">
        <div className="margin-part">
          <h1 className="Signup">회원가입</h1>
          <form onSubmit={handleSubmit}>
            <h3>아이디 설정</h3>
            <input
              placeholder="아이디를 입력하세요"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <button onClick={checkIdDuplicate}>중복 확인</button>
            
            <h3>비밀번호 설정</h3>
            <input
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              type="password"
              placeholder="비밀번호를 다시 입력하세요"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <h3>닉네임 설정</h3>
            <input
              placeholder="닉네임을 입력하세요"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <button onClick={checkNicknameDuplicate}>중복 확인</button>
            
            <h3>이메일 인증</h3>
            <input
              placeholder="이메일을 입력하세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={sendEmailCode}>인증번호 보내기</button>
            
            <input
              placeholder="인증번호 입력"
              value={emailCode}
              onChange={(e) => setEmailCode(e.target.value)}
            />
            <button onClick={verifyEmailCode}>인증번호 확인</button>

            <button type="submit" className="signup-button">가입하기</button>
          </form>
          <small>
            이미 가입하셨나요?
            <Link to="/login">로그인</Link>
          </small>
        </div>
      </div>
    </div>
  );
}

export default Register;

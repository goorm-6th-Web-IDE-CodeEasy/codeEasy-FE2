import React,{ useState } from 'react';
import { Link } from 'react-router-dom';
import Register from '../Register/register';
import GoogleLoginButton from './GoogleLoginButton';

function Login() {  
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
 
  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
       console.log('폼 제출', { id, password });
  };

  return (
    <div className="background">
      <div className="position-align">
        <div className="margin-part">
          <h1>로그인</h1>
          <form onSubmit={handleSubmit}>
            <h3>아이디</h3>
            <input
              placeholder="아이디를 입력하세요"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <h3>비밀번호</h3>
            <input
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">로그인</button>
            <GoogleLoginButton />
          </form>
          <small>
            회원이 아니신가요?
            <Link to="/register">회원가입</Link>
          </small>
        </div>
      </div>
    </div>
  );
}

export default Login;

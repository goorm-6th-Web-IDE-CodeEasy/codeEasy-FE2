import React, { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Login.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { loggedInState, userState } from '../../recoil/state/loggedInState';
import { useSetRecoilState } from 'recoil';
import InputField from '../../components/InputForm/InputForm';
import Header from '../../Layout/Header/Header';
import api from '../../components/Api/Api';
import SocialLoginButton from '../../components/LoginButton/SocialLoginButton';
import githubIcon from '../../assets/Login/깃허브.png';
import googleIcon from '../../assets/Login/구글.png';
import kakaoIcon from '../../assets/Login/카카오.png';
import SkeletonLoader from '../../components/SkeletonLoader/SkeletonLoader';

const Login = () => {
    const setLoggedIn = useSetRecoilState(loggedInState);
    const setUser = useSetRecoilState(userState);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    // 서버로부터 로그인 상태 확인
    useEffect(() => {
        axios
            .get('/api/check-session')
            .then((response) => {
                if (response.data.isLoggedIn) {
                    setUser(response.data.user);
                    setLoggedIn(true);
                }
            })
            .catch(() => {
                setLoggedIn(false);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [setUser, setLoggedIn]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { email, password } = formData;

        try {
            const response = await api.post('/api/login', { email, password });
            const userData = response.data;
            setUser(userData);
            setLoggedIn(true);
            navigate('/');
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const errorMessage = error.response.data.errorMessage;
                alert(`로그인 실패: ${errorMessage}`);
            } else {
                alert('로그인 실패: 네트워크 오류 또는 서버에 접근할 수 없습니다.');
            }
        }
    };

    const handleSocialLogin = (service: 'google' | 'github' | 'kakao') => {
        const redirectUri = import.meta.env[`VITE_REACT_APP_${service.toUpperCase()}_REDIRECT_URI`];
        const clientId = import.meta.env[`VITE_REACT_APP_${service.toUpperCase()}_CLIENT_ID`];
        const baseUrl = {
            google: `https://accounts.google.com/o/oauth2/v2/auth?scope=email%20openid&response_type=code&redirect_uri=${redirectUri}&client_id=${clientId}`,
            github: `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`,
            kakao: `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`,
        };

        window.location.href = baseUrl[service];
    };
    if (isLoading) {
        return <SkeletonLoader />;
    }

    return (
        <div>
            <Header />
            <div className={styles.background}>
                <div className={styles.container}>
                    <h1>로그인</h1>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <InputField
                            label="이메일"
                            type="email"
                            name="email"
                            placeholder="이메일을 입력하세요"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        <InputField
                            label="비밀번호"
                            type="password"
                            name="password"
                            placeholder="비밀번호를 입력하세요"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                        <button type="submit">로그인</button>
                        <p>다른 서비스로 로그인</p>
                        <div>
                            <SocialLoginButton
                                onClick={() =>
                                    handleSocialLogin(
                                        `https://accounts.google.com/o/oauth2/v2/auth?scope=email%20openid&response_type=code&redirect_uri=${import.meta.env.VITE_REACT_APP_GOOGLE_REDIRECT_URI}&client_id=${import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID}`
                                    )
                                }
                                src={googleIcon}
                                alt="Login with Google"
                                style={{ height: '50px' }}
                            />
                            <SocialLoginButton
                                onClick={() =>
                                    handleSocialLogin(
                                        `https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_REACT_APP_GITHUB_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_REACT_APP_GITHUB_REDIRECT_URI}`
                                    )
                                }
                                src={githubIcon}
                                alt="Login with GitHub"
                                style={{ height: '50px' }}
                            />
                            <SocialLoginButton
                                onClick={() =>
                                    handleSocialLogin(
                                        `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`
                                    )
                                }
                                src={kakaoIcon}
                                alt="Login with Kakao"
                                style={{ height: '50px' }}
                            />
                        </div>
                    </form>
                    <small>
                        회원이 아니신가요?<Link to="/register">회원가입</Link>
                    </small>
                </div>
            </div>
        </div>
    );
};

export default Login;

import React, { ChangeEvent, useState } from 'react'
import axios from 'axios'
import styles from './Login.module.scss'
import GoogleButton from './GoogleButton'
import KakaoButton from './KakaoButton'
import GithubButton from './GithubButton'
import { Link } from 'react-router-dom'
import { loggedInState } from '../../recoil/state/loggedInState'
import { useSetRecoilState } from 'recoil'

const Login = () => {
    const setLoggedIn = useSetRecoilState(loggedInState)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const { email, password } = formData

        try {
            const response = await axios.post('http://localhost:8080/api/login', { email, password })
            localStorage.setItem('token', response.data.token) // 토큰 저장
            setLoggedIn(true) // 로그인 상태를 true로 설정
            alert('로그인 성공!')
            //메이페이지로 이동 (라우터 사용할 예정)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    const errorMessage = error.response.data // 백엔드에서 보낸 에러 메시지
                    alert(`로그인 실패: ${errorMessage}`)
                } else {
                    alert('로그인 실패: 네트워크 오류 또는 서버에 접근할 수 없습니다.')
                }
            } else {
                alert('로그인 실패: 알 수 없는 오류가 발생했습니다.')
            }
        }
    }

    return (
        <div className={styles.background}>
            <div className={styles.container}>
                <h1>로그인</h1>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label>이메일</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="이메일을 입력하세요"
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>비밀번호</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="비밀번호를 입력하세요"
                            required
                        />
                    </div>
                    <button type="submit">로그인</button>
                    <p>다른 서비스로 로그인</p>
                    <div>
                        <GoogleButton />
                        <KakaoButton />
                        <GithubButton />
                    </div>
                </form>
                <small>
                    회원이 아니신가요?<Link to="/register">회원가입</Link>
                </small>
            </div>
        </div>
    )
}

export default Login
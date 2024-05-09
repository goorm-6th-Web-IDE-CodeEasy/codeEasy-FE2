import React, { ChangeEvent, useState } from 'react'
import axios from 'axios'
import styles from './Register.module.scss'
import { Link } from 'react-router-dom'
import { ApiResponse, VerificationData, AvailabilityCheck, FormData, Availability } from './Registertyes'

const Register = () => {
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
        confirmPassword: '',
        nickname: '',
        verificationCode: '',
    })
    const [availability, setAvailability] = useState<Availability>({
        nicknameAvailable: true,
        emailVerified: false,
    })
    const [verificationCodeSent, setVerificationCodeSent] = useState(false)

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    //백엔드에게 해당 이메일에게 인증번호를 주도록 요청
    const sendVerificationCode = async () => {
        try {
            await axios.post<ApiResponse<VerificationData>>('http://localhost:8080/api/register/send-certification', {
                email: formData.email,
            })
            setVerificationCodeSent(true)
            alert('인증 코드가 이메일로 전송되었습니다.')
        } catch (error) {
            console.error('인증 코드 전송 실패:', error)
            alert('인증 코드 전송에 실패했습니다.')
        }
    }

    //백엔드에서 보낸 인증코드와 사용자가 입력한 인증코드 검사 (3분 제한 시간있음)
    const verifyCode = async () => {
        try {
            const response = await axios.post<ApiResponse<VerificationData>>(
                'http://localhost:8080/api/register/certificate-code',
                {
                    email: formData.email,
                    verificationCode: formData.verificationCode,
                },
            )
            if (response.data.success) {
                setAvailability((prev) => ({ ...prev, emailVerified: true }))
                alert('이메일 인증 성공!')
            } else {
                alert('인증 코드가 잘못되었습니다.')
            }
        } catch (error) {
            console.error('인증 실패:', error)
            alert('인증에 실패했습니다.')
        }
    }

    //닉네임의 중복 여부를 확인하기
    const checkAvailability = async (nickname: string) => {
        if (!nickname) return //닉네임이 비어있으면 바로 반환
        try {
            const response = await axios.get<ApiResponse<AvailabilityCheck>>(
                `http://localhost:8080/api/nickname-check`,
                {
                    params: { nickname },
                },
            )
            setAvailability((prev) => ({ ...prev, [`nicknameAvailable`]: response.data.data.available }))
            if (!response.data.data.available) {
                alert('닉네임이 이미 사용 중입니다.') // 닉네임 중복 메시지
            }
        } catch (error) {
            console.error('요청 실패:', error)
            alert('서버에서 응답을 받지 못했습니다.')
        }
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const { email, password, confirmPassword, nickname, verificationCode } = formData
        const { nicknameAvailable, emailVerified } = availability

        if (!nicknameAvailable || !emailVerified) {
            alert('닉네임 혹은 이메일 인증을 확인해 주세요.')
            return
        }
        if (password !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다')
            return
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('올바른 이메일 형식이 아닙니다.')
            return
        }

        try {
            await axios.post('http://localhost:8080/api/register', {
                email,
                password,
                nickname,
                verificationCode,
            })
            alert('회원가입에 성공했습니다!')
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    const errorMessage = error.response.data // 백엔드에서 보낸 에러 메시지
                    alert(`회원가입 실패: ${errorMessage}`)
                } else {
                    alert('회원가입 실패: 네트워크 오류 또는 서버에 접근할 수 없습니다.')
                }
            } else {
                alert('회원가입 실패: 알 수 없는 오류가 발생했습니다.')
            }
        }
    }

    return (
        <div className={styles.background}>
            <div className={styles.container}>
                <h1>회원가입</h1>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label>닉네임</label>
                        <input
                            type="text"
                            name="nickname"
                            value={formData.nickname}
                            onChange={handleInputChange}
                            placeholder="닉네임을 입력하세요"
                            required
                        />
                        <button type="button" onClick={() => checkAvailability(formData.nickname)}>
                            닉네임 중복 확인
                        </button>
                        {!availability.nicknameAvailable && (
                            <div style={{ color: 'red' }}>이미 사용 중인 닉네임입니다.</div>
                        )}
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
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            placeholder="비밀번호를 확인하세요"
                            required
                        />
                    </div>
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
                        <button type="button" onClick={sendVerificationCode} disabled={verificationCodeSent}>
                            인증 코드 전송
                        </button>
                        {verificationCodeSent && (
                            <>
                                <input
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
                    이미 회원이세요?<Link to="/login">로그인</Link>
                </small>
            </div>
        </div>
    )
}

export default Register
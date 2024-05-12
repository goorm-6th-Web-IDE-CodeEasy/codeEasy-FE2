import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { loggedInState, userState } from '../../recoil/state/loggedInState'
import api from '../../components/Api/Api' // Axios 인스턴스 import

const SocialLoginRedirect = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const setUser = useSetRecoilState(userState)
    const setLoggedIn = useSetRecoilState(loggedInState)

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search)
        const code = queryParams.get('code')
        const service = queryParams.get('service') // 'kakao', 'google', 'github'

        if (code && service) {
            api.post(`/api/login/${service}`, { code })
                .then((response) => {
                    console.log('Login successful with data:', response.data)
                    localStorage.setItem('user', JSON.stringify(response.data.user))
                    setUser(response.data.user)
                    setLoggedIn(true)
                    navigate('/')
                })
                .catch((error) => {
                    console.error('Login failed:', error)
                    navigate('/login') // 실패 시 로그인 페이지로 돌아감
                })
        }
    }, [location, navigate, setUser, setLoggedIn])

    return <div>연결중...</div>
}

export default SocialLoginRedirect

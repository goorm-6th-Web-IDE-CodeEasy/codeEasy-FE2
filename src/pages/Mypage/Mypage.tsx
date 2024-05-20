import React, { startTransition, useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { fetchUserState, loggedInState, userState } from '../../recoil/state/loggedInState'
import Header from '../../Layout/Header/Header'
import Footer from '../../Layout/Footer/Footer'
import { useNavigate } from 'react-router-dom'
import styles from './Mypage.module.scss'
import api from '../../components/Api/Api'
import { ProblemHistoryChart } from '../../components/Chart/Chart'
import { ThemeState } from '../Theme/ThemeState'

const Mypage = () => {
    const theme = useRecoilValue(ThemeState)
    const [isLoggedIn] = useRecoilState(loggedInState) // 로그인 상태 여부
    const [user, setUser] = useRecoilState(userState) // 로그인 시 정보
    const fetchedUser = useRecoilValue(fetchUserState)
    const [showSettings, setShowSettings] = useState(false) // 사용자정보바꾸기
    const [nickname, setNickname] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const [recentProblems] = useState([
        { id: 1, title: '최단 경로 찾기' },
        { id: 2, title: '게임의 승자는 누구' },
        { id: 3, title: 'A + B' },
        { id: 4, title: '스타찾기' },
    ])

    const hardcodedHistoryData = [
        { date: '2023-12-05', problemsSolved: 12 },
        { date: '2023-12-23', problemsSolved: 5 },
        { date: '2024-01-10', problemsSolved: 17 },
        { date: '2024-01-25', problemsSolved: 14 },
        { date: '2024-02-05', problemsSolved: 19 },
        { date: '2024-02-18', problemsSolved: 6 },
        { date: '2024-03-05', problemsSolved: 18 },
        { date: '2024-03-22', problemsSolved: 12 },
        { date: '2024-04-02', problemsSolved: 2 },
        { date: '2024-04-18', problemsSolved: 15 },
        { date: '2024-05-01', problemsSolved: 1 },
        { date: '2024-05-04', problemsSolved: 4 },
        { date: '2024-05-08', problemsSolved: 14 },
        { date: '2024-05-11', problemsSolved: 7 },
        { date: '2024-05-14', problemsSolved: 10 },
        { date: '2024-05-15', problemsSolved: 15 },
        { date: '2024-05-16', problemsSolved: 2 },
        { date: '2024-05-17', problemsSolved: 25 },
        { date: '2024-05-18', problemsSolved: 30 },
        { date: '2024-05-19', problemsSolved: 5 },
        { date: '2024-05-20', problemsSolved: 10 },
    ]

    useEffect(() => {
        startTransition(() => {
            if (isLoggedIn) {
                setUser(fetchedUser)
            } else {
                setUser(null)
            }
        })
    }, [isLoggedIn, fetchedUser, setUser])

    const handleNicknameChange = async () => {
        try {
            await api.put(`/mypage/${user.id}/nickname`, { nickname })
            alert('닉네임이 변경되었습니다.')
            setUser((prevUser) => ({ ...prevUser, nickname }))
        } catch (error) {
            console.error('Error updating nickname:', error)
        }
    }

    const handlePasswordChange = async () => {
        try {
            await api.put(`/mypage/${user.id}/password`, { password })
            alert('비밀번호가 변경되었습니다.')
        } catch (error) {
            console.error('Error updating password:', error)
        }
    }

    const handleDeleteAccount = async () => {
        try {
            await api.delete(`/mypage/${user.id}`)
            alert('회원탈퇴가 완료되었습니다.')
            setUser(null)
            navigate('/login')
        } catch (error) {
            console.error('Error deleting account:', error)
        }
    }

    if (!isLoggedIn) {
        return navigate('/login')
    }

    return (
        <div className={`${styles[`mode_${theme}`]}`} aria-label="Main section">
            <Header />
            <div className={styles.profilepagecontainer}>
                <div className={styles.topsection}>
                    <div className={styles.profilecontainer}>
                        <img
                            src="https://source.unsplash.com/featured/?{puppy}"
                            alt="사용자 이미지"
                            className={styles.Avatar}
                        />
                        <div className={styles.settingsToggle}>
                            <button onClick={() => setShowSettings(!showSettings)}>개인정보 수정</button>
                        </div>
                        <div className={styles.userinfo}>
                            <div className={styles.inforow}>
                                <div className={styles.infocol}>
                                    <p>
                                        <b>닉네임</b>
                                    </p>
                                    <p>{user.nickname}</p>
                                </div>
                                <div className={styles.infocol}>
                                    <p>
                                        <b>등급</b>
                                    </p>
                                    <p>{user.tier}</p>
                                </div>
                                <div className={styles.infocol}>
                                    <p>
                                        <b>해결한 문제</b>
                                    </p>
                                    <p>{user.solved}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.recentproblems}>
                        <h2>최근에 푼 문제</h2>
                        <div className={styles.problemlist}>
                            {recentProblems.map((problem) => (
                                <div key={problem.id} className={styles.problem}>
                                    {problem.title}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {showSettings && (
                    <div className={styles.settings}>
                        <h2>사용자 설정</h2>
                        <div className={styles.settingitem}>
                            <label>닉네임 변경</label>
                            <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} />
                            <button onClick={handleNicknameChange}>변경</button>
                        </div>
                        <div className={styles.settingitem}>
                            <label>비밀번호 변경</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <button onClick={handlePasswordChange}>변경</button>
                        </div>
                        <div className={styles.settingitem}>
                            <button onClick={handleDeleteAccount} className={styles.deleteaccount}>
                                회원 탈퇴
                            </button>
                        </div>
                        <div className={styles.closeSettings}>
                            <button onClick={() => setShowSettings(false)}>ꕕ</button>
                        </div>
                    </div>
                )}
                <div className={styles.activityhistory}>
                    <h2>문제 푼 히스토리</h2>
                    <ProblemHistoryChart historyData={hardcodedHistoryData} />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Mypage

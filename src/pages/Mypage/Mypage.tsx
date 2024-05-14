import React from 'react'
import { useRecoilValue } from 'recoil'
import { loggedInState, userState } from '../../recoil/state/loggedInState'
import Header from '../../Layout/Header/Header'
import Footer from '../../Layout/Footer/Footer'
import { Link } from 'react-router-dom'
import styles from './Mypage.module.scss'

const Mypage = () => {
    const isLoggedIn = useRecoilValue(loggedInState)
    const user = useRecoilValue(userState)

    if (!isLoggedIn) {
        return <Link to="/login">로그인</Link>
    }

    return (
        <div>
            <Header />
            <div className={styles.profilepagecontainer}>
                <div className={styles.topsection}>
                    <div className={styles.profilecontainer}>
                        <img src={user.avatar} alt="사용자 이미지" className={styles.Avatar} />
                        <div className={styles.userinfo}>
                            <div className={styles.inforow}>
                                <div className={styles.infocol}>
                                    <p>닉네임</p>
                                    <p>{user.nickname}</p>
                                </div>
                                <div className={styles.infocol}>
                                    <p>등급</p>
                                    <p>{user.tier}</p>
                                </div>
                                <div className={styles.infocol}>
                                    <p>해결한 문제</p>
                                    <p>{user.completedChallenges}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.recentproblems}>
                        <h2>최근에 해결한 문제</h2>
                        <div className={styles.problemlist}></div>
                    </div>
                </div>
                <div className={styles.activityhistory}>
                    <h2>문제 푼 히스토리</h2>
                    <div className={styles.historygraph}></div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Mypage

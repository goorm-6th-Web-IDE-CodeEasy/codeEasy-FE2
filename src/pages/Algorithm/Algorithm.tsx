import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from "recoil";
import { soundState } from '../../recoil/state/soundState';
import styles from './Algorithm.module.scss';
import Footer from '../../Layout/Footer/Footer';
import AlgorithmMainSvg from '../../components/Svg/AlgorithmMainSvg';
import { ThemeState } from '../Theme/ThemeState';
import Header from '../../Layout/Header/Header';
import throttle from 'lodash/throttle';


const Algorithm: React.FC = () => {
    const theme = useRecoilValue(ThemeState);

    const [isVolumeOn] = useRecoilState<boolean>(soundState);
    const [problems, setProblems] = useState([]);
    const [user, setUser] = useState({ nickname: '게스트' }); // 초기값을 기본 사용자 이름 설정

    useEffect(() => {
        // 문제 리스트를 불러오는 API
        fetch('/problemList')
            .then((response) => response.json())
            .then((data) => setProblems(data.problems))
            .catch((error) => console.error('Error fetching problem data: ', error));

        // 사용자 프로필을 불러오는 API
        fetch('/api/user/profile')
            .then((response) => response.json())
            .then((data) => setUser(data.user))
            .catch((error) => console.error('Error fetching user profile: ', error));
    }, []);

    //음성 tts 함수
    const handleTTS = throttle((text: string): void => {
        if (isVolumeOn) {
            const speech = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(speech);
        }
    }, 2000);

    return (
        <div className={`${theme}`}>
        <div className={styles.container}>
            <Header />
            <div className={styles.mainSection}>
                <div className={styles.textContainer}>
                    <h1 className={styles.h1Title}>{user.nickname}님 오늘도 힘차게 시작해볼까요?</h1>
                </div>
                <div className={styles.iconContainer}>
                    <AlgorithmMainSvg />
                </div>
            </div>
            <div className={styles.problemContainer}>
                <div className={styles.problemSection}>
                    {problems.map((problem, index) => (
                        <div key={index} className={styles.problemCard}>
                            <h2>{problem.title}</h2>
                            <p>{problem.content}</p>
                            <p>난이도: {problem.tier}</p>
                            <p>유형: {problem.type}</p>
                            <p>정답률: {problem.successRate}</p>
                            <p>풀이 완료: {problem.done ? '완료' : '미완료'}</p>
                        </div>
                    ))}
                </div>
                <div className={styles.clientSection}>
                    {user && (
                        <div className={styles.userProfile}>
                            <img src={user.avatar} alt="User Avatar" className={styles.userAvatar} />
                            <div>닉네임: {user.nickname}</div>
                            <div>레벨: {user.level}</div>
                            <div>게시물 수: {user.posts}</div>
                            <div>젬 수: {user.gems}</div>
                            <div>완료된 챌린지: {user.completedChallenges}</div>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
        </div>
    );
};

export default Algorithm;

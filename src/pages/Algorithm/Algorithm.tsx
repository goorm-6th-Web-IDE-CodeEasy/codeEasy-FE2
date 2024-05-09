import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { soundState } from '../../recoil/state/soundState';
import styles from './Algorithm.module.scss';
import Footer from '../../Layout/Footer/Footer';
import AlgorithmMainSvg from '../../components/Svg/AlgorithmMainSvg';
import { ThemeState } from '../Theme/ThemeState';
import Header from '../../Layout/Header/Header';
import throttle from 'lodash/throttle';
import axios from 'axios';

const Algorithm: React.FC = () => {
    const theme = useRecoilValue(ThemeState);

    const [isVolumeOn] = useRecoilState<boolean>(soundState);
    const [problems, setProblems] = useState([]);
    const [user, setUser] = useState({ nickname: '게스트' }); // 초기값을 기본 사용자 이름 설정
    const [randomProblem, setRandomProblem] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 문제 리스트를 불러오는 API
                const responseProblems = await axios.get('/problemList');
                setProblems(responseProblems.data.problems);

                // 문제리스트 페치되었을때, 랜덤한 문제 불러오기
                if (responseProblems.data.problems.length > 0) {
                    const randomIndex = Math.floor(Math.random() * responseProblems.data.problems.length);
                    setRandomProblem(responseProblems.data.problems[randomIndex]);
                }

                // 사용자 프로필을 불러오는 API
                const responseUser = await axios.get('/api/user/profile');
                setUser(responseUser.data.user);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
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
                        <h1 className={styles.h1Title}>
                            반갑습니다, {user.nickname}님<br></br>
                            오늘도 힘차게 시작해볼까요?
                        </h1>
                        <div>
                            <button className={styles.btnAlgorithm}>문제 풀어보기</button>
                        </div>
                    </div>
                    <div className={styles.iconContainer}>
                        <AlgorithmMainSvg />
                    </div>
                </div>
                <div className={styles.problemContainer}>
                    <div className={styles.problemSection}>
                        {problems.map((problem, index) => (
                            <div key={index} className={styles.problemCard}>
                                <h3>{problem.title}</h3>
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
                            <>
                                <div className={styles.clientAvatar}>
                                    <img src={user.avatar} alt="User Avatar" className={styles.userAvatar} />
                                </div>
                                <div className={styles.userProfile}>
                                    <div>닉네임: {user.nickname}</div>
                                    <div>레벨: {user.level}</div>
                                    <div>게시물 수: {user.posts}</div>
                                    <div>젬 수: {user.gems}</div>
                                    <div>완료된 챌린지: {user.completedChallenges}</div>
                                </div>
                                {randomProblem && (
                                    <div className={styles.todayAlgorithm}>
                                        <p className={styles.title}>{user.nickname}님을 위한 오늘의 추천 알고리즘</p>
                                        <div>{randomProblem.title}</div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>

                <Footer />
            </div>
        </div>
    );
};

export default Algorithm;

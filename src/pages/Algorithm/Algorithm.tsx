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
    const [user, setUser] = useState({ nickname: '게스트' }); // 초기값 기본 사용자 이름 게스트로 설정
    const [randomProblem, setRandomProblem] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const problemsPerPage = 5; //문제 페이지네이션

    // 페이지 계산
    const indexOfLastProblem = currentPage * problemsPerPage;
    const indexOfFirstProblem = indexOfLastProblem - problemsPerPage;
    const currentProblems = problems.slice(indexOfFirstProblem, indexOfLastProblem);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                        <AlgorithmMainSvg className={styles.algorithmSvg} />
                    </div>
                </div>
                <div className={styles.problemContainer}>
                    <div className={styles.problemSection}>
                        <table className={styles.table}>
                            <thead>
                                <tr className={styles.tr}>
                                    <th className={styles.th}>완료 여부</th>
                                    <th className={styles.th}>문제 제목</th>
                                    <th className={styles.th}>티어</th>
                                    <th className={styles.th}>정답률</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentProblems.map((problem, index) => (
                                    <tr key={index} className={styles.tr}>
                                        <td className={styles.td}>{problem.done ? '☑' : ''}</td>
                                        <td className={styles.td}>
                                            <div className={styles.algorithmType}>{problem.algorithm}</div>
                                            <div>{problem.title}</div>
                                        </td>
                                        <td className={styles.td}>{problem.tier}</td>
                                        <td className={styles.td}>{problem.rate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className={styles.pagination}>
                            {[...Array(Math.ceil(problems.length / problemsPerPage)).keys()].map((number) => (
                                <button key={number + 1} onClick={() => paginate(number + 1)}>
                                    {number + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className={styles.clientSection}>
                        {user && (
                            <>
                                <div className={styles.userInfoSection}>
                                    <div className={styles.clientAvatar}>
                                        <img src={user.avatar} alt="User Avatar" className={styles.userAvatar} />
                                    </div>
                                    <div className={styles.userProfile}>
                                        <div>{user.nickname}</div>
                                        <div className={styles.userInfo}>
                                            <div>티어: {user.tier}</div>
                                            <div>푼 문제 수: {user.doneProblem}</div>
                                        </div>
                                    </div>
                                </div>

                                {randomProblem && (
                                    <div className={styles.todayAlgorithm}>
                                        <p className={styles.title}>
                                            {user.nickname}님을 위한 <br></br><span>오늘의 추천 알고리즘</span>
                                        </p>
                                        <h3>{randomProblem.algorithm}</h3>
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

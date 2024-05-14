import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { soundState } from '../../recoil/state/soundState';
import { loggedInState, userState } from '../../recoil/state/loggedInState';
import styles from './Algorithm.module.scss';
import Footer from '../../Layout/Footer/Footer';
import AlgorithmMainSvg from '../../components/Svg/AlgorithmMainSvg';
import { ThemeState } from '../Theme/ThemeState';
import Header from '../../Layout/Header/Header';
import throttle from 'lodash/throttle';
import axios from 'axios';
import SkeletonLoader from '../../components/SkeletonLoader/SkeletonLoader';

interface User {
    nickname: string;
    tier: string;
    doneProblem: number;
    avatar: string;
}

interface Problem {
    title: string;
    tier: string;
    algorithm: string;
    done: boolean;
    rate: string;
}

interface Filter {
    tier: string;
    algorithm: string;
    done: string;
}

const Algorithm: React.FC = () => {
    const theme = useRecoilValue(ThemeState);
    const isLoggedIn = useRecoilValue(loggedInState);
    const user = useRecoilValue(userState);
    const [isVolumeOn] = useRecoilState<boolean>(soundState);
    const [loading, setLoading] = useState(true);
    const [problems, setProblems] = useState<Problem[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState<Filter>({ tier: '', algorithm: '', done: '' });
    const [randomProblem, setRandomProblem] = useState<Problem | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchProblems = async () => {
            setLoading(true);
            try {
                const headers = isLoggedIn ? { 'X-User-ID': user?.id.toString() } : {};
                const responseProblems = await axios.get<{ problems: Problem[] }>('/api/problems', { headers });
                setProblems(responseProblems.data?.problems ?? []);
                const responseUser = await axios.get<{ user: User }>('/api/user/profile');
                if (responseProblems.data?.problems?.length > 0) {
                    const randomIndex = Math.floor(Math.random() * responseProblems.data.problems.length);
                    setRandomProblem(responseProblems.data.problems[randomIndex]);
                }
            } catch (error) {
                console.error('Error fetching problems:', error);
            }
            setLoading(false);
        };
        fetchProblems();
    }, [isLoggedIn, user?.id]);

    const filteredProblems = useMemo(() => {
        return problems.filter(
            (problem) =>
                problem.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (!filter.tier || problem.tier.startsWith(filter.tier)) &&
                (!filter.algorithm || problem.algorithm === filter.algorithm) &&
                (!filter.done || problem.done.toString() === filter.done)
        );
    }, [searchTerm, filter, problems]);

    const handleTTS = throttle((text: string) => {
        if (isVolumeOn) {
            const speech = new SpeechSynthesisUtterance(text);
            window.speechSynthesis?.speak(speech);
        }
    }, 2000);

    const problemsPerPage = 5;
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    const totalPages = Math.ceil(filteredProblems.length / problemsPerPage);

    return (
        <div className={`${theme}`}>
            <div className={styles.container}>
                <Header />
                <div className={styles.mainSection}>
                    <div className={styles.textContainer}>
                        <h1 className={styles.h1Title}>
<<<<<<< HEAD
                            반갑습니다, {user?.nickname}님<br></br>오늘도 힘차게 시작해볼까요?
=======
                            반갑습니다, {isLoggedIn && user ? user.nickname : '게스트'}님<br></br>오늘도 힘차게
                            시작해볼까요?
>>>>>>> ca527e746ee669aebcd309fb74b5a18ff15f1b9b
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
                    {loading ? (
                        <SkeletonLoader />
                    ) : (
                        <div className={styles.problemSection}>
                            <div className={styles.searchContainer}>
                                <input
                                    type="text"
                                    placeholder="문제 검색하기"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className={styles.searchInput}
                                />
                                <div className={styles.filterContainer}>
                                    <select
                                        onChange={(e) => setFilter({ ...filter, done: e.target.value })}
                                        className={styles.filterSelect}
                                    >
                                        <option value="">상태</option>
                                        <option value="true">푼 문제</option>
                                        <option value="false">안 푼 문제</option>
                                    </select>
                                    <select
                                        onChange={(e) => setFilter({ ...filter, algorithm: e.target.value })}
                                        className={styles.filterSelect}
                                    >
                                        <option value="">알고리즘 유형</option>
                                        <option value="정렬">정렬</option>
                                        <option value="구현">구현</option>
                                        <option value="자료구조">자료구조</option>
                                        <option value="그리디 알고리즘">그리디 알고리즘</option>
                                        <option value="다이나믹 프로그래밍">다이나믹 프로그래밍</option>
                                        <option value="너비 우선 탐색">너비 우선 탐색</option>
                                    </select>
                                    <select
                                        onChange={(e) => setFilter({ ...filter, tier: e.target.value })}
                                        className={styles.filterSelect}
                                    >
                                        <option value="">티어</option>
                                        <option value="브론즈">브론즈</option>
                                        <option value="실버">실버</option>
                                        <option value="골드">골드</option>
                                        <option value="플래티넘">플래티넘</option>
                                        <option value="다이아">다이아</option>
                                    </select>
                                </div>
                            </div>
                            <table className={styles.table}>
                                <thead>
                                    <tr className={styles.tr}>
                                        <th className={styles.th}>완료 여부</th>
                                        <th className={styles.th}>문제</th>
                                        <th className={styles.th}>난이도</th>
                                        <th className={styles.th}>정답률</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredProblems
                                        .slice((currentPage - 1) * problemsPerPage, currentPage * problemsPerPage)
                                        .map((problem, index) => (
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
                                {[...Array(totalPages).keys()].map((number) => (
                                    <button
                                        key={number + 1}
                                        onClick={() => paginate(number + 1)}
                                        className={styles.pageButton}
                                    >
                                        {number + 1}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
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
                                            {user.nickname}님을 위한 <br></br>
                                            <span>오늘의 추천 알고리즘</span>
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

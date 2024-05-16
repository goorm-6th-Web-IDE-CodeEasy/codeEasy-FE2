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
import { Tooltip } from 'react-tooltip';
import { FaSortDown, FaSortUp } from 'react-icons/fa';

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

const tierOrder: { [key: string]: number } = {
    브론즈: 1,
    실버: 2,
    골드: 3,
    플래티넘: 4,
    다이아: 5,
};

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
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [sortKey, setSortKey] = useState<keyof Problem | null>(null);


    useEffect(() => {
        const fetchProblems = async () => {
            setLoading(true);
            try {
                const headers = isLoggedIn ? { 'X-User-ID': user?.id.toString() } : {};
                let query = '/api/problems?';
                if (filter.tier) query += `tier=${filter.tier}&`;
                if (filter.algorithm) query += `algorithm=${filter.algorithm}&`;
                if (filter.done) query += `done=${filter.done}&`;

                const responseProblems = await axios.get<{ problems: Problem[] }>(query, { headers });
                setProblems(responseProblems.data?.problems ?? []);
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
    }, [isLoggedIn, user?.id, filter]);

    const filteredProblems = useMemo(() => {
        let sortedProblems = problems.filter(
            (problem) =>
                problem.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (!filter.tier || problem.tier.startsWith(filter.tier)) &&
                (!filter.algorithm || problem.algorithm === filter.algorithm) &&
                (!filter.done || problem.done.toString() === filter.done)
        );

        if (sortKey) {
            sortedProblems = sortedProblems.sort((a, b) => {
                if (sortKey === 'rate') {
                    const rateA = parseFloat(a.rate);
                    const rateB = parseFloat(b.rate);
                    if (sortOrder === 'asc') {
                        return rateA - rateB;
                    } else {
                        return rateB - rateA;
                    }
                } else if (sortKey === 'tier') {
                    const tierA = tierOrder[a.tier];
                    const tierB = tierOrder[b.tier];
                    if (sortOrder === 'asc') {
                        return tierA - tierB;
                    } else {
                        return tierB - tierA;
                    }
                }
                return 0;
            });
        }

        return sortedProblems;
    }, [searchTerm, filter, problems, sortKey, sortOrder]);

    const handleSort = (key: keyof Problem) => {
        setSortKey(key);
        setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    };

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
                            반갑습니다, {isLoggedIn && user ? user.nickname : '게스트'}님<br></br>오늘도 힘차게
                            시작해볼까요?
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
                                        value={filter.done}
                                        onChange={(e) => setFilter({ ...filter, done: e.target.value })}
                                        className={styles.filterSelect}
                                        disabled={!isLoggedIn}
                                        data-tooltip-id="my-tooltip-styles"
                                        data-tooltip-content={!isLoggedIn ? '로그인이 필요합니다' : ''}
                                    >
                                        <option value="">상태</option>
                                        <option value="true">푼 문제</option>
                                        <option value="false">안 푼 문제</option>
                                    </select>
                                    <Tooltip id="my-tooltip-styles" className={styles.tooltip} />

                                    <select
                                        value={filter.algorithm}
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
                                        <option value="백트래킹">백트래킹</option>
                                    </select>
                                    <select
                                        value={filter.tier}
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
                                        <th className={styles.th}>
                                            난이도
                                            <button onClick={() => handleSort('tier')} className={styles.sortButton}>
                                                <span className={styles.sortIcon}>
                                                    {sortKey === 'tier' && sortOrder === 'asc' ? (
                                                        <FaSortUp />
                                                    ) : (
                                                        <FaSortDown />
                                                    )}
                                                </span>
                                            </button>
                                        </th>
                                        <th className={styles.th}>
                                            정답률
                                            <button onClick={() => handleSort('rate')} className={styles.sortButton}>
                                                <span className={styles.sortIcon}>
                                                    {sortKey === 'rate' && sortOrder === 'asc' ? (
                                                        <FaSortUp />
                                                    ) : (
                                                        <FaSortDown />
                                                    )}
                                                </span>
                                            </button>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredProblems
                                        .slice((currentPage - 1) * problemsPerPage, currentPage * problemsPerPage)
                                        .map((problem, problemID) => (
                                            <tr key={problemID} className={styles.tr}>
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
                        {isLoggedIn && user ? (
                            <>
                                <div className={styles.userInfoSection}>
                                    <div className={styles.clientAvatar}>
                                        <img src={user.avatar} alt="User Avatar" className={styles.userAvatar} />
                                    </div>
                                    <div className={styles.userProfile}>
                                        <div>{user.nickname}</div>
                                        <div className={styles.userInfo}>
                                            <div>티어: {user.tier}</div>
                                            <div>푼 문제 수: {user.solvedproblems}</div>
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
                        ) : (
                            <div className={styles.todayAlgorithm}>
                                <p className={styles.title}>
                                    게스트님을 위한 <br></br>
                                    <span>오늘의 추천 알고리즘</span>
                                </p>
                                <Link to="/login">
                                    <button className={styles.btnAlgorithm}>로그인 하기</button>
                                </Link>
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

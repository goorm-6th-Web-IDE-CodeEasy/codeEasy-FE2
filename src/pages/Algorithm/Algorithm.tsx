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
import api from '../../components/Api/Api'; // axios 인스턴스 사용
import SkeletonLoader from '../../components/SkeletonLoader/SkeletonLoader';
import { Tooltip } from 'react-tooltip';
import { FaSortDown, FaSortUp } from 'react-icons/fa';

interface User {
    id: number;
    nickname: string;
    tier: string;
    avatar: string;
    solvedproblems: number;
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
    BRONZE: 1,
    SILVER: 2,
    GOLD: 3,
    PLATINUM: 4,
    DIAMOND: 5,
};

const Algorithm: React.FC = () => {
    const theme = useRecoilValue(ThemeState);
    const isLoggedIn = useRecoilValue(loggedInState);
    const user = useRecoilValue(userState) as User;
    const [isVolumeOn] = useRecoilState(soundState);
    const [loading, setLoading] = useState<boolean>(true);
    const [problems, setProblems] = useState<Problem[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filter, setFilter] = useState<Filter>({ tier: '', algorithm: '', done: '' });
    const [randomProblem, setRandomProblem] = useState<Problem | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [sortKey, setSortKey] = useState<keyof Problem | null>(null);

    useEffect(() => {
        const fetchProblems = async () => {
            setLoading(true);
            try {
                const headers = isLoggedIn ? { 'X-User-ID': user?.id.toString() } : {};
                let query = '/problemlist';
                const params = new URLSearchParams();
                if (filter.tier) params.append('tier', filter.tier);
                if (filter.algorithm) params.append('algorithm', filter.algorithm);
                if (filter.done) params.append('done', filter.done);

                if (params.toString()) query += `?${params.toString()}`;

                console.log(`Fetching problems with query: ${query}`);

                const response = await api.get<{ problems: Problem[] }>(query, { headers });
                const responseProblems = response.data ?? [];

                if (responseProblems.length === 0) {
                    throw new Error('No problems found');
                }

                setProblems(responseProblems);
                const randomIndex = Math.floor(Math.random() * responseProblems.length);
                setRandomProblem(responseProblems[randomIndex]);
            } catch (error) {
                console.error('Error fetching problems:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProblems();
    }, [isLoggedIn, user?.id, filter]);

    const filteredProblems = useMemo(() => {
        if (!problems) return []; // problems가 undefined인 경우 빈 배열
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
                    return sortOrder === 'asc' ? rateA - rateB : rateB - rateA;
                } else if (sortKey === 'tier') {
                    const tierA = tierOrder[a.tier];
                    const tierB = tierOrder[b.tier];
                    return sortOrder === 'asc' ? tierA - tierB : tierB - tierA;
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
    }, 2500);

    const problemsPerPage = 5;
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    const totalPages = Math.ceil(filteredProblems.length / problemsPerPage);

    const handleAlgorithmChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = event.target.value;
        setFilter({ ...filter, algorithm: selectedOption });
        handleTTS(event.target.options[event.target.selectedIndex].text);
    };

    const handleTierChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = event.target.value;
        setFilter({ ...filter, tier: selectedOption });
        handleTTS(event.target.options[event.target.selectedIndex].text);
    };

    return (
        <div className={`${theme}`}>
            <div className={styles.container}>
                <Header />
                <div className={styles.mainSection}>
                    <div className={styles.textContainer}>
                        <h1 className={styles.h1Title}>
                            반갑습니다, {isLoggedIn && user ? user.nickname : '게스트'}님<br />
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
                    {loading ? (
                        <SkeletonLoader />
                    ) : (
                        <div className={styles.problemSection}>
                            <div className={styles.searchContainer}>
                                <input
                                    onMouseEnter={() => handleTTS('문제 검색하기')}
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
                                        onChange={handleAlgorithmChange}
                                        className={styles.filterSelect}
                                    >
                                        <option value="">알고리즘 유형</option>
                                        <option value="DFS">깊이 우선 탐색</option>
                                        <option value="BFS">너비 우선 탐색</option>
                                        <option value="GREEDY">그리디 알고리즘</option>
                                        <option value="DYNAMIC_GRAMMING">동적 계획법</option>
                                        <option value="BACKTRACKING">백트래킹</option>
                                        <option value="STRING">문자열</option>
                                        <option value="SORT">정렬</option>
                                        <option value="IMPLEMENTATION">구현</option>
                                        <option value="DATA_STRUCTURE">자료구조</option>
                                    </select>
                                    <select
                                        value={filter.tier}
                                        onChange={handleTierChange}
                                        className={styles.filterSelect}
                                    >
                                        <option value="">티어</option>
                                        <option value="BRONZE">브론즈</option>
                                        <option value="SILVER">실버</option>
                                        <option value="GOLD">골드</option>
                                        <option value="PLATINUM">플래티넘</option>
                                        <option value="DIAMOND">다이아</option>
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
                                                {sortKey === 'tier' && sortOrder === 'asc' ? (
                                                    <FaSortUp />
                                                ) : (
                                                    <FaSortDown />
                                                )}
                                            </button>
                                        </th>
                                        <th className={styles.th}>
                                            정답률
                                            <button onClick={() => handleSort('rate')} className={styles.sortButton}>
                                                {sortKey === 'rate' && sortOrder === 'asc' ? (
                                                    <FaSortUp />
                                                ) : (
                                                    <FaSortDown />
                                                )}
                                            </button>
                                        </th>
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
                                            {user.nickname}님을 위한 <br />
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
                                    게스트님을 위한 <br />
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

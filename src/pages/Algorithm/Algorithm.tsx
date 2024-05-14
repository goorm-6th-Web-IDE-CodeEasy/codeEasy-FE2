import React, { useEffect, useState, useMemo } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { soundState } from '../../recoil/state/soundState'
import styles from './Algorithm.module.scss'
import Footer from '../../Layout/Footer/Footer'
import AlgorithmMainSvg from '../../components/Svg/AlgorithmMainSvg'
import { ThemeState } from '../Theme/ThemeState'
import Header from '../../Layout/Header/Header'
import throttle from 'lodash/throttle'
import SkeletonLoader from '../../components/SkeletonLoader/SkeletonLoader'
import api from '../../components/Api/Api'
import { loggedInState, userState } from '../../recoil/state/loggedInState'
import { Link } from 'react-router-dom'

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
<<<<<<< HEAD
    const theme = useRecoilValue<string>(ThemeState);
    const isLoggedIn = useRecoilValue<boolean>(loggedInState);
    const user = useRecoilValue<User>(userState);
    const [isVolumeOn] = useRecoilState<boolean>(soundState);
    const [loading, setLoading] = useState<boolean>(true);
    const [problems, setProblems] = useState<Problem[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filter, setFilter] = useState<Filter>({ tier: '', algorithm: '', done: '' });
    const [randomProblem, setRandomProblem] = useState<Problem | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
=======
    const theme = useRecoilValue(ThemeState)
    const isLoggedIn = useRecoilValue(loggedInState) //로그인여부
    const user = useRecoilValue(userState) //로그인여부에 따른 사용자정보
    const [isVolumeOn] = useRecoilState<boolean>(soundState)
    const [loading, setLoading] = useState(true)
    const [problems, setProblems] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [filter, setFilter] = useState({ tier: '', algorithm: '', done: '' })
    const [randomProblem, setRandomProblem] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
>>>>>>> dev

    useEffect(() => {
        const fetchProblems = async () => {
            setLoading(true)
            try {
<<<<<<< HEAD
                const headers = isLoggedIn ? { 'X-User-ID': user?.id.toString() } : {};
                const responseProblems = await axios.get<{ problems: Problem[] }>('/api/problems', { headers });
                setProblems(responseProblems.data?.problems ?? []);
                const responseUser = await axios.get<{ user: User }>('/api/user/profile');
                setUser(responseUser.data?.user);
                if (responseProblems.data?.problems?.length > 0) {
                    const randomIndex = Math.floor(Math.random() * responseProblems.data.problems.length);
                    setRandomProblem(responseProblems.data.problems[randomIndex]);
=======
                const headers = user && isLoggedIn ? { 'X-User-ID': user.id } : {} // (msw용테스트)로그인한 경우 ID를 헤더에 추가
                const response = await api.get('/api/problems', { headers })
                setProblems(response.data.problems)
                if (response.data.problems.length > 0) {
                    const randomIndex = Math.floor(Math.random() * response.data.problems.length)
                    setRandomProblem(response.data.problems[randomIndex])
>>>>>>> dev
                }
            } catch (error) {
                console.error('Error fetching problems:', error)
            }
<<<<<<< HEAD
            setLoading(false);
        };
        fetchData();
    }, [isLoggedIn, user?.id]);
=======
            setLoading(false)
        }

        fetchProblems()
    }, [user, isLoggedIn])
>>>>>>> dev

    const filteredProblems = useMemo(() => {
        return problems.filter(
            (problem) =>
                problem.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (!filter.tier || problem.tier.startsWith(filter.tier)) &&
                (!filter.algorithm || problem.algorithm === filter.algorithm) &&
                (!filter.done || problem.done.toString() === filter.done),
        )
    }, [searchTerm, filter, problems])

    const handleTTS = throttle((text: string) => {
        if (isVolumeOn) {
<<<<<<< HEAD
            const speech = new SpeechSynthesisUtterance(text);
            window.speechSynthesis?.speak(speech);
=======
            const speech = new SpeechSynthesisUtterance(text)
            window.speechSynthesis.speak(speech)
>>>>>>> dev
        }
    }, 2000)

<<<<<<< HEAD
    const problemsPerPage = 5;
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    const totalPages = Math.ceil(filteredProblems.length / problemsPerPage);
=======
    const problemsPerPage = 5
    const paginate = (pageNumber) => setCurrentPage(pageNumber)
    const totalPages = Math.ceil(filteredProblems.length / problemsPerPage)
>>>>>>> dev

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
>>>>>>> dev
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
                            <small>
                                이미 회원이세요?<Link to="/login">로그인</Link>
                            </small>
                        )}
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default Algorithm

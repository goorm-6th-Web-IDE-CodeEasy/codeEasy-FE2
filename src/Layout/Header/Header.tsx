import React, { useEffect, startTransition } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { soundState } from '../../recoil/state/soundState';
import { scaleState } from '../../recoil/state/scaleState';
import { fetchUserState, loggedInState, userState } from '../../recoil/state/loggedInState';
import styles from './Header.module.scss';
import Logo from '../../components/Svg/Logo';
import { HeaderSoundOnBtn } from '../../components/Svg/HeaderSoundOnBtn';
import { HeaderSoundOffBtn } from '../../components/Svg/HeaderSoundOffBtn';
import { HeaderPlusBtn } from '../../components/Svg/HeaderPlusBtn';
import { HeaderMinusBtn } from '../../components/Svg/HeaderMinusBtn';
import { HeaderClientBtn } from '../../components/Svg/HeaderClientBtn';
import throttle from 'lodash/throttle';

const Header: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(loggedInState); // 로그인 상태 여부
    const [user, setUser] = useRecoilState(userState); // 로그인 시 정보
    const fetchedUser = useRecoilValue(fetchUserState); // 초기화 시 사용자 정보 가져오기
    const [isVolumeOn, setVolumeOn] = useRecoilState<boolean>(soundState); // useRecoilState 사용하여 전역 상태 관리
    const [scale, setScale] = useRecoilState<number>(scaleState); // 확대/축소 상태
    const navigate = useNavigate();

    useEffect(() => {
        startTransition(() => {
            if (isLoggedIn) {
                setUser(fetchedUser);
            } else {
                setUser(null);
            }
        });
    }, [isLoggedIn, fetchedUser, setUser]);

    const handleLogout = () => {
        // 로그아웃 상태
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem('authToken');
        navigate('/login'); // 로그아웃 후 로그인 페이지로 이동
    };

    const increaseScale = (): void => {
        setScale((scale) => scale * 1.1); // 10%씩 확대
    };

    const decreaseScale = (): void => {
        setScale((scale) => scale * 0.9); // 10%씩 축소
    };

    const toggleVolume = (): void => {
        setVolumeOn(!isVolumeOn);
    };

    const handleTTS = throttle((text: string): void => {
        if (isVolumeOn) {
            const speech = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(speech);
        }
    }, 2000);

    return (
        <>
            <header className={styles.header}>
                <nav className={styles.navContainer}>
                    <div className={styles.topSection}>
                        <Link to="/" className={styles.logo}>
                            <Logo />
                        </Link>
                        <div className={styles.icons}>
                            <button
                                className={styles.volumeUpIcon}
                                onMouseEnter={() => handleTTS('소리 버튼')}
                                onClick={toggleVolume}
                            >
                                {isVolumeOn ? <HeaderSoundOnBtn /> : <HeaderSoundOffBtn />}
                            </button>
                            <button
                                onMouseEnter={() => handleTTS('화면 크게하기')}
                                className={styles.plusIcon}
                                onClick={increaseScale}
                            >
                                <HeaderPlusBtn />
                            </button>
                            <button
                                onMouseEnter={() => handleTTS('화면 작게하기')}
                                className={styles.minusIcon}
                                onClick={decreaseScale}
                            >
                                <HeaderMinusBtn />
                            </button>
                            <button onMouseEnter={() => handleTTS('사용자 정보')} className={styles.clientIcon}>
                                {isLoggedIn && user ? (
                                    <img
                                        src={user?.imageUrl} // 옵셔널 체이닝 사용
                                        style={{
                                            width: '2.1875rem',
                                            height: '2.1875rem',
                                            objectFit: 'cover',
                                            borderRadius: '50%',
                                        }}
                                        className={styles.avatar}
                                    />
                                ) : (
                                    <HeaderClientBtn />
                                )}
                            </button>
                        </div>
                    </div>

                    <div className={styles.menu}>
                        <div>
                            <Link to="/" onMouseEnter={() => handleTTS('홈')} className={styles.menuItem}>
                                홈
                            </Link>
                            <Link
                                to="/algorithm"
                                onMouseEnter={() => handleTTS('알고리즘')}
                                className={styles.menuItem}
                            >
                                알고리즘
                            </Link>
                            <Link
                                to="/theme"
                                onMouseEnter={() => handleTTS('테마 선택하기')}
                                className={styles.menuItem}
                            >
                                테마
                            </Link>
                            <Link to="/FAQ" onMouseEnter={() => handleTTS('도움말')} className={styles.menuItem}>
                                FAQ/도움말
                            </Link>
                        </div>
                        <div className={styles.userSection}>
                            <p className={styles.greeting}>
                                안녕하세요, {isLoggedIn && user ? user.nickname : '게스트'}님
                            </p>
                            {isLoggedIn && user ? (
                                <>
                                    <Link
                                        to="/mypage"
                                        onMouseEnter={() => handleTTS('마이 페이지')}
                                        className={styles.loginLink}
                                    >
                                        마이 페이지
                                    </Link>
                                    <Link
                                        to="/"
                                        onClick={handleLogout}
                                        onMouseEnter={() => handleTTS('로그아웃')}
                                        className={styles.logout}
                                    >
                                        로그아웃
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        onMouseEnter={() => handleTTS('로그인')}
                                        className={styles.loginLink}
                                    >
                                        로그인
                                    </Link>
                                    <Link
                                        to="/register"
                                        onMouseEnter={() => handleTTS('회원가입')}
                                        className={styles.registerLink}
                                    >
                                        회원가입
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
};

export default Header;

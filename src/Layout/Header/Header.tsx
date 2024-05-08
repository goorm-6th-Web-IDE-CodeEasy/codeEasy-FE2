import { Link } from 'react-router-dom';
import React from 'react';
import { useRecoilState } from 'recoil';
import { soundState } from '../../recoil/state/soundState';
import { scaleState } from '../../recoil/state/scaleState';
import styles from './Header.module.scss'; // 스타일 시트 임포트
import Logo from '../../components/Svg/Logo';
import { HeaderSoundOnBtn } from '../../components/Svg/HeaderSoundOnBtn';
import { HeaderSoundOffBtn } from '../../components/Svg/HeaderSoundOffBtn';
import { HeaderPlusBtn } from '../../components/Svg/HeaderPlusBtn';
import { HeaderMinusBtn } from '../../components/Svg/HeaderMinusBtn';
import { HeaderClientBtn } from '../../components/Svg/HeaderClientBtn';
import throttle from 'lodash/throttle';

const Header: React.FC = () => {
    const [isVolumeOn, setVolumeOn] = useRecoilState<boolean>(soundState); // useRecoilState 사용하여 전역 상태 관리
    const [scale, setScale] = useRecoilState<number>(scaleState); // 확대/축소 상태

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
    }, 1500);

    return (
        <>
            <header className={styles.header}>
                <nav className={styles.navContainer}>
                    <div className={styles.topSection}>
                        <Link to="/" className={styles.logo}>
                            <div>
                                <Logo />
                            </div>
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
                                <HeaderClientBtn />
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
                        </div>
                        <div className={styles.userSection}>
                            <p className={styles.greeting}>안녕하세요, 게스트님</p>
                            <Link to="/login" onMouseEnter={() => handleTTS('로그인')} className={styles.loginLink}>
                                로그인
                            </Link>
                            <Link
                                to="/register"
                                onMouseEnter={() => handleTTS('회원가입')}
                                className={styles.registerLink}
                            >
                                회원가입
                            </Link>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
};

export default Header;

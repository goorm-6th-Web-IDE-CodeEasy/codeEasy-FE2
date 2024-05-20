import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { soundState } from '../../recoil/state/soundState';
import styles from './Main.module.scss';
import { HomeCodingTestBtn } from '../../components/Svg/HomeCodingTestBtn';
import { HomeThemeBtn } from '../../components/Svg/HomeThemeBtn';
import { HomeChatBtn } from '../../components/Svg/HomeChatBtn';
import { HomeFAQBtn } from '../../components/Svg/HomeFAQBtn';
import { HomeSoundDrawing } from '../../components/Svg/HomeSoundDrawing';
import Footer from '../../Layout/Footer/Footer';
import Header from '../../Layout/Header/Header';
import throttle from 'lodash/throttle';
import { ThemeState } from '../Theme/ThemeState';
import { useRecoilState, useRecoilValue } from 'recoil';
import AlgorithmMainSvg from '../../components/Svg/AlgorithmMainSvg';
import ChatModal from '../../chat/ChatModal/ChatModal';

const Main: React.FC = () => {
    const theme = useRecoilValue(ThemeState);
    const [isVolumeOn] = useRecoilState<boolean>(soundState);
    const [chatOpen, setChatOpen] = useState(false);

    const handleTTS = throttle((text: string): void => {
        if (isVolumeOn) {
            const speech = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(speech);
        }
    }, 3000);

    const toggleChat = () => setChatOpen((prev) => !prev);

    return (
        <div className={`${theme}`} aria-label="Main section">
            <div className={styles.container}>
                <Header />
                <div className={styles.mainSection1} aria-label="코드이지 사이트 안내 문구" tabIndex={0}>
                    <div className={styles.textContainer} tabIndex={-1}>
                        <h1
                            onClick={() => handleTTS('알고리즘 코드이지와 함께 이제 누구나 쉽게 정복하세요')}
                            className={styles.h1Title}
                            tabIndex={0}
                        >
                            알고리즘
                            <br />
                            <span className={styles.bgMain}>CodeEasy</span>와 함께
                            <br />
                            이제 누구나 쉽게 정복하세요!
                        </h1>
                        <p className={styles.text}>
                            모두가 코딩을 즐길 수 있는 공간, CodeEasy! 저희 플랫폼은 저시력자와 일반인 모두가 사용하기
                            편리한 맞춤형 인터페이스를 제공합니다. 알고리즘 문제 해결이 쉬워지도록 설계된 CodeEasy에서
                            효율적으로 코딩 실력을 향상시키세요.
                        </p>
                    </div>
                    <div
                        className={styles.iconContainer}
                        aria-label="알고리즘, 테마, 채팅, 도움말로 바로가기 버튼"
                        tabIndex={0}
                    >
                        <div className={styles.shortcut1}>
                            <Link
                                to="/algorithm"
                                onMouseEnter={() => handleTTS('알고리즘 코딩 테스트')}
                                aria-label="알고리즘 문제 풀이 페이지로 이동 버튼"
                                tabIndex={0}
                            >
                                <HomeCodingTestBtn />
                            </Link>
                            <Link
                                to="/theme"
                                onMouseEnter={() => handleTTS('테마 설정하기')}
                                className={styles.theme}
                                aria-label="테마 설정 바꾸기"
                                tabIndex={0}
                            >
                                <HomeThemeBtn />
                            </Link>
                        </div>
                        <div className={styles.shortcut2}>
                            <button
                                onClick={toggleChat}
                                onMouseEnter={() => handleTTS('채팅하기')}
                                aria-label="채팅방 접속 버튼"
                                tabIndex={0}
                            >
                                <HomeChatBtn />
                            </button>
                            <ChatModal isOpen={chatOpen} onClose={() => setChatOpen(false)} />
                            <Link
                                to="/faq"
                                onMouseEnter={() => handleTTS('도움말')}
                                className={styles.faq}
                                aria-label="도움말"
                                tabIndex={0}
                            >
                                <HomeFAQBtn />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={styles.mainSection2} aria-label="알고리즘 문제 설명">
                    <div className={styles.iconContainer} aria-label="Algorithm SVG">
                        <div>
                            <Link
                                to="/algorithm"
                                className={styles.toAlgorithm}
                                aria-label="알고리즘 문제 페이지로 이동하기"
                                tabIndex={0}
                            >
                                <AlgorithmMainSvg />
                            </Link>
                        </div>
                    </div>
                    <div className={styles.textContainer}>
                        <h1
                            onClick={() => handleTTS('다양한 난이도의 문제를 코드이지에서 풀어보세요')}
                            className={styles.h1Title}
                        >
                            <span className={styles.bgAlgorithm}>다양한 난이도의 문제</span>를 <br />
                            <span>CodeEasy</span>에서 풀어보세요.
                            <br />
                        </h1>
                        <p className={styles.text}>
                            다양한 난이도의 문제들로 실력을 시험하고 코딩 능력을 키워보세요. 데이터 구조부터 복잡한
                            알고리즘 문제까지, 모두를 위한 문제들이 준비되어 있습니다.
                        </p>
                        <Link to="/algorithm" tabIndex={0}>
                            <button className={styles.btnAlgorithm} aria-label="알고리즘 문제 풀어보기" tabIndex={0}>
                                문제 풀어보기
                            </button>
                        </Link>
                    </div>
                </div>
                <div className={styles.mainSection3} aria-label="음성 기능 활용 안내 문구" tabIndex={0}>
                    <div className={styles.textContainer}>
                        <h1
                            onClick={() => handleTTS('음성 기능을 활용하여 문제를 풀 수 있어요.')}
                            className={styles.h1Title}
                            tabIndex={0}
                        >
                            <span className={styles.bgSound}>음성 기능</span>을 활용하여 <br />
                            문제를 풀 수 있어요.
                            <br />
                        </h1>
                        <p className={styles.text} tabIndex={0}>
                            음성기능을 활용하여, 소리를 통해서 알고리즘 문제를 해결하고 이해할 수 있습니다.
                            CodeEasy에서는 모든 사용자가 효과적으로 학습하고 코딩 능력을 개발할 수 있도록 지원합니다.
                        </p>
                    </div>
                    <div className={styles.iconContainer} aria-label="음성 기능 일러스트레이션">
                        <div>
                            <Link className={styles.toSound}>
                                <HomeSoundDrawing />
                            </Link>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default Main;

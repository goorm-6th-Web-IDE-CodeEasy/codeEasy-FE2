import React from 'react';
import { Link } from 'react-router-dom';
import { soundState } from '../../recoil/state/soundState';
import styles from './Main.module.scss';
import mainAlgorithmImg from '../../assets/Main/메인 문제풀이 이미지.png';
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

const Main: React.FC = () => {
    const theme = useRecoilValue(ThemeState);
    const [isVolumeOn] = useRecoilState<boolean>(soundState);

    const handleTTS = throttle((text: string): void => {
        if (isVolumeOn) {
            const speech = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(speech);
        }
    }, 3000);

    return (
        <div className={`${theme}`}>
            <div className={styles.container}>
                <Header />
                <div className={styles.mainSection1}>
                    <div className={styles.textContainer}>
                        <h1
                            onMouseEnter={() => handleTTS('알고리즘 코드이지와 함께 이제 누구나 쉽게 정복하세요')}
                            className={styles.h1Title}
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
                    <div className={styles.iconContainer}>
                        <div className={styles.shortcut1}>
                            <Link
                                to="/algorithm"
                                onMouseEnter={() => handleTTS('알고리즘 코딩 테스트')}
                            >
                                <HomeCodingTestBtn />
                            </Link>
                            <Link to="/theme" onMouseEnter={() => handleTTS('테마 설정하기')} className={styles.theme}>
                                <HomeThemeBtn />
                            </Link>
                        </div>
                        <div className={styles.shortcut2}>
                            <Link to="/chat" onMouseEnter={() => handleTTS('채팅하기')} className={styles.chat}>
                                <HomeChatBtn />
                            </Link>
                            <Link to="/faq" onMouseEnter={() => handleTTS('도움말')} className={styles.faq}>
                                <HomeFAQBtn />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={styles.mainSection2}>
                    <div className={styles.iconContainer}>
                        <div>
                            <Link to="/algorithm" className={styles.toAlgorithm}>
                                <AlgorithmMainSvg/>
                            </Link>
                        </div>
                    </div>
                    <div className={styles.textContainer}>
                        <h1
                            onMouseEnter={() => handleTTS('다양한 난이도의 문제를 코드이지에서 풀어보세요')}
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
                        <Link>
                            <button className={styles.btnAlgorithm}>문제 풀어보기</button>
                        </Link>
                    </div>
                </div>
                <div className={styles.mainSection3}>
                    <div className={styles.textContainer}>
                        <h1
                            onMouseEnter={() => handleTTS('음성 기능을 활용하여 문제를 풀 수 있어요.')}
                            className={styles.h1Title}
                        >
                            <span className={styles.bgSound}>음성 기능</span>을 활용하여 <br />
                            문제를 풀 수 있어요.
                            <br />
                        </h1>
                        <p className={styles.text}>
                            음성기능을 활용하여, 소리를 통해서 알고리즘 문제를 해결하고 이해할 수 있습니다.
                            CodeEasy에서는 모든 사용자가 효과적으로 학습하고 코딩 능력을 개발할 수 있도록 지원합니다.
                        </p>
                    </div>
                    <div className={styles.iconContainer}>
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

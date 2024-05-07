import React from "react";
import { useRecoilState } from "recoil";
import { soundState } from "../../recoil/state/soundState";
import styles from "./Algorithm.module.scss";
import Footer from "../../Layout/Footer/Footer"
import AlgorithmMainSvg from "../../components/Svg/AlgorithmMainSvg";

const Algorithm: React.FC = () => {
  const [isVolumeOn] = useRecoilState<boolean>(soundState);

  const handleTTS = (text: string): void => {
    if (isVolumeOn) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainSection}>
        <div className={styles.textContainer}>
          <h1
            onMouseEnter={() =>
              handleTTS("알고리즘 코드이지와 함께 이제 누구나 쉽게 정복하세요")
            }
            className={styles.h1Title}
          >
            오늘도 힘차게 시작해볼까요?
          </h1>
        </div>
        <div className={styles.iconContainer}>
          <div>
            <AlgorithmMainSvg />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Algorithm;

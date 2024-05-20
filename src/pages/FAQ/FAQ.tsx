import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { soundState } from '../../recoil/state/soundState';
import throttle from 'lodash/throttle';
import styles from './FAQ.module.scss';
import Footer from '../../Layout/Footer/Footer';
import Header from '../../Layout/Header/Header';

const faqData = [
    {
        question: '음성 지원 기능을 활성화하려면 어떻게 해야 하나요?',
        answer: '음성 지원 기능을 활성화하려면 홈페이지 위의 메뉴 부분에 있는 음성 아이콘을 클릭하여 활성화 할 수 있습니다. 화면의 텍스트에 마우스를 올리면 화면에 표시된 텍스트가 음성으로 읽어집니다.',
    },
    {
        question: '콘텐츠를 확대하려면 어떻게 해야 하나요?',
        answer: '콘텐츠를 확대하려면, 홈페이지 위의 메뉴에 있는 확대 아이콘을 누르면 화면이 확대 됩니다. 혹은 브라우저의 확대 기능을 사용하거나 키보드에서 Ctrl 키와 + 키를 동시에 누르면 화면을 확대할 수 있습니다. 이를 통해 화면의 모든 콘텐츠가 확대되어 보기 쉽게 됩니다.',
    },
    {
        question: '테마를 변경하려면 어떻게 해야 하나요?',
        answer: '테마를 변경하려면 설정 페이지로 이동하여 원하는 테마를 선택합니다. 라이트, 다크, 고대비테마 옵션이 있으며, 선택한 테마에 따라 화면의 색상과 스타일이 변경됩니다.',
    },
];

const FAQ: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const isVolumeOn = useRecoilValue<boolean>(soundState);

    const handleTTS = (text: string): void => {
        if (isVolumeOn) {
            const speech = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(speech);
        }
    };

    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div>
            <Header />
            <div className={styles.faqContainer}>
                <h1>FAQ</h1>
                {faqData.map((item, index) => (
                    <div
                        key={index}
                        className={`${styles.accordion} ${activeIndex === index ? styles.active : ''}`}
                        onClick={() => toggleAccordion(index)}
                    >
                        <h3 onClick={() => handleTTS(item.question)}>{item.question}</h3>
                        <p onClick={() => handleTTS(item.answer)}>{item.answer}</p>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
};

export default FAQ;

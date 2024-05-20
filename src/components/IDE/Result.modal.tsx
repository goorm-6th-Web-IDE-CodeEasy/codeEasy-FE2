import React, { useEffect } from 'react';
import throttle from 'lodash/throttle';
import { soundState } from '../../recoil/state/soundState';
import { useRecoilState, useRecoilValue } from 'recoil';
import styles from './Result.modal.module.scss';
import { ThemeState } from '../../pages/Theme/ThemeState';
interface ResultModalProps {
    isOpen: boolean;
    onClose: () => void;
    content: string;
}
const ResultModal: React.FC<ResultModalProps> = ({ isOpen, onClose, content }) => {
    const [isVolumeOn] = useRecoilState<boolean>(soundState);
    const theme = useRecoilValue(ThemeState);

    const handleTTS = throttle((text: string): void => {
        if (isVolumeOn) {
            const speech = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(speech);
        }
    }, 3000);

    useEffect(() => {
        if (isOpen) {
            handleTTS(content);
        }
    }, [isOpen, content, handleTTS]);

    return (
        <div className={styles[`mode_${theme}`]}>
            <div className={`${styles.modal} ${isOpen ? styles.open : ''}`}>
                <div className={styles.modalOverlay} onClick={onClose}></div>
                <div className={styles.modalContent}>
                    <button className={styles.modalCloseButton} onClick={onClose}>
                        닫기
                    </button>
                    <p>{content}</p>
                </div>
            </div>
        </div>
    );
};

export default ResultModal;

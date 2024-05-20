import React from 'react';
import throttle from 'lodash/throttle';
import { soundState } from '../../recoil/state/soundState';
import { useRecoilState } from 'recoil';
import styles from './Result.modal.module.scss';
interface ResultModalProps {
    isOpen: boolean;
    onClose: () => void;
    content: string;
}
const ResultModal: React.FC<ResultModalProps> = ({ isOpen, onClose, content }) => {
    const [isVolumeOn] = useRecoilState<boolean>(soundState);

    const handleTTS = throttle((text: string): void => {
        if (isVolumeOn) {
            const speech = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(speech);
        }
    }, 3000);

    return (
        <div className={`${styles.modal} ${isOpen ? styles.open : ''}`}>
            <div className={styles.modalOverlay} onClick={onClose}></div>
            <div className={styles.modalContent}>
                <button className={styles.modalCloseButton} onClick={onClose}></button>
                <p onMouseEnter={() => handleTTS(content)}>{content}</p>
            </div>
        </div>
    );
};

export default ResultModal;

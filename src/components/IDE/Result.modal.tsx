import React from 'react';
import throttle from 'lodash/throttle';
import { soundState } from '../../recoil/state/soundState';
import { useRecoilState } from 'recoil';

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
        <div className={`modal ${isOpen ? 'open' : ''}`}>
            <div className="modal-overlay" onClick={onClose}></div>
            <div className="modal-content">
                <button className="modal-close-button" onClick={onClose}></button>
                <p onMouseEnter={() => handleTTS(content)}>{content}</p>
            </div>
        </div>
    );
};

export default ResultModal;

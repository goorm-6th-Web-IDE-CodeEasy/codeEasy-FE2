import React from 'react';

interface ResultModalProps {
    isOpen: boolean;
    onClose: () => void;
    content: string;
}
const ResultModal: React.FC<ResultModalProps> = ({ isOpen, onClose, content }) => {
    return (
        <div className={`modal ${isOpen ? 'open' : ''}`}>
            <div className="modal-overlay" onClick={onClose}></div>
            <div className="modal-content">
                <button className="modal-close-button" onClick={onClose}>
                    닫기
                </button>
                <h2>결과</h2>
                <p>{content}</p>
            </div>
        </div>
    );
};

export default ResultModal;

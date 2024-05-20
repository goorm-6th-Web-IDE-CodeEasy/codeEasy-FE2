import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import styles from './NicknameModal.module.scss';

interface NicknameModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    onSubmit: (nickname: string) => void;
}

const NicknameModal: React.FC<NicknameModalProps> = ({ isOpen, onRequestClose, onSubmit }) => {
    const [nickname, setNickname] = useState('');
    const inputRef = useRef<HTMLInputElement>(null); //ref 생성

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus(); // 모달이 열릴 때 입력 필드에 포커스
        }
    }, [isOpen]);

    const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNickname(e.target.value);
    };

    const handleSubmit = () => {
        if (nickname.trim()) {
            onSubmit(nickname);
        } else {
            alert('닉네임을 입력해 주세요.');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className={styles.nicknameModal}
            overlayClassName={styles.overlay}
        >
            <div className={styles.modalContent}>
                <h2>닉네임을 입력해 주세요</h2>
                <input
                    ref={inputRef} // ref 입력값에
                    type="text"
                    value={nickname}
                    onChange={handleNicknameChange}
                    onKeyDown={handleKeyDown}
                    placeholder="닉네임"
                />
                <button onClick={handleSubmit}>확인</button>
            </div>
        </Modal>
    );
};

export default NicknameModal;

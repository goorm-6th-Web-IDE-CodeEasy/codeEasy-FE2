import React, { useState, useEffect } from 'react';
import styles from './Timer.module.scss';
import { ThemeState } from '../../pages/Theme/ThemeState';
import { useRecoilValue } from 'recoil';

interface TimerProps {
    onTimeUpdate: (time: number) => void;
}

const Timer: React.FC<TimerProps> = ({ onTimeUpdate }) => {
    const [time, setTime] = useState<number>(0);
    const [inputMinutes, setInputMinutes] = useState<string>('');
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [isTimeUp, setIsTimeUp] = useState<boolean>(false);
    const theme = useRecoilValue(ThemeState);

    useEffect(() => {
        if (isRunning && time > 0) {
            const timer = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);

            return () => {
                clearInterval(timer);
            };
        } else if (time === 0 && isRunning) {
            setIsTimeUp(true);
            setIsRunning(false);
        }
    }, [time, isRunning]);

    useEffect(() => {
        onTimeUpdate(time);
    }, [time, onTimeUpdate]);

    const handleStart = () => {
        const parsedTime = parseInt(inputMinutes, 10) * 60;
        if (!isNaN(parsedTime)) {
            setTime(parsedTime);
            setIsRunning(true);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputMinutes(e.target.value);
    };

    const handleCloseModal = () => {
        setIsTimeUp(false);
    };

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return (
        <div className={styles[`mode_${theme}`]}>
            <div className={styles.timerContainer}>
                {!isRunning && (
                    <div className={styles.inputContainer}>
                        <input
                            type="number"
                            value={inputMinutes}
                            onChange={handleChange}
                            placeholder="시간을 입력하세요(분)"
                        />
                        <button onClick={handleStart}>시작</button>
                    </div>
                )}
                {isRunning && (
                    <h2>
                        남은 시간: {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                    </h2>
                )}
                {isTimeUp && (
                    <div className={styles.modal}>
                        <div className={styles.modalContent}>
                            <p>시간이 종료되었습니다.</p>
                            <button onClick={handleCloseModal}>닫기</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Timer;

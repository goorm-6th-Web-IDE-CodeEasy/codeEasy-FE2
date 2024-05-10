import React, { useState, useEffect } from 'react';

interface TimerProps {
    initialTime: number;
    onTimeUpdate: (time: number) => void;
}

const Timer: React.FC<TimerProps> = ({ initialTime, onTimeUpdate }) => {
    const [time, setTime] = useState(initialTime);

    useEffect(() => {
        const timer = setInterval(() => {
            if (time > 0) {
                setTime((prevTime) => prevTime - 1);
            }
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [time]);

    useEffect(() => {
        onTimeUpdate(time);
    }, [time, onTimeUpdate]);
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return (
        <div>
            <h2>
                타이머 이미지 {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </h2>
        </div>
    );
};

export default Timer;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { soundState } from '../../recoil/state/soundState';
import throttle from 'lodash/throttle';
import { useParams } from 'react-router-dom';
const ProblemScript: React.FC = () => {
    const [problem, setProblem] = useState<string>('');
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [isVolumeOn] = useRecoilState<boolean>(soundState);
    const { problemId } = useParams<{ problemId: string }>();
    useEffect(() => {
        const fetchProblem = async () => {
            try {
                const response = await axios.get(`/problem/${problemId}/favorite`);
                setProblem(response.data.description);
            } catch (error) {
                console.error('Error: ', error);
            }
        };

        fetchProblem();
    }, []);

    const handleFavorite = async () => {
        try {
            await axios.put(`/problem/${problemId}/favorite`);
            setIsFavorite((e) => !e);
        } catch (error) {
            console.error(error);
        }
    };
    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: document.title,
                    url: window.location.href,
                });
                console.log('공유가 성공적으로 완료되었습니다.');
            } catch (error) {
                console.error('공유에 실패했습니다:', error);
            }
        } else {
            console.log('Web Share API가 이 브라우저에서 지원되지 않습니다.');
        }
    };
    const handleTTS = throttle((text: string): void => {
        if (isVolumeOn) {
            const speech = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(speech);
        }
    }, 3000);
    return (
        <div>
            <div>
                <h2>문제 설명</h2>
                <button onClick={handleFavorite}>{isFavorite ? '즐겨찾기 해제' : '즐겨찾기 추가'}</button>
                <button onClick={handleShare}>공유</button>
            </div>
            <p onMouseEnter={() => handleTTS(problem)}>{problem}</p>
        </div>
    );
};

export default ProblemScript;

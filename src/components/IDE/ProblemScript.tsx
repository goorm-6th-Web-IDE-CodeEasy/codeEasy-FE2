import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { soundState } from '../../recoil/state/soundState';
import throttle from 'lodash/throttle';
import api from '../Api/Api';

interface ProblemScriptProps {
    problemId: string | undefined;
}

interface ProblemData {
    problemTitle: string;
    problemContent: string;
    problemInputContent: string;
    problemOutputContent: string;
    algorithm: string;
    tier: string;
    timeLimit: number;
    memoryLimit: number;
    basicInputTestCase: string;
    basicOutputTestCase: string;
}

const ProblemScript: React.FC<ProblemScriptProps> = ({ problemId }) => {
    const [problem, setProblem] = useState<ProblemData | null>(null);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [isVolumeOn] = useRecoilState<boolean>(soundState);

    useEffect(() => {
        if (problemId) {
            const fetchProblem = async () => {
                try {
                    const response = await api.get(`/problem/${problemId}`);
                    const {
                        problemTitle,
                        problemContent,
                        problemInputContent,
                        problemOutputContent,
                        algorithm,
                        tier,
                        timeLimit,
                        memoryLimit,
                        basicInputTestCase,
                        basicOutputTestCase,
                    } = response.data;
                    setProblem({
                        problemTitle,
                        problemContent,
                        problemInputContent,
                        problemOutputContent,
                        algorithm,
                        tier,
                        timeLimit,
                        memoryLimit,
                        basicInputTestCase,
                        basicOutputTestCase,
                    });
                } catch (error) {
                    console.error('Error: ', error);
                }
            };

            fetchProblem();
        }
    }, [problemId]);

    const handleFavorite = async () => {
        try {
            await api.post(`/problem/${problemId}/favorite`);
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
            {problem && (
                <>
                    <p onMouseEnter={() => handleTTS(`${problem.problemContent}`)}>{problem.problemContent}</p>
                    <div>
                        <h3>입력</h3>
                        <p>{problem.problemInputContent}</p>
                    </div>
                    <div>
                        <h3>출력</h3>
                        <p>{problem.problemOutputContent}</p>
                    </div>
                    <div>
                        <h3>제약 조건</h3>
                        <p>시간 제한: {problem.timeLimit}ms</p>
                        <p>메모리 제한: {problem.memoryLimit}KB</p>
                    </div>
                    <div>
                        <h3>알고리즘</h3>
                        <p>{problem.algorithm}</p>
                    </div>
                    <div>
                        <h3>난이도</h3>
                        <p>{problem.tier}</p>
                    </div>
                    <div>
                        <h3>예제 입력</h3>
                        <p>{problem.basicInputTestCase}</p>
                    </div>
                    <div>
                        <h3>예제 출력</h3>
                        <p>{problem.basicOutputTestCase}</p>
                    </div>
                </>
            )}
        </div>
    );
};

export default ProblemScript;

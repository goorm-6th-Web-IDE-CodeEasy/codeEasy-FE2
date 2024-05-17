import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProblemScript: React.FC = () => {
    const [problem, setProblem] = useState<string>('');
    const [isFavorite, setIsFavorite] = useState<boolean>(false);

    useEffect(() => {
        const fetchProblem = async () => {
            try {
                const response = await axios.get('/api/problem/problemID');
                setProblem(response.data.description);
            } catch (error) {
                console.error('Error: ', error);
            }
        };

        fetchProblem();
    }, []);

    const handleFavorite = async () => {
        try {
            await axios.put('/problem/{problemId}/favorite');
            setIsFavorite((e) => !e);
        } catch (error) {
            console.error(error);
        }
    };
    const handleShare = () => {};

    return (
        <div>
            <div>
                <h2>문제 설명</h2>
                <button onClick={handleFavorite}>{isFavorite ? '즐겨찾기 해제' : '즐겨찾기 추가'}</button>
                <button onClick={handleShare}>공유</button>
            </div>
            <p>{problem}</p>
        </div>
    );
};

export default ProblemScript;

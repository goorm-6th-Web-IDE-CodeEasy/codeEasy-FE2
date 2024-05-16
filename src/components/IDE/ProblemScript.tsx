import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProblemScript: React.FC = () => {
    const [problem, setProblem] = useState<string>('');

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

    return (
        <div>
            <h2>문제 설명</h2>
            <p>{problem}</p>
        </div>
    );
};

export default ProblemScript;

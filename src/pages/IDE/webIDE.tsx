import React, { useState } from 'react';
import Timer from '../../components/IDE/Timer';
import MonacoEditor from '../../components/IDE/MonacoEditor';
import axios from 'axios';
import ProblemScript from '../../components/IDE/ProblemScript';
import ResultModal from '../../components/IDE/Result.modal';

const WebIDE: React.FC = () => {
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    const [elapsedTime, setElapsedTime] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState('');

    const executeCode = async () => {
        try {
            const response = await axios.post(`/problem/{problemId}/run`, {
                code,
            });
            setOutput(response.data.result);
        } catch (error) {
            setOutput(`Error: ${error.message}`);
        }
    };
    const submitCode = async () => {
        try {
            const response = await axios.post(`/problem/{problemId}/grade`, { code });
            if (response.data.success) {
                setModalContent('정답입니다!');
            } else {
                setModalContent('틀렸습니다.');
            }
            setShowModal(true);
        } catch (error) {
            console.log(`Error: ${error.message}`);
        }
    };
    const closeModal = () => {
        setShowModal(false);
        setOutput('');
    };
    const handleCodeChange = (value: string) => {
        setCode(value);
    };

    const handleTimeUpdate = (time: number) => {
        setElapsedTime(time);
    };

    return (
        <div className="web-ide">
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                {/* 왼쪽 */}
                <div style={{ flex: 1 }}>
                    <ProblemScript />
                </div>
                {/* 오른쪽 */}
                <div style={{ flex: 1 }}>
                    <Timer initialTime={elapsedTime} onTimeUpdate={handleTimeUpdate} />
                    <div>
                        <MonacoEditor onChange={handleCodeChange} />
                        <button onClick={executeCode}>코드 실행</button>
                        <button onClick={submitCode}>코드 제출</button>
                    </div>
                    <div>
                        <h2>결과</h2>
                        <textarea readOnly value={output} rows={10} cols={100} />
                    </div>
                </div>
            </div>
            <ResultModal isOpen={showModal} onClose={closeModal} content={modalContent} />
        </div>
    );
};
export default WebIDE;

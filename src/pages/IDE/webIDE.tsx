import React, { useState } from 'react';
import Timer from '../../components/IDE/Timer';
import MonacoEditor from '../../components/IDE/MonacoEditor';
import ProblemScript from '../../components/IDE/ProblemScript';
import ResultModal from '../../components/IDE/Result.modal';
import { useParams } from 'react-router-dom';
import api from '../../components/Api/Api';
import styles from './webIDE.module.scss';

const WebIDE: React.FC = () => {
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    const [elapsedTime, setElapsedTime] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const { problemId } = useParams<{ problemId: string }>();
    const [language, setLanguage] = useState<string>('python');

    const executeCode = async () => {
        if (!problemId) return;
        try {
            const response = await api.patch(`/problem/${problemId}/run`, {
                code,
                language: language.toUpperCase(),
            });
            const { testCaseCount, correctCount, statusList, dataList } = response.data;
            let resultOutput = '';
            for (let i = 0; i < testCaseCount; i++) {
                resultOutput += `Test Case ${i + 1} - ${statusList[i]}: ${dataList[i]}\n`;
            }
            setOutput(resultOutput);
        } catch (error) {
            setOutput(`Error: ${error.message}`);
        }
    };

    const submitCode = async () => {
        if (!problemId) return;
        try {
            const response = await api.patch(`/problem/${problemId}/grade`, {
                code,
                language: language.toUpperCase(),
            });
            const { testCaseCount, correctCount, statusList, dataList } = response.data;

            let resultOutput = '';
            let isSuccess = true;

            for (let i = 0; i < testCaseCount; i++) {
                resultOutput += `Test Case ${i + 1} - ${statusList[i]}: ${dataList[i]}\n`;
                if (statusList[i] !== 'executed' || dataList[i] !== 'correct answer.') {
                    isSuccess = false;
                }
            }
            setOutput(resultOutput);
            if (isSuccess) {
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

    const handleLanguageChange = (language: string) => {
        setLanguage(language);
    };

    return (
        <div className={styles.webIDE}>
            <div className={styles.problemContent}>
                <div className={styles.script}>
                    <ProblemScript problemId={problemId} />
                </div>
                <div className={styles.IDEpart}>
                    <Timer initialTime={elapsedTime} onTimeUpdate={handleTimeUpdate} />
                    <div>
                        <MonacoEditor
                            onChange={handleCodeChange}
                            onLanguageChange={handleLanguageChange}
                            problemId={problemId}
                        />
                    </div>
                    <div className={styles.outputContainer}>
                        <div className={styles.outputTop}>
                            <h2>결과</h2>
                            <button onClick={executeCode}>코드 실행</button>
                            <button onClick={submitCode}>코드 제출</button>
                        </div>
                        <div className={styles.outputBox}>{output}</div>
                    </div>
                </div>
            </div>
            <ResultModal isOpen={showModal} onClose={closeModal} content={modalContent} />
        </div>
    );
};
export default WebIDE;

import React, { useState } from 'react';
import Timer from '../../components/IDE/Timer';
import MonacoEditor from '../../components/IDE/MonacoEditor';
import ProblemScript from '../../components/IDE/ProblemScript';
import ResultModal from '../../components/IDE/Result.modal';
import { useParams } from 'react-router-dom';
import api from '../../components/Api/Api';
import styles from './webIDE.module.scss';
import { soundState } from '../../recoil/state/soundState';
import { useRecoilState, useRecoilValue } from 'recoil';
import throttle from 'lodash/throttle';
import { ThemeState } from '../Theme/ThemeState';

const WebIDE: React.FC = () => {
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    const [time, setTime] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const { problemID } = useParams<{ problemID: string }>();
    const [language, setLanguage] = useState<string>('python');
    const [isVolumeOn] = useRecoilState<boolean>(soundState);
    const theme = useRecoilValue(ThemeState);

    const handleTTS = throttle((text: string): void => {
        if (isVolumeOn) {
            const speech = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(speech);
        }
    }, 3000);

    const executeCode = async () => {
        if (!problemID) return;
        try {
            const response = await api.patch(`/problem/${problemID}/run`, {
                code,
                language: language.toUpperCase(),
            });
            const { testCaseCount, correctCount, statusList, dataList } = response.data;
            let resultOutput = '';
            for (let i = 0; i < testCaseCount; i++) {
                resultOutput += `테스트 케이스 ${i + 1} - ${statusList[i]} : ${dataList[i]}\n `;
            }
            setOutput(resultOutput);
        } catch (error) {
            setOutput(`Error: ${error.message}`);
        }
    };

    const submitCode = async () => {
        if (!problemID) return;
        try {
            const response = await api.patch(`/problem/${problemID}/grade`, {
                code,
                language: language.toUpperCase(),
            });
            const { testCaseCount, correctCount, statusList, dataList } = response.data;

            let resultOutput = '';
            let isSuccess = true;

            for (let i = 0; i < testCaseCount; i++) {
                resultOutput += `테스트 케이스 ${i + 1} - ${statusList[i]} : ${dataList[i]}\n `;
                if (statusList[i] !== 'executed' || !dataList[i].includes('correct answer.')) {
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
        setTime(time);
    };

    const handleLanguageChange = (language: string) => {
        setLanguage(language);
    };

    return (
        <div className={styles[`mode_${theme}`]}>
            <div className={styles.webIDE}>
                <div className={styles.problemContent}>
                    <div className={styles.script}>
                        <ProblemScript problemID={problemID} />
                    </div>
                    <div className={styles.IDEpart}>
                        <div className={styles.timer}>
                            <Timer onTimeUpdate={handleTimeUpdate} />
                        </div>
                        <div className={styles.editorContainer}>
                            <div className={styles.editor}>
                                <MonacoEditor
                                    onChange={handleCodeChange}
                                    onLanguageChange={handleLanguageChange}
                                    problemID={problemID}
                                />
                            </div>
                            <div className={styles.outputContainer}>
                                <div className={styles.outputTop}>
                                    <h2>결과</h2>
                                    <div>
                                        <button onClick={executeCode}>코드 실행</button>
                                        <button onClick={submitCode}>코드 제출</button>
                                    </div>
                                </div>
                                <div className={styles.outputBox} onMouseEnter={() => handleTTS(output)}>
                                    {output}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ResultModal isOpen={showModal} onClose={closeModal} content={modalContent} />
            </div>
        </div>
    );
};
export default WebIDE;

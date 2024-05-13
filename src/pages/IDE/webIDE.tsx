import React, { useState } from 'react';
import CodeMirrorEditor from '../../components/IDE/CodeMirror';
import Timer from '../../components/IDE/Timer';
import Cpp from '../../components/IDE/Language/Cpp';
import Python from '../../components/IDE/Language/Python';
import Java from '../../components/IDE/Language/Java';
import Javascript from '../../components/IDE/Language/JavaScript';

enum Language {
    Python = 'Python',
    Cpp = 'C++',
    Java = 'Java',
    Javascript = 'Javascript',
}

const WebIDE: React.FC = () => {
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    const [elapsedTime, setElapsedTime] = useState(0);
    const [language, setLanguage] = useState<Language>(Language.Python);

    const executeCode = () => {
        try {
            const result = eval(code);
            setOutput(result);
        } catch (error) {
            setOutput(`Error: ${error.message}`);
        }
    };

    const handleTimeUpdate = (time: number) => {
        setElapsedTime(time);
    };

    const renderCodeEditor = () => {
        switch (language) {
            case Language.Cpp:
                return <Cpp value={code} onChange={setCode} />;
            case Language.Python:
                return <Python value={code} onChange={setCode} />;
            case Language.Java:
                return <Java value={code} onChange={setCode} />;
            case Language.Javascript:
                return <Javascript value={code} onChange={setCode} />;
            default:
                return null;
        }
    };

    return (
        <div className="web-ide">
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                {/* 왼쪽 */}
                <div style={{ flex: 1 }}>
                    <h2>문제</h2>
                    {/* 문제 표시되는 컴포넌트 */}
                </div>
                {/* 오른쪽 */}
                <div style={{ flex: 1 }}>
                    <Timer initialTime={3000} onTimeUpdate={handleTimeUpdate} />
                    <select value={language} onChange={(e) => setLanguage(e.target.value as Language)}>
                        {Object.values(Language).map((lang) => (
                            <option key={lang} value={lang}>
                                {lang}
                            </option>
                        ))}
                    </select>
                    <div>
                        {renderCodeEditor()}
                        <button onClick={executeCode}>코드 실행</button>
                    </div>
                    <div>
                        <h2>결과</h2>
                        <textarea readOnly value={output} />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default WebIDE;

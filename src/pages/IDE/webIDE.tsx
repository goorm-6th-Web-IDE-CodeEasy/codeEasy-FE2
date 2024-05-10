import React, { useState } from 'react';
import CodeMirrorEditor from '../../components/IDE/CodeMirror';
import Timer from '../../components/IDE/Timer';

const WebIDE: React.FC = () => {
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    const [elapsedTime, setElapsedTime] = useState(0);

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

    return (
        <div className="web-ide">
            <h1>Algorithm Problem Solver</h1>
            <Timer initialTime={60} onTimeUpdate={handleTimeUpdate} />
            <div>
                <h2>Code Editor</h2>
                <CodeMirrorEditor value={code} onChange={(newValue) => setCode(newValue)} />
                <button onClick={executeCode}>Run Code</button>
            </div>
            <div>
                <h2>Output</h2>
                <textarea readOnly value={output} />
            </div>
            <div>
                <h2>Elapsed Time</h2>
                <p>{elapsedTime} seconds</p>
            </div>
        </div>
    );
};
export default WebIDE;

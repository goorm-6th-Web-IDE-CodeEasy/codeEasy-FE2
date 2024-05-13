import React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/python/python';

interface PythonProps {
    value: string;
    onChange: (newValue: string) => void;
}

const Python: React.FC<PythonProps> = ({ value, onChange }) => {
    return (
        <CodeMirror
            value={value}
            options={{
                mode: 'python',
                theme: 'material',
                lineNumbers: true,
            }}
            onBeforeChange={(editor, data, newValue) => {
                onChange(newValue);
            }}
        />
    );
};

export default Python;

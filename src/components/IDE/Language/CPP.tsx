import React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/clike/clike';

interface CppProps {
    value: string;
    onChange: (newValue: string) => void;
}

const Cpp: React.FC<CppProps> = ({ value, onChange }) => {
    return (
        <CodeMirror
            value={value}
            options={{
                mode: 'text/x-c++src',
                theme: 'material',
                lineNumbers: true,
            }}
            onBeforeChange={(editor, data, newValue) => {
                onChange(newValue);
            }}
        />
    );
};

export default Cpp;

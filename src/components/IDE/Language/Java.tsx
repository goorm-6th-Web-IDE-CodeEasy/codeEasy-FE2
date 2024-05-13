import React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/clike/clike';

interface JavaProps {
    value: string;
    onChange: (newValue: string) => void;
}

const Java: React.FC<JavaProps> = ({ value, onChange }) => {
    return (
        <CodeMirror
            value={value}
            options={{
                mode: 'text/x-java',
                theme: 'material',
                lineNumbers: true,
            }}
            onBeforeChange={(editor, data, newValue) => {
                onChange(newValue);
            }}
        />
    );
};

export default Java;

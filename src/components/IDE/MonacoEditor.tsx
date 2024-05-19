import React, { useRef, useState } from 'react';
import { Editor, Monaco } from '@monaco-editor/react';
import LanguageSelector from './LanguageSelector';
import { editor } from 'monaco-editor';
import PythonDefault from './Language/Python.default';
import JsDefault from './Language/Js.default';
import CppDefault from './Language/Cpp.default';
import JavaDefault from './Language/Java.default';

interface MonacoEditorProps {
    onChange: (value: string) => void;
    onMount?: () => void;
}

const MonacoEditor: React.FC<MonacoEditorProps> = ({ onChange }) => {
    const [editorValue, setEditorValue] = useState<string>('');
    const [language, setLanguage] = useState<string>('python');
    const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
    const monacoRef = useRef<Monaco | null>(null);

    const handleEditorChange = (value: string | undefined) => {
        if (value) {
            setEditorValue(value);
            onChange(value);
        }
    };

    const handleLanguageChange = (selectedLanguage: string) => {
        setLanguage(selectedLanguage);
        setEditorValue(getDefaultValue(selectedLanguage));
    };

    const handleEditorMount = (editor: editor.IStandaloneCodeEditor, monaco: Monaco) => {
        editorRef.current = editor;
        monacoRef.current = monaco;
    };

    const getDefaultValue = (language: string) => {
        switch (language) {
            case 'python':
                return PythonDefault;
            case 'javascript':
                return JsDefault;
            case 'cpp':
                return CppDefault;
            case 'java':
                return JavaDefault;
            default:
                return '';
        }
    };

    return (
        <div>
            <LanguageSelector onSelect={handleLanguageChange} />
            <Editor
                width="100%"
                height="65vh"
                language={language}
                defaultValue={getDefaultValue(language)}
                value={editorValue}
                onChange={handleEditorChange}
                onMount={handleEditorMount}
            />
        </div>
    );
};

export default MonacoEditor;

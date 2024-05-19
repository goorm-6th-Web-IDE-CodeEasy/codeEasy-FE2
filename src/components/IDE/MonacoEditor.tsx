import React, { useEffect, useRef, useState } from 'react';
import { Editor, Monaco } from '@monaco-editor/react';
import LanguageSelector from './LanguageSelector';
import { editor } from 'monaco-editor';
import api from '../Api/Api';

interface MonacoEditorProps {
    onChange: (value: string) => void;
    onLanguageChange: (language: string) => void;
    onMount?: () => void;
    problemId: string | undefined;
}

const MonacoEditor: React.FC<MonacoEditorProps> = ({ onChange, onLanguageChange, problemId }) => {
    const [editorValue, setEditorValue] = useState<string>('');
    const [language, setLanguage] = useState<string>('python');
    const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
    const monacoRef = useRef<Monaco | null>(null);

    useEffect(() => {
        const fetchDefaultCode = async () => {
            if (!problemId) return;
            try {
                const response = await api.get(`/problem/${problemId}/default`);
                const defaultCode = response.data[language];
                setEditorValue(defaultCode);
            } catch (error) {
                console.error(error);
            }
        };

        fetchDefaultCode();
    }, [language, problemId]);

    const handleEditorChange = (value: string | undefined) => {
        if (value) {
            setEditorValue(value);
            onChange(value);
        }
    };

    const handleLanguageChange = (selectedLanguage: string) => {
        setLanguage(selectedLanguage);
        onLanguageChange(selectedLanguage);
    };

    const handleEditorMount = (editor: editor.IStandaloneCodeEditor, monaco: Monaco) => {
        editorRef.current = editor;
        monacoRef.current = monaco;
    };

    return (
        <div>
            <LanguageSelector onSelect={handleLanguageChange} />
            <Editor
                width="100%"
                height="65vh"
                language={language}
                value={editorValue}
                onChange={handleEditorChange}
                onMount={handleEditorMount}
            />
        </div>
    );
};

export default MonacoEditor;

import React, { useEffect, useRef, useState } from 'react';
import { Editor, Monaco } from '@monaco-editor/react';
import LanguageSelector from './LanguageSelector';
import { editor } from 'monaco-editor';
import api from '../Api/Api';
import { ThemeState } from '../../pages/Theme/ThemeState';
import { useRecoilValue } from 'recoil';
import styles from '../../global.module.scss';
interface MonacoEditorProps {
    onChange: (value: string) => void;
    onLanguageChange: (language: string) => void;
    onMount?: () => void;
    problemID: string | undefined;
}

const MonacoEditor: React.FC<MonacoEditorProps> = ({ onChange, onLanguageChange, problemID }) => {
    const [editorValue, setEditorValue] = useState<string>('');
    const [language, setLanguage] = useState<string>('python');
    const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
    const monacoRef = useRef<Monaco | null>(null);
    const theme = useRecoilValue(ThemeState);

    useEffect(() => {
        const fetchDefaultCode = async () => {
            if (!problemID) return;
            try {
                const response = await api.get(`/problem/${problemID}/default`);
                const defaultCode = response.data[language];
                setEditorValue(defaultCode);
            } catch (error) {
                console.error(error);
            }
        };

        fetchDefaultCode();
    }, [language, problemID]);

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
        <div className={styles[`mode_${theme}`]}>
            <LanguageSelector onSelect={handleLanguageChange} />
            <Editor
                width="100%"
                height="65vh"
                language={language}
                theme={theme === 'light' ? 'vs-light' : 'vs-dark'}
                value={editorValue}
                onChange={handleEditorChange}
                onMount={handleEditorMount}
            />
        </div>
    );
};

export default MonacoEditor;

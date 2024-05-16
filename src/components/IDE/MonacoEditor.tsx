import React, { useEffect, useRef, useState } from 'react';
import { Editor, Monaco } from '@monaco-editor/react';
import LanguageSelector from './LanguageSelector';
import { editor } from 'monaco-editor';

interface MonacoEditorProps {
    onChange: (value: string) => void;
    onMount?: () => void;
}

const MonacoEditor: React.FC<MonacoEditorProps> = ({ onChange, onMount }) => {
    const [editorValue, setEditorValue] = useState<string>('');
    const [language, setLanguage] = useState<string>('python');
    const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
    const monacoRef = useRef<Monaco | null>(null);
    const isEditorReady = useRef<boolean>(false);

    useEffect(() => {
        if (isEditorReady.current) {
            onMount?.();
        }
    }, [isEditorReady, onMount]);

    const handleEditorChange = (value: string | undefined) => {
        if (value) {
            setEditorValue(value);
            onChange(value);
        }
    };

    const handleLanguageChange = (selectedLanguage: string) => {
        setLanguage(selectedLanguage);
    };

    const handleEditorMount = (editor: editor.IStandaloneCodeEditor, monaco: Monaco) => {
        editorRef.current = editor;
        monacoRef.current = monaco;
        isEditorReady.current = true;
    };

    return (
        <div>
            <LanguageSelector onSelect={handleLanguageChange} />
            <Editor
                width="100%"
                height="65vh"
                value={editorValue}
                onChange={handleEditorChange}
                onMount={handleEditorMount}
                language={language}
            />
        </div>
    );
};

export default MonacoEditor;

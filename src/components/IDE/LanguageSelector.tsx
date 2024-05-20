import React from 'react';
import { ThemeState } from '../../pages/Theme/ThemeState';
import { useRecoilValue } from 'recoil';
import styles from '../../global.module.scss';
interface LanguageSelectorProps {
    onSelect: (selectedLanguage: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onSelect }) => {
    const languages = ['python', 'javascript', 'java', 'cpp'];
    const theme = useRecoilValue(ThemeState);

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedLanguage = event.target.value;
        onSelect(selectedLanguage);
    };

    return (
        <div className={styles[`mode_${theme}`]}>
            <label htmlFor="language-select">언어 선택: </label>
            <select id="language-select" onChange={handleLanguageChange}>
                {languages.map((language, index) => (
                    <option key={index} value={language}>
                        {language}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LanguageSelector;

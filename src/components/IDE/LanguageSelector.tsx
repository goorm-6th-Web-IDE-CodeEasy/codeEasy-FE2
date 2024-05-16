import React from 'react';

interface LanguageSelectorProps {
    onSelect: (selectedLanguage: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onSelect }) => {
    const languages = ['javascript', 'python', 'java', 'C++'];

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedLanguage = event.target.value;
        onSelect(selectedLanguage);
    };

    return (
        <div>
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

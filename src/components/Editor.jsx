import React from 'react';
import MonacoEditor from '@monaco-editor/react';
import Image from 'next/image';

const languageIcons = {
    html: 'https://cdn-icons-png.flaticon.com/512/732/732212.png',
    css: 'https://cdn-icons-png.flaticon.com/512/732/732190.png',
    javascript: 'https://cdn-icons-png.flaticon.com/512/5968/5968292.png',
};

const Editor = ({ title, value, onChange, language }) => {
    const handleEditorChange = (value) => {
        onChange(value);
    };

    return (
        <div className="flex flex-col w-full h-full p-4 bg-gray-800 text-white overflow-hidden">
            <div className='flex items-center mb-2'>
                <Image src={languageIcons[language]} width={32} height={32} alt={`${language} Icon`} className="w-5 h-5 mr-2" />
                <h2 className="text-xl">{title}</h2>
            </div>
            <MonacoEditor
                height="100vh"
                language={language}
                value={value}
                onChange={handleEditorChange}
                theme="vs-dark"
                options={{
                    fontSize: 16,
                    minimap: { enabled: false },
                }}
            />
        </div>
    );
};

export default Editor;


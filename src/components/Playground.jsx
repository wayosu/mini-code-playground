'use client';

import { useState } from 'react';
import EditorSection from './EditorSection';
import PreviewSection from './PreviewSection';
import ConsoleSection from './ConsoleSection';
import ExportButton from './ExportButton';
import ExportModal from './ExportModal';

const Playground = () => {
    const [html, setHtml] = useState('<h1>Hello Sahib! Apa kabar sahib?</h1>');
    const [css, setCss] = useState('h1 { text-align: center; }');
    const [js, setJs] = useState('console.log("Hello from Gorontalo!");');
    const [logs, setLogs] = useState('');
    const [isConsoleOpen, setIsConsoleOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filename, setFilename] = useState('myfile'); // No extension initially

    const handleExecuteJs = (jsCode) => {
        try {
            const originalLog = console.log;
            console.log = (...args) => {
                setLogs((prevLogs) => `${prevLogs}\n${args.join(' ')}`);
                originalLog(...args);
            };
            new Function(jsCode)();
            console.log = originalLog;
        } catch (error) {
            setLogs((prevLogs) => `${prevLogs}\nError: ${error.message}`);
        }
    };

    const handleExportCode = () => {
        const finalFilename = filename.endsWith('.html') ? filename : `${filename}.html`;

        const blob = new Blob(
            [
                `
                <html>
                    <head>
                        <style>${css}</style>
                    </head>
                    <body>
                        ${html}
                        <script>
                            ${js}
                        </script>
                    </body>
                </html>
                `,
            ],
            { type: 'text/html' }
        );

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = finalFilename;
        link.click();
        setIsModalOpen(false);
    };

    return (
        <div className="flex flex-col-reverse lg:flex-col lg:h-screen bg-gray-900">
            {/* Editor Section */}
            <EditorSection html={html} setHtml={setHtml} css={css} setCss={setCss} js={js} setJs={setJs} />

            {/* Preview Section */}
            <PreviewSection html={html} css={css} js={js} />

            {/* Console Section */}
            <ConsoleSection logs={logs} isConsoleOpen={isConsoleOpen} setIsConsoleOpen={setIsConsoleOpen} />

            {/* Execute JS Button */}
            <div className="fixed lg:absolute bottom-20 right-8">
                <button
                    onClick={() => handleExecuteJs(js)}
                    className="bg-blue-600/50 hover:bg-blue-700 text-white px-3 py-2 text-xs rounded-full shadow-md transition-all duration-300"
                >
                    Run JS
                </button>
            </div>

            {/* Export Button */}
            <ExportButton onClick={() => setIsModalOpen(true)} />

            {/* Modal for Export Filename */}
            {isModalOpen && (
                <ExportModal
                    filename={filename}
                    setFilename={setFilename}
                    onExport={handleExportCode}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default Playground;

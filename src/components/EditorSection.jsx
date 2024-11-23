import React, { useState, useRef } from 'react';
import Editor from './Editor';

const EditorSection = ({ html, setHtml, css, setCss, js, setJs }) => {
    const htmlEditorRef = useRef(null);
    const cssEditorRef = useRef(null);
    const jsEditorRef = useRef(null);

    const [htmlFullscreen, setHtmlFullscreen] = useState(false);
    const [cssFullscreen, setCssFullscreen] = useState(false);
    const [jsFullscreen, setJsFullscreen] = useState(false);

    const handleFullscreenToggle = (editorType) => {
        let ref = null;

        if (editorType === 'html') {
            ref = htmlEditorRef.current;
            setHtmlFullscreen(!htmlFullscreen);
        } else if (editorType === 'css') {
            ref = cssEditorRef.current;
            setCssFullscreen(!cssFullscreen);
        } else if (editorType === 'js') {
            ref = jsEditorRef.current;
            setJsFullscreen(!jsFullscreen);
        }

        if (ref) {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                ref.requestFullscreen();
            }
        }
    };

    const editorClass = 'flex flex-col w-full bg-gray-800 text-white overflow-hidden';

    return (
        <div className="flex flex-col lg:flex-row flex-1 gap-1 m-4 overflow-hidden">
            {/* HTML Editor */}
            <div
                ref={htmlEditorRef}
                className={`${htmlFullscreen ? 'h-screen' : 'h-full'} ${editorClass}`}
            >
                <Editor
                    title="HTML"
                    value={html}
                    onChange={setHtml}
                    placeholder="Write your HTML here..."
                    language="html"
                />
                <button
                    onClick={() => handleFullscreenToggle('html')}
                    className="bg-gray-600 hover:bg-gray-700 text-white text-xs px-3 py-2 mt-2 duration-300 transition-all"
                >
                    {htmlFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                </button>
            </div>

            {/* CSS Editor */}
            <div
                ref={cssEditorRef}
                className={`${cssFullscreen ? 'h-screen' : 'h-full'} ${editorClass}`}
            >
                <Editor
                    title="CSS"
                    value={css}
                    onChange={setCss}
                    placeholder="Write your CSS here..."
                    language="css"
                />
                <button
                    onClick={() => handleFullscreenToggle('css')}
                    className="bg-gray-600 hover:bg-gray-700 text-white text-xs px-3 py-2 mt-2 duration-300 transition-all"
                >
                    {cssFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                </button>
            </div>

            {/* JavaScript Editor */}
            <div
                ref={jsEditorRef}
                className={`${jsFullscreen ? 'h-screen' : 'h-full'} ${editorClass}`}
            >
                <Editor
                    title="JavaScript"
                    value={js}
                    onChange={setJs}
                    placeholder="Write your JavaScript here..."
                    language="javascript"
                />
                <button
                    onClick={() => handleFullscreenToggle('js')}
                    className="bg-gray-600 hover:bg-gray-700 text-white text-xs px-3 py-2 mt-2 duration-300 transition-all"
                >
                    {jsFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                </button>
            </div>
        </div>
    );
};

export default EditorSection;

import React, { useRef, useState, useEffect } from 'react';

const PreviewSection = ({ html, css, js }) => {
    const iframeRef = useRef(null);
    const previewRef = useRef(null);
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        const iframe = iframeRef.current;
        const document = iframe.contentDocument || iframe.contentWindow.document;

        const source = `
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
    `;

        document.open();
        document.write(source);
        document.close();
    }, [html, css, js]);

    const handleFullScreenToggle = () => {
        if (!isFullscreen) {
            if (previewRef.current.requestFullscreen) {
                previewRef.current.requestFullscreen();
            } else if (previewRef.current.webkitRequestFullscreen) {
                previewRef.current.webkitRequestFullscreen(); // For Safari
            } else if (previewRef.current.msRequestFullscreen) {
                previewRef.current.msRequestFullscreen(); // For IE11
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen(); // For Safari
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen(); // For IE11
            }
        }
    };

    useEffect(() => {
        const handleFullscreenChange = () => {
            const fullscreenElement =
                document.fullscreenElement ||
                document.webkitFullscreenElement ||
                document.msFullscreenElement;

            setIsFullscreen(!!fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        document.addEventListener('msfullscreenchange', handleFullscreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener(
                'webkitfullscreenchange',
                handleFullscreenChange
            );
            document.removeEventListener('msfullscreenchange', handleFullscreenChange);
        };
    }, []);

    return (
        <div
            className={`flex flex-col flex-1 overflow-hidden p-4 ${isFullscreen ? 'h-screen' : 'h-3/5'}`}
            ref={previewRef}
        >
            <h1 className='text-lg font-semibold mb-2 lg:hidden'>Preview</h1>
            <iframe
                ref={iframeRef}
                className={`w-full ${isFullscreen ? 'h-full' : 'h-[80vh]'} lg:h-full bg-white`}
                title="Preview"
                frameBorder="0"
            ></iframe>
            <button
                onClick={handleFullScreenToggle}
                className={`fixed lg:absolute ${isFullscreen ? 'bottom-8' : 'bottom-44'} right-8 z-10 text-xs bg-gray-600/50 hover:bg-gray-700 text-white px-3 py-2 rounded-full shadow-md transition-all duration-300`}
            >
                {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Preview'}
            </button>
        </div>
    );
};

export default PreviewSection;

import React from 'react';

const ExportButton = ({ onClick }) => {
    return (
        <div className="fixed lg:absolute bottom-32 right-8">
            <button
                onClick={onClick}
                className="bg-yellow-600/50 hover:bg-yellow-700 text-white px-3 py-2 text-xs rounded-full shadow-md transition-all duration-300"
            >
                Export Code
            </button>
        </div>
    );
};

export default ExportButton;

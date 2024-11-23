import { useState, useRef } from 'react';

const Console = ({ logs }) => (
    <div className="w-full bg-gray-800 text-white p-4 overflow-auto h-[200px] transition-all duration-300">
        <h3 className="text-lg font-semibold mb-2">Console</h3>
        <div className="flex flex-col gap-1 text-sm" style={{ fontFamily: 'monospace' }}>
            {logs.split('\n').map((log, index) => (
                <div key={index} className="flex items-center">
                    <span className="text-green-500">{">"}</span>
                    <span className="ml-2">{log}</span>
                </div>
            ))}
        </div>
    </div>
);

const ConsoleToggle = ({ onToggle, isOpen }) => {
    return (
        <button
            onClick={onToggle}
            className={`${isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500/50 hover:bg-green-600'
                } fixed lg:absolute bottom-8 right-8 px-3 py-2 text-xs rounded-full text-white shadow-lg transition-all duration-300`}
        >
            {isOpen ? 'Close Console' : 'Open Console'}
        </button>
    );
};

export { Console, ConsoleToggle };

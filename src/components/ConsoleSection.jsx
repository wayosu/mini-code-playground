import React from 'react';
import { Console, ConsoleToggle } from './Console';

const ConsoleSection = ({ logs, isConsoleOpen, setIsConsoleOpen }) => {
    return (
        <>
            {isConsoleOpen && (
                <div className="absolute bottom-0 left-0 w-full">
                    <Console logs={logs} />
                </div>
            )}
            <ConsoleToggle onToggle={() => setIsConsoleOpen(!isConsoleOpen)} isOpen={isConsoleOpen} />
        </>
    );
};

export default ConsoleSection;

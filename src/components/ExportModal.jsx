import React from 'react';

const ExportModal = ({ filename, setFilename, onExport, onClose }) => {
    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h2 className="text-lg text-gray-600 font-semibold mb-4">Enter Filename</h2>
                <input
                    type="text"
                    value={filename}
                    onChange={(e) => setFilename(e.target.value)}
                    className="w-full p-2 border rounded mb-4 text-gray-600 placeholder-gray-300 focus:outline-none focus:border-gray-900"
                    placeholder="Enter filename (e.g., myfile)"
                />
                <div className="flex justify-end">
                    <button
                        onClick={onExport}
                        className="bg-gray-900 text-sm text-white px-4 py-2 rounded mr-2"
                    >
                        Export
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-500 text-sm text-white px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExportModal;

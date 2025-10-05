
import React from 'react';

interface ChartWrapperProps {
    title: string;
    children: React.ReactNode;
}

export const ChartWrapper: React.FC<ChartWrapperProps> = ({ title, children }) => (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 h-full flex flex-col">
        <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
        <div className="flex-grow w-full h-80">
            {children}
        </div>
    </div>
);

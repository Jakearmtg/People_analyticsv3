
import React, { useRef } from 'react';
import { UploadIcon, ChartBarIcon } from './icons';

interface HeaderProps {
    onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    availableMonths: string[];
    selectedMonth: string;
    onMonthChange: (month: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onFileChange, availableMonths, selectedMonth, onMonthChange }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <header className="bg-gray-800/80 backdrop-blur-sm shadow-lg fixed top-0 left-0 right-0 z-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-4">
                        <ChartBarIcon className="h-8 w-8 text-teal-500" />
                        <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                            Dashboard de Indicadores de RH
                        </h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <select
                                value={selectedMonth}
                                onChange={(e) => onMonthChange(e.target.value)}
                                className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full pl-3 pr-10 py-2 appearance-none"
                                disabled={availableMonths.length === 0}
                            >
                                {availableMonths.length > 0 && (
                                  <option value="ALL">Visão Geral</option>
                                )}
                                {availableMonths.map(month => (
                                    <option key={month} value={month}>{month}</option>
                                ))}
                                 {availableMonths.length === 0 && (
                                  <option>Nenhum dado</option>
                                )}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>

                        <input
                            type="file"
                            accept=".csv"
                            onChange={onFileChange}
                            ref={fileInputRef}
                            className="hidden"
                        />
                        <button
                            onClick={handleUploadClick}
                            className="flex items-center space-x-2 bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            <UploadIcon className="h-5 w-5" />
                            <span className="hidden sm:inline">Carregar CSV</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;

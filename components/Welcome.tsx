
import React, { useRef } from 'react';
import { UploadIcon } from './icons';

interface WelcomeProps {
    onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Welcome: React.FC<WelcomeProps> = ({ onFileChange }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="text-center flex flex-col items-center justify-center h-[60vh]">
             <div className="bg-gray-800 p-8 rounded-full border-4 border-gray-700 mb-8">
                <UploadIcon className="h-24 w-24 text-teal-500" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">Bem-vindo ao seu Dashboard de RH</h2>
            <p className="text-lg text-gray-400 mb-8 max-w-2xl">
                Para começar, carregue o arquivo CSV com os indicadores do mês. O dashboard será gerado automaticamente.
            </p>
            <input
                type="file"
                accept=".csv"
                onChange={onFileChange}
                ref={fileInputRef}
                className="hidden"
            />
            <button
                onClick={handleUploadClick}
                className="flex items-center space-x-3 bg-teal-600 hover:bg-teal-500 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
                <UploadIcon className="h-6 w-6" />
                <span>Carregar primeiro arquivo CSV</span>
            </button>
        </div>
    );
};

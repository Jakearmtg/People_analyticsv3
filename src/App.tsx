import React, { useState, useCallback, useEffect } from 'react';
import { useHRData } from './hooks/useHRData';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import { Welcome } from './components/Welcome';
import { ViewMode } from './types';

const App: React.FC = () => {
    const { allData, sortedMonths, addMonthData, loading, error, setError } = useHRData();
    const [selectedMonth, setSelectedMonth] = useState<string>('ALL');
    const [notification, setNotification] = useState<string | null>(null);

    useEffect(() => {
        if(sortedMonths.length > 0 && selectedMonth === 'ALL') {
             setSelectedMonth(sortedMonths[0]);
        } else if (sortedMonths.length === 0) {
            setSelectedMonth('ALL');
        }
    }, [sortedMonths, selectedMonth]);

    const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target?.result as string;
                const result = addMonthData(text);
                if (result.success && result.month) {
                    setSelectedMonth(result.month);
                    setNotification(`Dados de ${result.month} carregados com sucesso!`);
                    setTimeout(() => setNotification(null), 3000);
                }
            };
            reader.readAsText(file);
        }
        event.target.value = ''; // Reset file input
    }, [addMonthData]);

    const handleMonthChange = (month: string) => {
        setSelectedMonth(month);
    };

    const hasData = Object.keys(allData).length > 0;
    const viewMode: ViewMode = selectedMonth === 'ALL' ? 'general' : 'monthly';
    const displayedData = viewMode === 'general' ? allData : allData[selectedMonth];
    
    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
            <Header
                onFileChange={handleFileChange}
                availableMonths={sortedMonths}
                selectedMonth={selectedMonth}
                onMonthChange={handleMonthChange}
            />

            {notification && (
                 <div className="bg-teal-500 text-gray-900 font-semibold text-center p-2 fixed top-16 w-full z-20">
                    {notification}
                </div>
            )}

            <main className="p-4 sm:p-6 lg:p-8 pt-20">
                 {error && (
                    <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg relative mb-6" role="alert">
                        <strong className="font-bold">Erro: </strong>
                        <span className="block sm:inline">{error}</span>
                        <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setError(null)}>
                            <svg className="fill-current h-6 w-6 text-red-400" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                        </span>
                    </div>
                )}

                {loading ? (
                    <div className="text-center text-xl">Carregando dados...</div>
                ) : hasData ? (
                    <Dashboard data={displayedData} viewMode={viewMode} />
                ) : (
                    <Welcome onFileChange={handleFileChange}/>
                )}
            </main>
        </div>
    );
};

export default App;
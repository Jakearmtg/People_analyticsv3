
import { useState, useEffect, useCallback } from 'react';
import { MonthlyData } from '../types';
import { loadData, saveData } from '../services/storage';
import { parseHRDataFromCSV } from '../services/csvParser';

export const useHRData = () => {
    const [allData, setAllData] = useState<Record<string, MonthlyData>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setAllData(loadData());
        setLoading(false);
    }, []);

    const addMonthData = useCallback((csvText: string) => {
        try {
            setError(null);
            const newData = parseHRDataFromCSV(csvText);
            
            if (allData[newData.monthYear]) {
                 if (!window.confirm(`Já existem dados para ${newData.monthYear}. Deseja sobrescrevê-los?`)) {
                     return { success: false, month: null };
                 }
            }
            const updatedData = { ...allData, [newData.monthYear]: newData };
            setAllData(updatedData);
            saveData(updatedData);
            return { success: true, month: newData.monthYear };
        } catch (e) {
            console.error("Erro ao processar CSV:", e);
            const errorMessage = e instanceof Error ? e.message : "Ocorreu um erro desconhecido ao processar o arquivo.";
            setError(`Falha ao processar o arquivo: ${errorMessage}`);
            return { success: false, month: null };
        }
    }, [allData]);

    // Fix: Add explicit types for sort callback parameters to resolve 'unknown' type errors.
    const sortedData = Object.values(allData).sort((a: MonthlyData, b: MonthlyData) => {
        const [aMonth, aYear] = a.monthYear.split('/');
        const [bMonth, bYear] = b.monthYear.split('/');
        return new Date(`${bYear}-${bMonth}-01`).getTime() - new Date(`${aYear}-${aMonth}-01`).getTime();
    });

    // Fix: Add explicit type for map callback parameter.
    const sortedMonths = sortedData.map((d: MonthlyData) => d.monthYear);

    return { allData, sortedMonths, addMonthData, loading, error, setError };
}
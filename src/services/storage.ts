
import { MonthlyData } from '../types';

const STORAGE_KEY = 'hrDashboardData';

export const saveData = (data: Record<string, MonthlyData>): void => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(STORAGE_KEY, serializedData);
  } catch (error) {
    console.error("Error saving data to localStorage:", error);
  }
};

export const loadData = (): Record<string, MonthlyData> => {
  try {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    if (serializedData === null) {
      return {};
    }
    return JSON.parse(serializedData);
  } catch (error) {
    console.error("Error loading data from localStorage:", error);
    return {};
  }
};

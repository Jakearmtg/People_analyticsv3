
import React from 'react';

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 flex items-center space-x-4 transition-transform transform hover:scale-105 hover:border-teal-500/50">
      <div className="bg-gray-700 p-3 rounded-full">
        <div className="h-6 w-6 text-teal-500">
          {icon}
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-400">{title}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
  );
};

export default MetricCard;

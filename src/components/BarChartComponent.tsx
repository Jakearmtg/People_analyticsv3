import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartWrapper } from './ChartWrapper';

interface BarChartProps {
  data: any[];
  title: string;
  dataKey: string;
  nameKey: string;
  formatAsCurrency?: boolean;
}

const BarChartComponent: React.FC<BarChartProps> = ({ data, title, dataKey, nameKey, formatAsCurrency = false }) => {
  const currencyFormatter = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 }).format(value);

  return (
    <ChartWrapper title={title}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey={nameKey} tick={{ fill: '#9CA3AF' }} />
          <YAxis tick={{ fill: '#9CA3AF' }} tickFormatter={formatAsCurrency ? (tick) => currencyFormatter(tick as number).replace('R$', '') : undefined} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #4B5563' }}
            formatter={formatAsCurrency ? (value: number) => [currencyFormatter(value), 'Valor'] : undefined}
          />
          <Legend wrapperStyle={{ color: '#D1D5DB' }}/>
          {/* FIX: Updated color to match new teal theme */}
          <Bar dataKey={dataKey} fill="#14b8a6" />
        </BarChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};

export default BarChartComponent;
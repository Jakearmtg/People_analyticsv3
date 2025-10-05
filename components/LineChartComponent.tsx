
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartWrapper } from './ChartWrapper';

interface LineInfo {
    key: string;
    color: string;
}

interface LineChartProps {
  data: any[];
  title: string;
  lines: LineInfo[];
  formatAsCurrency?: boolean;
}

const LineChartComponent: React.FC<LineChartProps> = ({ data, title, lines, formatAsCurrency = false }) => {
   const currencyFormatter = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 }).format(value);

  return (
    <ChartWrapper title={title}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="name" tick={{ fill: '#9CA3AF' }} />
          <YAxis tick={{ fill: '#9CA3AF' }} tickFormatter={formatAsCurrency ? (tick) => currencyFormatter(tick as number).replace('R$', '') : undefined} />
          <Tooltip 
             contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #4B5563' }}
             formatter={formatAsCurrency ? (value: number, name: string) => [currencyFormatter(value), name] : undefined}
          />
          <Legend wrapperStyle={{ color: '#D1D5DB' }}/>
          {lines.map(line => (
             <Line key={line.key} type="monotone" dataKey={line.key} stroke={line.color} strokeWidth={2} activeDot={{ r: 8 }} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};

export default LineChartComponent;

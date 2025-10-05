
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartWrapper } from './ChartWrapper';

interface PieChartProps {
  data: { name: string; value: number }[];
  title: string;
}

const COLORS = ['#efe91b', '#38BDF8', '#FBBF24', '#A78BFA', '#F472B6'];

const PieChartComponent: React.FC<PieChartProps> = ({ data, title }) => {
  return (
    <ChartWrapper title={title}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
             contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #4B5563' }}
          />
          <Legend wrapperStyle={{ color: '#D1D5DB' }}/>
        </PieChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};

export default PieChartComponent;
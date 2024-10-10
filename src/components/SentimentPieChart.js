import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#00A000', '#FFD700', '#FF0000'];

const SentimentPieChart = ({ sentimentData }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md h-[517px]"> {/* Aumentar a altura */}
      <h5 className="text-center text-lg font-semibold mb-4">Gráfico de Sentimentos</h5>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={sentimentData}
            cx="50%"
            cy="50%"
            outerRadius={160} // Aumentar o raio externo para ampliar o gráfico
            fill="#8884d8"
            dataKey="value"
            label
          >
            {sentimentData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SentimentPieChart;

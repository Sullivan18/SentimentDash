import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const SentimentPieChart = ({ sentimentData, darkMode }) => {
  // Função de formatação para garantir que o valor e o nome sejam exibidos corretamente no Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    // Verificar se o Tooltip está ativo e se o payload contém dados válidos
    if (active && payload && payload.length > 0) {
      return (
        <div
          style={{
            backgroundColor: darkMode ? 'rgba(48, 48, 48, 0.9)' : 'rgba(211, 211, 211, 0.9)',
            borderRadius: '8px',
            padding: '10px',
            color: darkMode ? '#fff' : '#000',
          }}
        >
          {/* Exibir o nome e o valor do payload de forma segura */}
          <p>{`${payload[0].name}: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null; // Retornar null se o tooltip não estiver ativo ou os dados não forem válidos
  };

  return (
    <div className={`p-6 rounded-2xl shadow-lg h-[520px] ${darkMode ? 'bg-[#202225]' : 'bg-white'}`}>
      <h5 className={`text-center text-2xl font-bold mb-6 ${darkMode ? 'text-[#e8e6e3]' : 'text-gray-700'}`}>
        Gráfico de Sentimentos
      </h5>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <defs>
            <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00A000" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#00FF00" stopOpacity={0.6} />
            </linearGradient>
            <linearGradient id="yellowGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FFD700" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#FFC300" stopOpacity={0.6} />
            </linearGradient>
            <linearGradient id="redGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF0000" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#FF4C4C" stopOpacity={0.6} />
            </linearGradient>
          </defs>
          <Pie
            data={sentimentData}
            cx="50%"
            cy="45%"
            outerRadius={180}
            innerRadius={70}
            fill="#8884d8"
            dataKey="value"
            labelLine={false}
            animationDuration={800}
            label={({ name, value }) => `${name}: ${value}`}
          >
            {sentimentData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={`url(#${index === 0 ? 'greenGradient' : index === 1 ? 'yellowGradient' : 'redGradient'})`}
              />
            ))}
          </Pie>
          {/* Usar o CustomTooltip para personalizar o conteúdo do Tooltip */}
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SentimentPieChart;

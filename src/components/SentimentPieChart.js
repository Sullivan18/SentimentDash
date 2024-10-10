import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';


const SentimentPieChart = ({ sentimentData }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg h-[520px]"> {/* Estilo moderno e espaçamento maior */}
      <h5 className="text-center text-2xl font-bold mb-6 text-gray-700">Gráfico de Sentimentos</h5> {/* Título mais estilizado */}
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <defs>
            {/* Gradiente para dar um visual moderno ao gráfico */}
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
            outerRadius={180} // Aumentar ainda mais o raio externo para melhorar a visualização
            innerRadius={70} // Adicionar raio interno para transformar o gráfico em um donut
            fill="#8884d8"
            dataKey="value"
            labelLine={false} // Remover as linhas dos labels para um visual mais limpo
            animationDuration={800} // Adicionar animação ao gráfico
            label={({ name, value }) => `${name}: ${value}`} // Melhorar o formato do label
          >
            {sentimentData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={`url(#${index === 0 ? 'greenGradient' : index === 1 ? 'yellowGradient' : 'redGradient'})`} // Aplicar os gradientes às cores
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => [`${value}`, `${name}`]} // Tooltip mais limpa
            contentStyle={{
              backgroundColor: 'rgba(211, 211, 211)',
              borderRadius: '8px',
              color: '#fff',
              border: 'none',
              padding: '10px',
            }} // Customização do estilo do Tooltip
            cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }} // Customização do cursor
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SentimentPieChart;

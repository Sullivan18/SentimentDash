import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SentimentLineChart = ({ sentimentOverTimeData, darkMode }) => {
  return (
    <div className={`p-4 rounded-lg shadow-md ${darkMode ? 'bg-[#202225] text-[#e8e6e3]' : 'bg-white text-black'}`}>
      <h5 className={`text-center text-lg font-semibold mb-4 ${darkMode ? 'text-[#e8e6e3]' : 'text-black'}`}>
        Evolução dos Sentimentos ao Longo do Tempo
      </h5>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={sentimentOverTimeData}>
          <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#444' : '#ccc'} />
          <XAxis dataKey="date" stroke={darkMode ? '#e8e6e3' : '#000'} />
          <YAxis stroke={darkMode ? '#e8e6e3' : '#000'} />
          <Tooltip
            contentStyle={{
              backgroundColor: darkMode ? 'rgba(48, 48, 48, 0.9)' : 'rgba(211, 211, 211, 0.9)',
              borderRadius: '8px',
              color: darkMode ? '#e8e6e3' : '#000',
              border: 'none',
            }}
          />
          <Legend verticalAlign="top" wrapperStyle={{ color: darkMode ? '#e8e6e3' : '#000' }} />
          <Line type="monotone" dataKey="positive" stroke="#00A000" />
          <Line type="monotone" dataKey="negative" stroke="#FF0000" />
          <Line type="monotone" dataKey="neutral" stroke="#FFD700" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SentimentLineChart;

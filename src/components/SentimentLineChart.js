import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SentimentLineChart = ({ sentimentOverTimeData }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h5 className="text-center text-lg font-semibold mb-4">Evolução dos Sentimentos ao Longo do Tempo</h5>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={sentimentOverTimeData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="positive" stroke="#00A000" />
          <Line type="monotone" dataKey="negative" stroke="#FF0000" />
          <Line type="monotone" dataKey="neutral" stroke="#FFD700" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SentimentLineChart;

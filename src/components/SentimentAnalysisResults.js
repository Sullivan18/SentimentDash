import React from 'react';
import SentimentAnalysisSummary from './SentimentAnalysisSummary';
import SentimentPieChart from './SentimentPieChart';
import SentimentLineChart from './SentimentLineChart';

const SentimentAnalysisResults = ({ results }) => {
  const sentimentData = [
    { name: 'Positivos', value: results.filter(r => r.Sentiment === 'positive').length },
    { name: 'Neutros', value: results.filter(r => r.Sentiment === 'neutral').length },
    { name: 'Negativos', value: results.filter(r => r.Sentiment === 'negative').length },
  ];

  

  const getSentimentOverTimeData = (results) => {
    const data = results.reduce((acc, result) => {
      const date = new Date(result.Timestamp).toLocaleDateString();
      const existingEntry = acc.find(entry => entry.date === date);

      if (existingEntry) {
        existingEntry[result.Sentiment]++;
      } else {
        acc.push({
          date,
          positive: result.Sentiment === 'positive' ? 1 : 0,
          negative: result.Sentiment === 'negative' ? 1 : 0,
          neutral: result.Sentiment === 'neutral' ? 1 : 0,
        });
      }

      return acc;
    }, []);

    return data;
  };

  const sentimentOverTimeData = getSentimentOverTimeData(results);

  return (
    <div className="flex flex-col gap-22">
      {/* Seção 1: Cards de Resumo e Gráfico de Pizza */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <SentimentAnalysisSummary results={results} />
        </div>
        <div>
          <SentimentPieChart sentimentData={sentimentData} />
        </div>
      </div>
  
      {/* Seção 2: Gráfico de Linha (Abaixo dos Cards e Gráficos de Pizza) */}
      <div className="mt-8">
        <SentimentLineChart sentimentOverTimeData={sentimentOverTimeData} />
      </div>
    </div>
  );
  

};

export default SentimentAnalysisResults;

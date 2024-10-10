import React from 'react';
import {Typography, IconButton } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import MessageIcon from '@mui/icons-material/Message';

// Função para calcular a pontuação média dos sentimentos
function calculateAverageScore(results, sentimentType) {
  const filteredResults = results.filter(r => r.Sentiment === sentimentType);
  const totalScore = filteredResults.reduce((acc, result) => acc + result.Sentiment_Score, 0);
  return filteredResults.length > 0 ? (totalScore / filteredResults.length).toFixed(2) : 0;
}

const SentimentAnalysisSummary = ({ results }) => {
  const totalTweets = results.length;
  const positiveTweets = results.filter(r => r.Sentiment === 'positive').length;
  const negativeTweets = results.filter(r => r.Sentiment === 'negative').length;
  const neutralTweets = results.filter(r => r.Sentiment === 'neutral').length;

  const averagePositiveScore = calculateAverageScore(results, 'positive');
  const averageNegativeScore = calculateAverageScore(results, 'negative');
  const averageNeutralScore = calculateAverageScore(results, 'neutral');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-96"> {/* Altura igual ao gráfico */}
      <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center h-full">
        <div className="text-center">
          <IconButton>
            <MessageIcon className="text-blue-500" style={{ fontSize: 40 }} />
          </IconButton>
          <Typography variant="h6">Total de Tweets</Typography>
          <Typography variant="h4">{totalTweets}</Typography>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center h-full">
        <div className="text-center">
          <IconButton>
            <ThumbUpIcon className="text-green-600" style={{ fontSize: 40 }} />
          </IconButton>
          <Typography variant="h6">Positivos</Typography>
          <Typography variant="h4">{positiveTweets}</Typography>
          <Typography variant="body2">Pontuação Média: {averagePositiveScore}</Typography>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center h-full">
        <div className="text-center">
          <IconButton>
            <RemoveCircleIcon className="text-yellow-500" style={{ fontSize: 40 }} />
          </IconButton>
          <Typography variant="h6">Neutros</Typography>
          <Typography variant="h4">{neutralTweets}</Typography>
          <Typography variant="body2">Pontuação Média: {averageNeutralScore}</Typography>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center h-full">
        <div className="text-center">
          <IconButton>
            <ThumbDownIcon className="text-red-600" style={{ fontSize: 40 }} />
          </IconButton>
          <Typography variant="h6">Negativos</Typography>
          <Typography variant="h4">{negativeTweets}</Typography>
          <Typography variant="body2">Pontuação Média: {averageNegativeScore}</Typography>
        </div>
      </div>
    </div>
  );
};

export default SentimentAnalysisSummary;

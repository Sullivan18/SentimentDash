import React from 'react';
import { Typography, IconButton, Tooltip } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import CategoryIcon from '@mui/icons-material/Category';

const SentimentAnalysisSummary = ({ results, darkMode }) => {
  const totalTweets = results.length;
  const positiveTweets = results.filter(r => r.Sentiment === 'positive').length;
  const negativeTweets = results.filter(r => r.Sentiment === 'negative').length;
  const neutralTweets = results.filter(r => r.Sentiment === 'neutral').length;

  // Custom category counts
  const customFelicidade = results.filter(r => r.Custom_Category === 'felicidade').length;
  const customTristeza = results.filter(r => r.Custom_Category === 'tristeza').length;

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 h-96 ${darkMode ? 'bg-[#181a1b] text-[#e8e6e3]' : 'bg-white text-black'}`}>
      
      {/* Card para Total de Tweets */}
      <div className={`p-4 rounded-lg shadow-md flex items-center justify-center h-full ${darkMode ? 'bg-[#202225]' : 'bg-white'}`}>
        <div className="text-center">
          <Tooltip title="Número total de tweets analisados" placement="top" arrow>
            <IconButton>
              <CategoryIcon className="text-blue-500" style={{ fontSize: 40 }} />
            </IconButton>
          </Tooltip>
          <Typography variant="h6">Total de Tweets</Typography>
          <Typography variant="h4">{totalTweets}</Typography>
        </div>
      </div>

      {/* Card para Tweets Positivos */}
      <div className={`p-4 rounded-lg shadow-md flex items-center justify-center h-full ${darkMode ? 'bg-[#202225]' : 'bg-white'}`}>
        <div className="text-center">
          <Tooltip title="Número de tweets com sentimento positivo" placement="top" arrow>
            <IconButton>
              <ThumbUpIcon className="text-green-600" style={{ fontSize: 40 }} />
            </IconButton>
          </Tooltip>
          <Typography variant="h6">Positivos</Typography>
          <Typography variant="h4">{positiveTweets}</Typography>
        </div>
      </div>

      {/* Card para Tweets Neutros */}
      <div className={`p-4 rounded-lg shadow-md flex items-center justify-center h-full ${darkMode ? 'bg-[#202225]' : 'bg-white'}`}>
        <div className="text-center">
          <Tooltip title="Número de tweets com sentimento neutro" placement="top" arrow>
            <IconButton>
              <RemoveCircleIcon className="text-yellow-500" style={{ fontSize: 40 }} />
            </IconButton>
          </Tooltip>
          <Typography variant="h6">Neutros</Typography>
          <Typography variant="h4">{neutralTweets}</Typography>
        </div>
      </div>

      {/* Card para Tweets Negativos */}
      <div className={`p-4 rounded-lg shadow-md flex items-center justify-center h-full ${darkMode ? 'bg-[#202225]' : 'bg-white'}`}>
        <div className="text-center">
          <Tooltip title="Número de tweets com sentimento negativo" placement="top" arrow>
            <IconButton>
              <ThumbDownIcon className="text-red-600" style={{ fontSize: 40 }} />
            </IconButton>
          </Tooltip>
          <Typography variant="h6">Negativos</Typography>
          <Typography variant="h4">{negativeTweets}</Typography>
        </div>
      </div>

      {/* Novo Card para Custom Categories (Ocupando 2 colunas) */}
      <div className={`col-span-2 p-4 rounded-lg shadow-md flex items-center justify-center h-full ${darkMode ? 'bg-[#202225]' : 'bg-white'}`}>
        <div className="text-center">
          <Tooltip title="Categorias personalizadas baseadas no dicionário" placement="top" arrow>
            <IconButton>
              <CategoryIcon className="text-purple-600" style={{ fontSize: 40 }} />
            </IconButton>
          </Tooltip>
          <Typography variant="h6">Categorias Personalizadas</Typography>
          <Typography variant="body2">Felicidade: {customFelicidade}</Typography>
          <Typography variant="body2">Tristeza: {customTristeza}</Typography>
        </div>
      </div>
    </div>
  );
};

export default SentimentAnalysisSummary;

import React, { useState, useCallback } from 'react';
import SentimentAnalysisResults from './components/SentimentAnalysisResults';
import { CircularProgress } from '@mui/material';
import './index.css'; // Para incluir os estilos da barra de rolagem

function App() {
  const [twitterUsername, setTwitterUsername] = useState('');
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false); // Estado para controlar o modo escuro

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const fetchData = useCallback(async () => {
    if (!twitterUsername) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://539f-177-36-171-33.ngrok-free.app/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: twitterUsername }),
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar dados da API');
      }

      const data = await response.json();
      setApiResponse(data);
      setLoading(false);
    } catch (error) {
      setError('Erro ao obter os dados da API');
      setLoading(false);
    }
  }, [twitterUsername]);

  const handleInputChange = (event) => {
    setTwitterUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (twitterUsername) {
      fetchData();
    } else {
      alert('Por favor, insira um nome de usuário do Twitter');
    }
  };

  return (
    <div className={`App text-center p-6 min-h-screen ${darkMode ? 'bg-[#181a1b] text-[#e8e6e3] dark-scrollbar' : 'bg-gray-100 text-gray-900 light-scrollbar'}`}>
      <h1 className="text-3xl font-bold mb-6">Análise de Sentimentos de Tweets</h1>

      {/* Botão para alternar o tema */}
      <button
        className={`p-2 rounded mb-6 ${darkMode ? 'bg-gray-700 text-white' : 'bg-blue-500 text-white'}`}
        onClick={toggleDarkMode}
      >
        {darkMode ? 'Modo Claro' : 'Modo Escuro'}
      </button>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex justify-center items-center space-x-2">
          <input
            className={`border p-2 rounded w-full max-w-md ${darkMode ? 'bg-[#181a1b] text-[#e8e6e3]' : 'bg-white text-black'}`}
            type="text"
            placeholder="Nome de usuário do Twitter"
            value={twitterUsername}
            onChange={handleInputChange}
          />
          <button className={`p-2 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-blue-500 text-white'}`} type="submit" disabled={loading}>
            {loading ? 'Buscando...' : 'Analisar'}
          </button>
        </div>
      </form>

      {loading && (
        <div className="loading-container flex flex-col items-center">
          <CircularProgress />
          <p className="mt-4">Carregando análise de sentimentos...</p>
        </div>
      )}

      {error && <p className="text-red-500 font-bold">{error}</p>}

      {apiResponse && <SentimentAnalysisResults results={apiResponse.results} darkMode={darkMode} />}
    </div>
  );
}

export default App;

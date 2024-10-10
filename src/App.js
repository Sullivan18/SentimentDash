import React, { useState, useEffect } from 'react';
import SentimentAnalysisResults from './components/SentimentAnalysisResults';
import { CircularProgress } from '@mui/material';

function App() {
  const [twitterUsername, setTwitterUsername] = useState('');
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Função para buscar os dados da API
  const fetchData = async () => {
    if (!twitterUsername) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://b7ac-177-36-171-33.ngrok-free.app/scrape', {
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
  };

  // Atualizar a cada 30 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 30000); // 30 segundos

    return () => clearInterval(interval); // Limpar intervalo quando o componente desmonta
  }, [twitterUsername]); // A função de atualização é chamada quando o username muda

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
    <div className="App text-center p-6">
      <h1 className="text-3xl font-bold mb-6">Análise de Sentimentos de Tweets</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex justify-center items-center space-x-2">
          <input
            className="border p-2 rounded w-full max-w-md"
            type="text"
            placeholder="Nome de usuário do Twitter"
            value={twitterUsername}
            onChange={handleInputChange}
          />
          <button className="bg-blue-500 text-white p-2 rounded" type="submit" disabled={loading}>
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

      {apiResponse && <SentimentAnalysisResults results={apiResponse.results} />}
    </div>
  );
}

export default App;

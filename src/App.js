import React, { useState } from 'react';
import SentimentAnalysisResults from './components/SentimentAnalysisResults';
import { CircularProgress } from '@mui/material';

function App() {
  const [twitterUsername, setTwitterUsername] = useState('');
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setTwitterUsername(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!twitterUsername) {
      alert('Por favor, insira um nome de usuário do Twitter');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8001/scrape', {
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

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Importa os estilos
import App from './App';

// Função para aplicar a classe correta ao <body> com base no tema
const applyScrollbarTheme = (darkMode) => {
  if (darkMode) {
    document.body.classList.add('dark-scrollbar');
    document.body.classList.remove('light-scrollbar');
  } else {
    document.body.classList.add('light-scrollbar');
    document.body.classList.remove('dark-scrollbar');
  }
};

const Root = () => {
  const [darkMode, setDarkMode] = React.useState(false);

  // Aplica o tema de barra de rolagem com base no estado do modo escuro
  React.useEffect(() => {
    applyScrollbarTheme(darkMode);
  }, [darkMode]);

  return (
    <App darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);

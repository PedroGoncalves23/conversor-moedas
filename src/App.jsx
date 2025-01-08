import { useState, useEffect } from 'react';
import './App.css';

function App() {
  // aqui armazeno a moeda, iniciando como vazio 
  const [currencies, setCurrencies] = useState({});

  // aqui eu passo o estado como true,e enquanto a api nao retornar ele exibibe uma msg de carregamento
  // após a api retornar os dados eu passo ele como false
  const [loading, setLoading] = useState(true);

  // Usando o useEffect oara fazer a requisição da api
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch('https://openexchangerates.org/api/currencies.json');
        const data = await response.json();
        setCurrencies(data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar as moedas:', error);
        setLoading(false);
      }
    };

    fetchCurrencies();
  }, []);

  // Caso o estado de loading seja true, ele exibe essa mensagem
  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container">
      <h1>CONVERSOR DE MOEDAS</h1>
      <div className="data">
        <span>Selecione a moeda base</span>
        <select>
          {Object.keys(currencies).map((currencyCode) => (
            <option key={currencyCode} value={currencyCode}>
              {currencyCode} - {currencies[currencyCode]}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default App;

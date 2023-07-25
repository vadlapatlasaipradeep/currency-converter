import './App.css';
import React, { useState, useEffect } from 'react';
import CurrencyRow from './CurrencyRow';

const apiUrl = "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_sSIBppYSEa88NgapzcMxVruIMZrbENQKJDvsHG38";

function App() {
  const [currencies, setCurrencies] = useState({});

  useEffect(() => {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        setCurrencies(data.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <h1>Currency Exchange Rates</h1>
      <CurrencyRow currencies={currencies} />
    </div>
  );
}

export default App;

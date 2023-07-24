import './App.css';
import React, { useState, useEffect } from 'react';
import CurrencyRow from './CurrencyRow';
import './CurrencyRow.css'; // Import the CSS file for styling


const apiUrl = "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_Xl6AItWnS9WrA9MKa75uPx2R6D2cirgk9NtZAxav";

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
      <h2>Currency Exchange Rates</h2>
      <CurrencyRow currencies={currencies} />
    </div>
  );
}

export default App;

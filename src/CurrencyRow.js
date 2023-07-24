import React, { useState } from 'react';
import './CurrencyRow.css'; // Import the CSS file for styling

export default function CurrencyRow({ currencies }) {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [convertedAmount, setConvertedAmount] = useState(null); // Use null to hide the converted amount initially
  const [showShakeAnimation, setShowShakeAnimation] = useState(false); // State to control the shaking animation

  const currencyOptions = Object.keys(currencies).map(currency => (
    <option key={currency} value={currency}>
      {currency}
    </option>
  ));

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleFromCurrencyChange = (event) => {
    setFromCurrency(event.target.value);
    setConvertedAmount(null); // Reset convertedAmount when changing the "from" currency
  };

  const handleToCurrencyChange = (event) => {
    setToCurrency(event.target.value);
    setConvertedAmount(null); // Reset convertedAmount when changing the "to" currency
  };

  const handleConvert = () => {
    if (fromCurrency === '' || toCurrency === '' || amount === '') {
      // Check if any of the fields is not selected or empty
      setShowShakeAnimation(true); // Trigger the shake animation
      setConvertedAmount('Please complete all fields');

      // Reset the shake animation after 0.5 seconds (adjust the time as needed)
      setTimeout(() => {
        setShowShakeAnimation(false);
      }, 500);

      return;
    }

    const convertedValue = (amount / currencies[fromCurrency]) * currencies[toCurrency];
    if (isNaN(convertedValue)) {
      setConvertedAmount('Invalid Conversion');
    } else {
      setConvertedAmount(convertedValue.toFixed(2));
    }
  };

  return (
    <div className="currency-converter">
      <label htmlFor="currencyInput">Enter amount:</label>
      <input
        type="number"
        id="currencyInput"
        value={amount}
        onChange={handleAmountChange}
        placeholder="Please enter amount"
        className={showShakeAnimation && amount === '' ? 'shake-animation' : ''}
      />

      <label htmlFor="fromCurrencyDropdown">From Currency:</label>
      <div className="dropdown-container">
        <select
          id="fromCurrencyDropdown"
          value={fromCurrency}
          onChange={handleFromCurrencyChange}
          className={showShakeAnimation && fromCurrency === '' ? 'shake-animation' : ''}
        >
          <option value="">Please select</option>
          {currencyOptions}
        </select>
      </div>

      <label htmlFor="toCurrencyDropdown">To Currency:</label>
      <div className="dropdown-container">
        <select
          id="toCurrencyDropdown"
          value={toCurrency}
          onChange={handleToCurrencyChange}
          className={showShakeAnimation && toCurrency === '' ? 'shake-animation' : ''}
        >
          <option value="">Please select</option>
          {currencyOptions}
        </select>
      </div>
      <div> <button onClick={handleConvert}>Convert</button></div>

      {convertedAmount !== null && convertedAmount !== 'Please complete all fields' && convertedAmount !== 'Invalid Conversion' && (
        <p>
          {amount} {fromCurrency} is equal to {convertedAmount} {toCurrency}
        </p>
      )}
      {convertedAmount === 'Invalid Conversion' && (
        <p className="error-message">{convertedAmount}</p>
      )}
    </div>
  );
}

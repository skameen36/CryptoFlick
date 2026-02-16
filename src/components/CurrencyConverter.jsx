import React, { useState, useEffect, useRef } from 'react';

const ConverterSelect = ({ value, options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectedLabel = options.find(o => o.value === value)?.label || value;

  return (
      <div className="converter-select-container" ref={ref}>
          <div className="converter-select-trigger" onClick={() => setIsOpen(!isOpen)}>
              <span>{selectedLabel}</span>
              <span className={`custom-arrow ${isOpen ? 'rotated' : ''}`} style={{ marginLeft: '4px' }}></span>
          </div>
          {isOpen && (
              <div className="custom-dropdown-menu converter-dropdown">
                  {options.map(opt => (
                      <div 
                        key={opt.value} 
                        className={`custom-option ${opt.value === value ? 'selected' : ''}`}
                        onClick={() => { onSelect(opt.value); setIsOpen(false); }}
                      >
                          {opt.label}
                          {opt.value === value && <span className="check-mark">✓</span>}
                      </div>
                  ))}
              </div>
          )}
      </div>
  )
}

const CurrencyConverter = ({ data }) => {
  const [amount, setAmount] = useState(1);
  const [fromCoin, setFromCoin] = useState('bitcoin');
  const [toCurrency, setToCurrency] = useState('inr');
  const [result, setResult] = useState(0);

  // 1 USD is approx 90.56 INR currently.
  const USD_TO_INR_RATE = 90.56; 

  if (!data || data.length === 0) return null;

  const selectedCoin = data.find(c => c.id === fromCoin);
  const coinPriceUSD = selectedCoin?.current_price || 0;

  useEffect(() => {
    let finalPrice = coinPriceUSD;
    if (toCurrency === 'inr') {
        finalPrice = coinPriceUSD * USD_TO_INR_RATE;
    }
    
    setResult(amount * finalPrice);
  }, [amount, fromCoin, toCurrency, coinPriceUSD]);

  const currencySymbol = toCurrency === 'usd' ? '$' : '₹';

  const coinOptions = data.slice(0, 50).map(coin => ({
      value: coin.id,
      label: coin.symbol.toUpperCase()
  }));

  const currencyOptions = [
      { value: 'usd', label: 'USD' },
      { value: 'inr', label: 'INR' }
  ];

  return (
    <div className="highlight-card converter-card">
      <div className="card-header">
        <h3>💱 Crypto Converter</h3>
      </div>
      <div className="converter-form">
        <div className="conv-group">
          <input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
            className="conv-input"
            min="0"
          />
          <ConverterSelect 
            value={fromCoin}
            options={coinOptions}
            onSelect={setFromCoin}
          />
        </div>
        
        <div className="conv-arrow">⬇</div>

        <div className="conv-group">
          <div className="conv-result">
             {currencySymbol}{result.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </div>
          <ConverterSelect 
            value={toCurrency} 
            options={currencyOptions}
            onSelect={setToCurrency}
          />
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;

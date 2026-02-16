import React from 'react';
import { formatCurrency, formatPercentage, formatCompactNumber } from '../utils/formatters';

const CoinStats = ({ marketData, symbol }) => {
  if (!marketData) return null;

  const supplyPercent = (marketData.circulating_supply && marketData.max_supply) 
    ? (marketData.circulating_supply / marketData.max_supply) * 100 
    : 0;

  const StatCard = ({ label, value, subValue, subClass }) => (
    <div className="stat-card">
      <span className="stat-label">{label}</span>
      <span className="stat-value">{value}</span>
      {subValue && (
        <div className={`stat-sub ${subClass}`}>
          {subValue}
        </div>
      )}
    </div>
  );

  return (
    <div className="detail-section anim-section">
      <h3 className="section-title">Market Performance</h3>
      <div className="stats-grid">
        <StatCard 
          label="Market Cap" 
          value={formatCurrency(marketData.market_cap?.usd)} 
          subValue={formatPercentage(marketData.market_cap_change_percentage_24h)}
          subClass={(marketData.market_cap_change_percentage_24h || 0) >= 0 ? "positive" : "negative"}
        />
        <StatCard 
          label="Trading Volume (24h)" 
          value={formatCurrency(marketData.total_volume?.usd)} 
        />
        <StatCard 
          label="Fully Diluted Val" 
          value={formatCurrency(marketData.fully_diluted_valuation?.usd)} 
        />
        
        <div className="stat-card">
          <span className="stat-label">Circulating Supply</span>
          <span className="stat-value">
            {marketData.circulating_supply?.toLocaleString()} {symbol?.toUpperCase()}
          </span>
          {marketData.max_supply && (
            <div className="supply-group">
              <div className="supply-row">
                <span>{supplyPercent.toFixed(0)}% Minted</span>
              </div>
              <div className="supply-track">
                <div className="supply-fill" style={{width: `${supplyPercent}%`}}></div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="stats-grid" style={{marginTop: "1.5rem"}}>
        <StatCard label="24h High" value={formatCurrency(marketData.high_24h?.usd)} />
        <StatCard label="24h Low" value={formatCurrency(marketData.low_24h?.usd)} />
        
        <div className="stat-card">
           <span className="stat-label">All-Time High</span>
           <span className="stat-value">{formatCurrency(marketData.ath?.usd)}</span>
           {marketData.ath_date?.usd && <span className="stat-label" style={{fontSize: "0.8rem"}}>{new Date(marketData.ath_date.usd).toLocaleDateString()}</span>}
           {marketData.ath_change_percentage?.usd && <span className="negative" style={{fontSize: "0.9rem"}}>{marketData.ath_change_percentage.usd.toFixed(2)}%</span>}
        </div>
        
        <div className="stat-card">
           <span className="stat-label">All-Time Low</span>
           <span className="stat-value">{formatCurrency(marketData.atl?.usd)}</span>
            {marketData.atl_date?.usd && <span className="stat-label" style={{fontSize: "0.8rem"}}>{new Date(marketData.atl_date.usd).toLocaleDateString()}</span>}
           {marketData.atl_change_percentage?.usd && <span className="positive" style={{fontSize: "0.9rem"}}>+{marketData.atl_change_percentage.usd.toFixed(2)}%</span>}
        </div>
      </div>
    </div>
  );
};

export default CoinStats;

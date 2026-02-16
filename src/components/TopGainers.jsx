import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

const TopGainers = ({ data }) => {
  const gainers = useMemo(() => {
    if (!data || !Array.isArray(data) || data.length === 0) return [];
    // Clone and sort by price change percentage descending
    return [...data]
      .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
      .slice(0, 4);
  }, [data]);

  if (gainers.length === 0) return null;

  return (
    <div className="highlight-card gainer-card">
      <div className="card-header">
        <h3>🚀 Top Gainers (24h)</h3>
      </div>
      <div className="trending-list">
        {gainers.map((coin) => (
          <Link to={`/coin/${coin.id}`} key={coin.id} className="trending-item">
             <div className="trending-info">
              <img src={coin.image} alt={coin.name} className="trending-icon" />
              <span className="trending-name">{coin.symbol.toUpperCase()}</span>
            </div>
            <div className={`trending-change positive`}>
              +{coin.price_change_percentage_24h.toFixed(2)}%
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopGainers;

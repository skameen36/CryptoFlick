import React from 'react';
import { formatCurrency, formatPercentage } from '../utils/formatters';

const CoinHeader = ({ coin }) => {
  if (!coin) return null;

  const currentPrice = coin.market_data?.current_price?.usd || 0;
  const priceChange = coin.market_data?.price_change_percentage_24h || 0;
  const isPositive = priceChange >= 0;

  return (
    <div className="details-header anim-header">
      <div className="coin-identity">
        <div className="coin-logo-wrapper">
          <img
            src={coin.image?.large || "https://via.placeholder.com/64"}
            alt={coin.name}
            className="coin-logo-detail"
          />
        </div>
        <div className="coin-title-group">
          <h1>
            {coin.name}
            <span className="coin-rank">#{coin.market_cap_rank || "N/A"}</span>
          </h1>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <span className="coin-ticker">{coin.symbol?.toUpperCase()}</span>
            {coin.categories && coin.categories.slice(0, 3).map((cat, i) => (
              <span className="tag" key={i}>{cat}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="coin-price-block anim-header">
        <span className="detail-price">
          {formatCurrency(currentPrice)}
        </span>
        <div
          className={`detail-change ${isPositive ? "positive" : "negative"}`}
          style={{
            background: isPositive ? "rgba(76, 175, 80, 0.12)" : "rgba(244, 67, 54, 0.12)",
            border: `1px solid ${isPositive ? "rgba(76, 175, 80, 0.3)" : "rgba(244, 67, 54, 0.3)"}`
          }}
        >
          {isPositive ? "📈" : "📉"} {formatPercentage(priceChange)} (24h)
        </div>
      </div>
    </div>
  );
};

export default CoinHeader;

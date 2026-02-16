import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const TrendingCoins = () => {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/search/trending`);
        const data = await res.json();
        setTrending(data.coins.slice(0, 4)); // Get top 4 trending
      } catch (error) {
        console.error("Error fetching trending coins:", error);
      }
    };

    fetchTrending();
  }, []);

  if (trending.length === 0) return null;

  return (
    <div className="highlight-card trending-card">
      <div className="card-header">
        <h3>🔥 Trending Now</h3>
      </div>
      <div className="trending-list">
        {trending.map((item) => (
          <Link to={`/coin/${item.item.id}`} key={item.item.id} className="trending-item">
            <div className="trending-info">
              <img src={item.item.small} alt={item.item.name} className="trending-icon" />
              <span className="trending-name">{item.item.symbol}</span>
            </div>
            <div className="trending-rank">#{item.item.market_cap_rank}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TrendingCoins;

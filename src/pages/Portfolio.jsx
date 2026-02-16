import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, Navigate } from 'react-router-dom';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useTheme } from '../context/ThemeContext';

ChartJS.register(ArcElement, Tooltip, Legend);

const Portfolio = () => {
    const { user } = useAuth();
    const { theme } = useTheme();

    if (!user) {
        return <Navigate to="/login" />;
    }

    const [holdings, setHoldings] = useState([]);
    const [coinId, setCoinId] = useState('');
    const [amount, setAmount] = useState('');
    const [price, setPrice] = useState('');
    const [loading, setLoading] = useState(false);
    const [currentPrices, setCurrentPrices] = useState({});
    const [error, setError] = useState('');

    const formRef = useRef(null);

    // Load data
    useEffect(() => {
        const stored = localStorage.getItem(`portfolio-${user.email}`);
        if (stored) {
            setHoldings(JSON.parse(stored));
        }
    }, [user.email]);

    // Fetch prices
    useEffect(() => {
        if (holdings.length === 0) return;

        const fetchPrices = async () => {
             const ids = [...new Set(holdings.map(h => h.id))].join(',');
             try {
                 const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/simple/price?ids=${ids}&vs_currencies=usd,btc&include_24hr_change=true`);
                 const data = await response.json();
                 setCurrentPrices(data);
             } catch (err) {
                 console.error("Failed to fetch prices:", err);
             }
        };

        fetchPrices();
        const interval = setInterval(fetchPrices, 60000);
        return () => clearInterval(interval);
    }, [holdings]);

    // Animations
    useGSAP(() => {
        const tl = gsap.timeline();
        tl.from(".portfolio-header", { y: -20, opacity: 0, duration: 0.6 })
          .from(".stat-card", { y: 20, opacity: 0, duration: 0.5, stagger: 0.1 }, "-=0.3")
          .from(".chart-section", { scale: 0.95, opacity: 0, duration: 0.6 }, "-=0.2")
          .from(".holdings-section", { y: 30, opacity: 0, duration: 0.6 }, "-=0.4");
    });

    const handleAddHolding = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/coins/${coinId.toLowerCase()}`);
            if (!res.ok) throw new Error("Invalid Coin ID (e.g. bitcoin, ethereum)");
            const data = await res.json();

            const newHolding = {
                id: data.id,
                name: data.name,
                symbol: data.symbol,
                image: data.image.small,
                amount: parseFloat(amount),
                buyPrice: parseFloat(price) || data.market_data.current_price.usd,
                timestamp: Date.now()
            };

            const updatedHoldings = [...holdings, newHolding];
            setHoldings(updatedHoldings);
            localStorage.setItem(`portfolio-${user.email}`, JSON.stringify(updatedHoldings));
            
            setCoinId('');
            setAmount('');
            setPrice('');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const removeHolding = (index) => {
        const updated = holdings.filter((_, i) => i !== index);
        setHoldings(updated);
        localStorage.setItem(`portfolio-${user.email}`, JSON.stringify(updated));
    };

    // Calculations
    let totalValue = 0;
    let totalCost = 0;
    let bestPerformer = { name: '-', percent: -Infinity };
    let worstPerformer = { name: '-', percent: Infinity };

    holdings.forEach(h => {
        const currentPrice = currentPrices[h.id]?.usd || 0;
        const value = currentPrice * h.amount;
        const cost = h.buyPrice * h.amount;
        const profitPercent = cost > 0 ? ((value - cost) / cost) * 100 : 0;

        totalValue += value;
        totalCost += cost;

        if (profitPercent > bestPerformer.percent) bestPerformer = { name: h.name, percent: profitPercent, symbol: h.symbol };
        if (profitPercent < worstPerformer.percent) worstPerformer = { name: h.name, percent: profitPercent, symbol: h.symbol };
    });

    const totalProfit = totalValue - totalCost;
    const totalProfitPercent = totalCost > 0 ? (totalProfit / totalCost) * 100 : 0;

    // Chart Data
    const chartData = {
        labels: holdings.map(h => h.symbol.toUpperCase()),
        datasets: [
            {
                data: holdings.map(h => (currentPrices[h.id]?.usd || 0) * h.amount),
                backgroundColor: [
                    '#58a6ff', '#0969da', '#2da94f', '#bc8cff', '#d2a8ff', '#ff7b72', '#fd8c73'
                ],
                borderColor: theme === 'dark' ? '#0d1117' : '#ffffff',
                borderWidth: 2,
            },
        ],
    };

    const chartOptions = {
        plugins: {
            legend: {
                position: 'right',
                labels: { color: theme === 'dark' ? '#c9d1d9' : '#24292f' }
            }
        },
        maintainAspectRatio: false
    };

    return (
        <div className="portfolio-page">
            <header className="portfolio-header">
                <h1>Hi, {user.name} 👋</h1>
                <p>Here's your crypto portfolio overview</p>
            </header>

            {/* Top Stats Row */}
            <div className="portfolio-stats-grid">
                <div className="stat-card">
                    <div className="stat-icon">💰</div>
                    <h3>Net Worth</h3>
                    <div className="value">${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">📈</div>
                    <h3>Total Profit</h3>
                    <div className={`value ${totalProfit >= 0 ? 'positive' : 'negative'}`}>
                        {totalProfit >= 0 ? '+' : ''}${totalProfit.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                        <div className="sub-stat">{totalProfitPercent.toFixed(2)}% ROI</div>
                    </div>
                </div>
                <div className="stat-card">
                     <div className="stat-icon">🏆</div>
                    <h3>Best Performer</h3>
                    <div className="value" style={{fontSize: '1.5rem'}}>{bestPerformer.symbol?.toUpperCase() || '-'}</div>
                    <div className="sub-stat positive">
                        {bestPerformer.percent !== -Infinity ? `+${bestPerformer.percent.toFixed(2)}%` : '0.00%'}
                    </div>
                </div>
            </div>

            <div className="portfolio-main-grid">
                
                {/* Left Column: Chart & Add Form */}
                <div className="portfolio-sidebar">
                    {/* Allocation Chart */}
                    <div className="card chart-section" style={{ minHeight: '300px', marginBottom: '2rem' }}>
                        <h3>Asset Allocation</h3>
                        {holdings.length > 0 ? (
                            <div style={{ height: '220px' }}>
                                <Doughnut data={chartData} options={chartOptions} />
                            </div>
                        ) : (
                            <div className="empty-chart">Add assets to see breakdown</div>
                        )}
                    </div>

                     {/* Add Asset Form */}
                     <div className="card add-form-section">
                        <h3>Add New Asset</h3>
                        {error && <div className="error-msg">{error}</div>}
                        <form onSubmit={handleAddHolding} ref={formRef}>
                            <div className="form-group">
                                <label>Coin ID</label>
                                <input 
                                    type="text" 
                                    value={coinId}
                                    onChange={(e) => setCoinId(e.target.value)}
                                    placeholder="e.g. bitcoin"
                                    className="form-input"
                                    required 
                                />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Amount</label>
                                    <input 
                                        type="number" 
                                        step="any"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder="0.00"
                                        className="form-input"
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Buy Price</label>
                                    <input 
                                        type="number" 
                                        step="any"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        placeholder="$ Current"
                                        className="form-input"
                                    />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                                {loading ? 'Adding...' : 'Add to Portfolio'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Right Column: Holdings List */}
                <div className="card holdings-section">
                    <div className="section-header">
                        <h3>Your Assets</h3>
                        <span className="badge">{holdings.length} Coins</span>
                    </div>
                    
                    {holdings.length === 0 ? (
                        <div className="empty-state">
                            <span style={{fontSize: '3rem'}}>👛</span>
                            <p>Your portfolio is empty.</p>
                            <p>Add your first coin to start tracking!</p>
                        </div>
                    ) : (
                        <div className="holdings-table-container">
                            <table className="holdings-table">
                                <thead>
                                    <tr>
                                        <th>Asset</th>
                                        <th>Balance</th>
                                        <th>Price</th>
                                        <th>Value</th>
                                        <th>Returns</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {holdings.map((h, i) => {
                                        const currentPrice = currentPrices[h.id]?.usd || 0;
                                        const value = currentPrice * h.amount;
                                        const cost = h.buyPrice * h.amount;
                                        const profit = value - cost;
                                        const profitPercent = cost > 0 ? (profit / cost) * 100 : 0;
                                        const priceChange24h = currentPrices[h.id]?.usd_24h_change || 0;

                                        return (
                                            <tr key={i}>
                                                <td className="asset-col">
                                                    <Link to={`/coin/${h.id}`} className="asset-link">
                                                        <img src={h.image} alt={h.name} width="32" />
                                                        <div>
                                                            <span className="name">{h.name}</span>
                                                            <span className="symbol">{h.symbol.toUpperCase()}</span>
                                                        </div>
                                                    </Link>
                                                </td>
                                                <td>
                                                    <div className="amount">{h.amount}</div>
                                                </td>
                                                <td>
                                                    <div className="price">${currentPrice.toLocaleString()}</div>
                                                    <div className={`price-change-sm ${priceChange24h >= 0 ? 'positive' : 'negative'}`}>
                                                        {priceChange24h.toFixed(2)}%
                                                    </div>
                                                </td>
                                                <td className="value-col">${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                                                <td>
                                                    <div className={`profit-val ${profit >= 0 ? 'positive' : 'negative'}`}>
                                                       {profit >= 0 ? '+' : ''}{profit.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                                    </div>
                                                    <div className={`profit-pct ${profit >= 0 ? 'positive' : 'negative'}`}>
                                                        {profitPercent.toFixed(2)}%
                                                    </div>
                                                </td>
                                                <td>
                                                    <button onClick={() => removeHolding(i)} className="btn-icon delete" title="Remove Asset">×</button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Portfolio;

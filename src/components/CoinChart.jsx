import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useTheme } from '../context/ThemeContext';
import { CHART_COLORS, THEME } from '../utils/constants';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const CoinChart = ({ sparkline, theme }) => {
  const isDark = theme === THEME.DARK;
  const colors = isDark ? CHART_COLORS.DARK : CHART_COLORS.LIGHT;

  const getChartData = (prices) => {
    if (!prices) return { labels: [], datasets: [] };
    
    const labels = prices.map((_, i) => i);
    
    return {
      labels,
      datasets: [
        {
          fill: true,
          label: 'Price (7d)',
          data: prices,
          borderColor: colors.borderColor,
          backgroundColor: colors.backgroundColor,
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 4,
          tension: 0.4,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: colors.tooltipBg,
        titleColor: colors.tooltipTitle,
        bodyColor: colors.tooltipBody,
        borderColor: colors.tooltipBorder,
        borderWidth: 1,
        displayColors: false,
        padding: 10,
        callbacks: {
          label: (context) => `$${context.parsed.y.toLocaleString()}`,
          title: () => '',
        }
      },
    },
    scales: {
      x: { display: false },
      y: { 
        display: false,
        grace: '5%' 
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  };

  return (
    <div className="anim-header" style={{ marginBottom: "3rem", height: "300px", background: "var(--chart-bg)", borderRadius: "16px", padding: "1rem", border: "1px solid var(--border-color)", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
      {sparkline?.price ? (
        <Line 
          data={getChartData(sparkline.price)} 
          options={chartOptions} 
        />
      ) : (
        <div style={{height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-secondary)"}}>
          No chart data available
        </div>
      )}
    </div>
  );
};

export default CoinChart;

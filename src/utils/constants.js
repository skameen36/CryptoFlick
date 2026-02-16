export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://api.coingecko.com/api/v3";

export const COIN_GECKO_API = {
  MARKETS: `${API_BASE_URL}/coins/markets`,
  COIN_DETAILS: (id) => `${API_BASE_URL}/coins/${id}`,
};

export const DEFAULT_CURRENCY = 'usd';

export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
};

export const CHART_COLORS = {
  DARK: {
    borderColor: '#58a6ff',
    backgroundColor: 'rgba(88, 166, 255, 0.15)',
    tooltipBg: 'rgba(22, 27, 34, 0.9)',
    tooltipTitle: '#8b949e',
    tooltipBody: '#f0f0f0',
    tooltipBorder: 'rgba(255,255,255,0.1)',
  },
  LIGHT: {
    borderColor: '#0969da',
    backgroundColor: 'rgba(9, 105, 218, 0.1)',
    tooltipBg: 'rgba(255, 255, 255, 0.95)',
    tooltipTitle: '#65676b',
    tooltipBody: '#1a1a1a',
    tooltipBorder: 'rgba(0,0,0,0.1)',
  }
};

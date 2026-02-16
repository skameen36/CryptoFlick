# CryptoFlick 🚀

**CryptoFlick** is a professional, high-performance cryptocurrency dashboard designed for real-time market tracking and analysis. Built with **React** and **Vite**, it features a sleek, glassmorphism-inspired UI with seamless dark/light mode switching, interactive charts, and robust data visualization.

![CryptoFlick Banner](https://via.placeholder.com/1200x400?text=CryptoFlick+Dashboard+Standard)
_(Replace with actual screenshot)_

## 🌟 Key Features

- **Real-Time Market Data**: Live tracking of top cryptocurrencies including price, 24h change, market cap, and volume.
- **Interactive Analytics**: Dynamic 7-day price trend visualization using **Chart.js**.
- **Detailed Asset Insights**: Comprehensive data breakdown for individual assets (Circulating Supply, ATH/ATL, Developer Score, Community Stats).
- **Advanced Search & Filtering**: Precise sorting (Market Cap, Winners/Losers) and instant search capabilities.
- **Portfolio Management**: Track your personal holdings with a simulated portfolio feature.
- **Currency Converter**: Real-time crypto-to-fiat conversion tool.
- **Adaptive Theming**: Native Dark/Light mode support with persistent user preference.
- **Optimized Performance**: Implements **Lazy Loading**, **Memoization**, and **Virtualization** best practices for optimal rendering speed.

## 🛠️ Technology Stack

- **Core**: [React 18](https://reactjs.org/) (Hooks, Context API)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: Modern CSS3 (Variables, Flexbox/Grid, Glassmorphism)
- **Animation**: [GSAP](https://greensock.com/gsap/) (GreenSock Animation Platform)
- **Visualization**: [React-Chartjs-2](https://react-chartjs-2.js.org/)
- **Routing**: [React Router v6](https://reactrouter.com/)
- **Data Source**: [CoinGecko API](https://www.coingecko.com/en/api)

## 📂 Project Structure

Verified codebase structure focused on modularity and scalability:

```bash
src/
├── components/      # Reusable UI components (Barrel Exported)
│   ├── CoinCard/    # Memoized coin display component
│   ├── Chart/       # Interactive pricing charts
│   └── Navbar/      # Responsive navigation with Auth state
├── pages/           # Route views (Home, CoinDetails, Portfolio, Auth)
├── context/         # Global state (ThemeContext, AuthContext)
├── utils/           # Helper functions (Formatters, Constants)
└── hooks/           # Custom React hooks (useTheme, useAuth)
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/skameen36/crypto-flick.git
    cd crypto-flick
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Configure Environment**
    Create a `.env` file in the root directory:

    ```env
    VITE_API_BASE_URL=https://api.coingecko.com/api/v3
    ```

4.  **Run Locally**
    ```bash
    npm run dev
    ```

## 📈 Performance Optimizations

- **Lazy Loading**: Route-based code splitting using `React.lazy` and `Suspense`.
- **Memoization**: `React.memo` and `useMemo` implemented for list rendering and filtering logic to prevent unnecessary re-renders.
- **Efficient Asset Loading**: Image lazy loading attributes and optimized asset delivery.

## 👨‍💻 Author

**Shaikh Ameen**  
Full Stack Developer & UI/UX Specialist

- **Portfolio**: [View Portfolio](https://portfolio-85a42.web.app/)
- **GitHub**: [@skameen36](https://github.com/skameen36)
- **LinkedIn**: [Connect on LinkedIn](https://www.linkedin.com/in/ameen-shaikh-972b2b233/)

---

_© 2026 CryptoFlick. All rights reserved._

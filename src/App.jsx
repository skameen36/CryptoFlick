import { useEffect, useState, Suspense, lazy, useRef } from "react";
import {  Routes, Route } from "react-router-dom";
import { Navbar, LoadingSpinner } from "./components";
import { ThemeProvider } from "./context/ThemeContext";
import { API_BASE_URL } from "./utils/constants";
import { AuthProvider } from "./context/AuthContext";

// Lazy Loaded Pages
const Home = lazy(() => import("./pages/HomePage"));
const About = lazy(() => import("./pages/About"));
const CoinDetails = lazy(() => import("./pages/CoinDetails"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const NotFound = lazy(() => import("./pages/NotFound"));

const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Persist state
  const [limit, setLimit] = useState(() => {
    const saved = localStorage.getItem("crypto-limit");
    const parsed = parseInt(saved, 10);
    return !isNaN(parsed) && parsed > 0 ? parsed : 10;
  });
  const [input, setInput] = useState(() => {
     return localStorage.getItem("crypto-search") || "";
  });
  const [sortBy, setSortBy] = useState(() => {
     return localStorage.getItem("crypto-sort") || "market_cap_desc";
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null); // Clear previous errors
      const res = await fetch(
        `${API_BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`
      );

      if (!res.ok) {
        if (res.status === 429) {
          throw new Error("Rate limit exceeded. Please wait a moment and try again.");
        }
        throw new Error(`Network response was not ok (Status: ${res.status})`);
      }
      const result = await res.json();
      setData(result);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    fetchData();
  }, []); // Only fetch once on mount

  // Filter based on limit locally
  const displayData = data.slice(0, limit);
  
  // Save to local storage on change
  useEffect(() => {
     localStorage.setItem("crypto-limit", limit);
  }, [limit]);

   useEffect(() => {
     localStorage.setItem("crypto-search", input);
  }, [input]);

   useEffect(() => {
     localStorage.setItem("crypto-sort", sortBy);
  }, [sortBy]);

  return (
    <ThemeProvider>
      <AuthProvider>
      <div className="app-container">
        <Navbar />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  data={displayData}
                  fullData={data} // Pass full data for converter/gainers
                  loading={loading}
                  error={error}
                  limit={limit}
                  setLimit={setLimit}
                  input={input}
                  setInput={setInput} // Pass this down directly now, will handle debouncing in SearchFilter
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                />
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/coin/:id" element={<CoinDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

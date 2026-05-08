import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useTheme } from "../context/ThemeContext";
import { COIN_GECKO_API } from "../utils/constants";
import { CoinHeader, CoinChart, CoinStats, CoinInfo } from "../components";

const CoinDetails = () => {
  const { id } = useParams();
  const { theme } = useTheme();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedDesc, setExpandedDesc] = useState(false);

  const containerRef = useRef(null);

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        setLoading(true);
        // Using the constant for API URL construction
        const res = await fetch(
            `${COIN_GECKO_API.COIN_DETAILS(id)}?localization=false&tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=true`,{}
        );
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        setCoin(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCoin();
  }, [id]);

  useGSAP(
    () => {
      if (!loading && coin) {
        const tl = gsap.timeline();

         // Header staggered
        tl.from(".anim-header", {
          y: -20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        });

        // Sections slide up
        tl.from(".anim-section", {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
        }, "-=0.4");

        // Floating logo (if it exists in CoinHeader)
        gsap.to(".coin-logo-detail", {
          y: -5,
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    },
    { dependencies: [loading, coin], scope: containerRef }
  );

  if (loading) {
     return (
        <div className="skeleton-grid" style={{marginTop: "100px"}}>
           <div className="skeleton-card" style={{height: "400px"}}></div>
           <div className="skeleton-card"></div>
           <div className="skeleton-card"></div>
        </div>
     ); 
  }

  if (error) return <div className="error-page"><h2>Error: {error}</h2></div>;
  if (!coin) return null;

  return (
    <div className="coin-details-page" ref={containerRef}>
      <CoinHeader coin={coin} />
      
      <CoinChart sparkline={coin.market_data?.sparkline_7d} theme={theme} />

      <CoinStats marketData={coin.market_data} symbol={coin.symbol} />

      <CoinInfo links={coin.links} />

      {/* --- MARKETS --- */}
      {coin.tickers && coin.tickers.length > 0 && (
         <div className="detail-section anim-section">
             <h3 className="section-title">Top Markets</h3>
             <div className="market-table-container">
                <table className="market-table">
                   <thead>
                      <tr>
                         <th>Exchange</th>
                         <th>Pair</th>
                         <th>Price</th>
                         <th>Volume (24h)</th>
                         <th>Trust</th>
                      </tr>
                   </thead>
                   <tbody>
                      {coin.tickers.slice(0, 5).map((ticker, i) => (
                         <tr key={i}>
                            <td>{ticker.market?.name || "N/A"}</td>
                            <td style={{color: "#58a6ff"}}>{ticker.base}/{ticker.target}</td>
                            <td>${ticker.last?.toLocaleString()}</td>
                            <td>${ticker.volume?.toLocaleString()}</td>
                            <td>
                               <span className={`trust-score-${ticker.trust_score}`}>
                                  ● {(ticker.trust_score || "unknown").toUpperCase()}
                               </span>
                            </td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>
         </div>
      )}
      
      {/* --- DESCRIPTION --- */}
      {coin.description?.en && (
         <div className="coin-description-section anim-section">
            <h2>About {coin.name}</h2>
            <div 
               className="description-text"
               dangerouslySetInnerHTML={{ 
                  __html: expandedDesc 
                     ? coin.description.en 
                     : coin.description.en.split(". ")[0] + "." 
               }}
            />
             {coin.description.en.length > 200 && (
                <button 
                  className="btn" 
                  style={{ marginTop: "1rem" }}
                  onClick={() => setExpandedDesc(!expandedDesc)}
               >
                  {expandedDesc ? "Read Less" : "Read More"}
               </button>
             )}
         </div>
      )}
    </div>
  );
};

export default CoinDetails;

import { useEffect, useMemo, useState } from "react";
import { 
  SearchFilter, 
  SortBy, 
  SkeletonLoader, 
  LimitPages, 
  CoinCard, 
  TrendingCoins, 
  TopGainers, 
  CurrencyConverter 
} from "../components";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Home = (
  {
    data,
    fullData,
    loading,
    error,
    limit,
    setLimit,
    input,
    setInput,
    sortBy,
    setSortBy
  }
) => {

  console.log("HOME COMPONENT RENDERED");

  const filtered = useMemo(() => {
    return data
      .filter((coin) => {
        return (
          coin?.name.toLowerCase().includes(input.toLowerCase()) ||
          coin?.symbol.toLowerCase().includes(input.toLowerCase())
        );
      })
      .slice()
      .sort((a, b) => {
        switch (sortBy) {
          case "market_cap_desc":
            return b.market_cap - a.market_cap;
          case "market_cap_asc":
            return a.market_cap - b.market_cap;
          case "price_desc":
            return b.current_price - a.current_price;
          case "price_asc":
            return a.current_price - b.current_price;
          case "change_desc":
            return (
              b.price_change_percentage_24h - a.price_change_percentage_24h
            );
          case "change_asc":
            return (
              a.price_change_percentage_24h - b.price_change_percentage_24h
            );
          default:
            return 0;
        }
      });
  }, [data, input, sortBy]);

  useGSAP(() => {
    if (loading || error) return;
    
    const tl = gsap.timeline();
    
    // Animate highlights
    tl.from(".highlights-grid", { 
      y: -20, 
      opacity: 0, 
      duration: 0.8, 
      ease: "power2.out" 
    })
    .from(".controls-wrapper", { 
      y: -10, 
      opacity: 0, 
      duration: 0.6 
    }, "-=0.4");
    
  }, [loading, error]);

  if (loading) {
    return (
      <>
      <div className="home-container">
        <div className="controls-wrapper" style={{ display: 'flex', justifyContent: 'flex-end', padding: '100px 2rem 1rem', marginTop: "20px" }}>
            <div className="controls" style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <SearchFilter text={input} setText={setInput} />
            <LimitPages pages={limit} setPages={setLimit} />
            <SortBy Change={sortBy} onSetChange={setSortBy} />
            </div>
        </div>
        <div style={{ padding: '0 2rem 2rem' }}>
             <SkeletonLoader count={limit} />
        </div>
      </div>
      </>
    );
  }
  if (error) return <h2 className="error">Error: {error}</h2>;

  return (
    <>
      <div className="home-container">
        <div className="controls-wrapper">
          <div className="controls">
            <SearchFilter text={input} setText={setInput} />
            <LimitPages pages={limit} setPages={setLimit} />
            <SortBy Change={sortBy} onSetChange={setSortBy} />
          </div>
        </div>

        <main className="grid" style={{ padding: '0 2rem 2rem' }}>
          {filtered.length > 0 ? (
            filtered.map((coin) => <Link to={`/coin/${coin.id}`} key={coin.id}><CoinCard {...coin} /></Link>)
          ) : (
            <h1>No coins found.</h1>
          )}
        </main>

        {/* Highlights Section - Moved to Bottom */}
        <div className="highlights-grid" style={{ marginBottom: '2rem' }}>
           <TrendingCoins />
           <TopGainers data={fullData || data} />
           <CurrencyConverter data={fullData || data} />
        </div>
      </div>
    </>
  );
}

export default Home
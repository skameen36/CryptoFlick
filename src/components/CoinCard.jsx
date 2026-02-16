import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { formatCurrency, formatPercentage } from "../utils/formatters";

const CoinCard = ({
  name = "Unknown",
  symbol = "",
  image = "https://via.placeholder.com/64",
  current_price = 0,
  price_change_24h = 0,
  market_cap = 0,
}) => {
  const cardRef = useRef(null);
  const innerRef = useRef(null);
  
  useGSAP(
    () => {
      const card = cardRef.current;
      if (!card) return;

      // Initial entrance animation
      gsap.fromTo(
        card,
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "cubic.out",
        }
      );

      // Mouse move 3D effect
      const handleMouseMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * 10;
        const rotateY = ((x - centerX) / centerX) * -10;

        gsap.to(innerRef.current, {
          rotationX: rotateX,
          rotationY: rotateY,
          transformOrigin: "center center",
          duration: 0.5,
          overwrite: "auto",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(innerRef.current, {
          rotationX: 0,
          rotationY: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.5)",
        });
      };

      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseleave", handleMouseLeave);
      };
    },
    { scope: cardRef }
  );

  const isPositive = price_change_24h >= 0;

  return (
    <div ref={cardRef} className="coin-card-wrapper">
      <div ref={innerRef} className="coin-card-inner">
        <div className="coin-card">
          {/* Header Section */}
          <div className="coin-header">
            <div className="coin-image-wrapper">
              <img src={image} alt={name} className="coin-image" loading="lazy" />
            </div>
            <div className="coin-name-section">
              <h2 className="coin-name">{name}</h2>
              <p className="symbol">{symbol.toUpperCase()}</p>
            </div>
          </div>

          {/* Price Section */}
          <div className="coin-price-section">
            <div className="price-box">
              <span className="price-label">Current Price</span>
              <p className="price-value">{formatCurrency(current_price)}</p>
            </div>
          </div>

          {/* Change Indicator */}
          <div className={`coin-change ${isPositive ? "positive" : "negative"}`}>
            <span className="change-icon">
              {isPositive ? "📈" : "📉"}
            </span>
            <span className="change-value">
              {formatPercentage(price_change_24h)}
            </span>
          </div>

          {/* Market Cap Section */}
          <div className="coin-market-cap">
            <span className="market-cap-label">Market Cap</span>
            <p className="market-cap-value">
              {formatCurrency(market_cap)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CoinCard);



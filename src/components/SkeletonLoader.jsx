import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const SkeletonLoader = ({ count = 10 }) => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const skeletons = containerRef.current?.querySelectorAll('.skeleton-card');

      if (skeletons && skeletons.length > 0) {
        // Staggered entrance animation
        gsap.fromTo(
          skeletons,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: 'cubic.out',
          }
        );
      }
    },
    { scope: containerRef, dependencies: [count] }
  );

  return (
    <div className="skeleton-grid" ref={containerRef}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="skeleton-card">
          <div className="skeleton-header">
            <div className="skeleton-image"></div>
            <div className="skeleton-text-group">
              <div className="skeleton-text skeleton-text-lg"></div>
              <div className="skeleton-text skeleton-text-sm"></div>
            </div>
          </div>

          <div className="skeleton-content">
            <div className="skeleton-text skeleton-text-md"></div>
            <div className="skeleton-text skeleton-text-md"></div>
            <div className="skeleton-text skeleton-text-md"></div>
            <div className="skeleton-text skeleton-text-sm"></div>
          </div>

          <div className="skeleton-footer">
            <div className="skeleton-text skeleton-text-md"></div>
            <div className="skeleton-text skeleton-text-md"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;

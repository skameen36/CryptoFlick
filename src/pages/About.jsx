import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const About = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // Hero Animation
      tl.from(".about-title", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
      })
      .from(".about-subtitle", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.5");

      // Features Animation
      tl.fromTo(".feature-card", 
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.2)",
        },
        "-=0.3"
      );

       // Developer Section Animation
       tl.fromTo(".developer-section", 
        { y: 40, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          ease: "power2.out" 
        }, 
        "-=0.2"
      );
      
      // Floating Background Spheres
      gsap.to(".bg-gradient-sphere", {
          y: "30px",
          rotation: 5,
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
      });

    },
    { scope: containerRef }
  );

  return (
    <div className="about-page" ref={containerRef}>
      
      {/* Background Decor */}
      <div className="bg-gradient-sphere" style={{top: "-10%", left: "-10%"}}></div>
      <div className="bg-gradient-sphere" style={{bottom: "10%", right: "-10%", width: "400px", height: "400px", animationDelay: "2s"}}></div>

      {/* Hero Section */}
      <div className="about-hero">
        <h1 className="about-title">Revolutionizing Crypto Tracking</h1>
        <p className="about-subtitle">
          Experience the future of cryptocurrency monitoring with our blazing fast, 
          aesthetically pleasing, and developer-friendly dashboard.
        </p>
      </div>

      {/* Features Grid */}
      <div className="features-grid">
        <div className="feature-card">
          <span className="feature-icon">🚀</span>
          <h3 className="feature-title">Lightning Fast</h3>
          <p className="feature-description">
            Powered by Vite and optimized React components for instant page loads and seamless interactions.
          </p>
        </div>
        <div className="feature-card">
           <span className="feature-icon">🎨</span>
          <h3 className="feature-title">Modern Design</h3>
           <p className="feature-description">
            A carefully crafted UI with glassmorphism, smooth animations, and a fully adaptive dark/light theme.
          </p>
        </div>
        <div className="feature-card">
           <span className="feature-icon">📊</span>
          <h3 className="feature-title">Real-time Data</h3>
           <p className="feature-description">
            Live market updates, interactive charts, and accurate statistics powered by the CoinGecko API.
          </p>
        </div>
      </div>

      {/* Developer Section */}
      <div className="developer-section">
        <h2 className="feature-title" style={{fontSize: "2.5rem"}}>Meet the Creator</h2>
        <p className="about-subtitle" style={{marginBottom: "3rem"}}>
           Passionate about building beautiful, high-performance web applications.
        </p>
        
        <div className="single-dev-container">
           <div className="dev-card large">
              <img 
                src="https://avatars.githubusercontent.com/u/1?v=4" 
                alt="Developer" 
                className="dev-avatar large" 
              />
              <h4 className="dev-name large">Shaikh Ameen</h4>
              <span className="dev-role large">Full Stack Developer & UI/UX Enthusiast</span>
              
              <p className="dev-bio">
                 A dedicated developer with a knack for creating intuitive and dynamic user experiences. 
                 Specializing in React, modern CSS, and interactive animations. This dashboard is a testament 
                 to the power of clean code and modern design principles.
              </p>

              <div className="dev-skills">
                 <span className="skill-tag">React</span>
                 <span className="skill-tag">GSAP</span>
                 <span className="skill-tag">Vite</span>
                 <span className="skill-tag">API</span>
              </div>

              <div className="dev-socials">
                 <a href="https://github.com/skameen36" target="_blank" className="social-link">GitHub</a>
                 <a href="#" className="social-link" target="_blank">Twitter</a>
                 <a href="https://www.linkedin.com/in/ameen-shaikh-972b2b233/" target="_blank" className="social-link">LinkedIn</a>
                 <a href="https://portfolio-85a42.web.app/" target="_blank" className="social-link">Portfolio</a>
              </div>
           </div>
        </div>
      </div>
      
    </div>
  );
};

export default About;

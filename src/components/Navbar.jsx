import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo1.svg"

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="header top-controls">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="CryptoFlick" />
        </Link>
      </div>

      <button 
        className="mobile-menu-btn" 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <div className={`hamburger ${isMenuOpen ? 'open' : ''}`}>
           <span></span>
           <span></span>
           <span></span>
        </div>
      </button>

      <div className={`top-nav ${isMenuOpen ? 'mobile-open' : ''}`}>
        <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
        <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
        
        <div className="theme-toggle-wrapper" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <button 
              onClick={() => {toggleTheme(); setIsMenuOpen(false);}} 
              className={`theme-switch-btn ${theme}`} 
              aria-label="Toggle Theme"
            >
              <div className="switch-track">
                <span className="icon-container sun-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                </span>
                <span className="icon-container moon-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                </span>
                <div className="switch-thumb"></div>
              </div>
            </button>
        </div>

        {user ? (
          <div className="user-controls">
              <div className="user-name">
                  👤 {user.name || "User"}
              </div>
              <Link to="/portfolio" className="btn btn-portfolio" onClick={() => setIsMenuOpen(false)}>Portfolio</Link>
              <button onClick={() => {logout(); setIsMenuOpen(false);}} className="btn btn-logout">Logout</button>
          </div>
        ) : (
          <div className="auth-links">
             <Link to="/login" className="btn btn-login" onClick={() => setIsMenuOpen(false)}>Login</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

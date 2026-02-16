import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.from(".auth-card", {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
    })
    .from(".auth-title", { y: 20, opacity: 0, duration: 0.6, ease: "back.out(1.7)" }, "-=0.6")
    .from(".auth-subtitle", { y: 15, opacity: 0, duration: 0.5 }, "-=0.4")
    .from(".form-group", { 
      y: 20, 
      opacity: 0, 
      duration: 0.5, 
      stagger: 0.1,
      ease: "power2.out" 
    }, "-=0.2")
    .from(".auth-footer", { opacity: 0, duration: 0.5 });
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const result = login({ email, password });

    if (result.success) {
      navigate("/");
    } else {
      setError(result.message || "Invalid email or password");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Login to your account</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Login
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

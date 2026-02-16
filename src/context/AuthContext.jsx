import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check local storage for existing user session
    const storedUser = localStorage.getItem("crypto-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    // In a real app, you would validate against a backend here
    // For this demo, we'll simulate a successful login if the user exists in "db"
    // But since we are doing a simple "store user info", we might just assume success
    // or check against a stored "users" array if we want proper signup/login flow.
    
    // Let's implement a simple flow:
    // 1. Get users from local storage
    const users = JSON.parse(localStorage.getItem("crypto-users") || "[]");
    const foundUser = users.find(u => u.email === userData.email && u.password === userData.password);

    if (foundUser) {
        const { password, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem("crypto-user", JSON.stringify(userWithoutPassword));
        return { success: true };
    } else {
        return { success: false, message: "Invalid email or password" };
    }
  };

  const signup = (userData) => {
    const users = JSON.parse(localStorage.getItem("crypto-users") || "[]");
    const existingUser = users.find(u => u.email === userData.email);

    if (existingUser) {
        return { success: false, message: "User already exists" };
    }

    const newUser = { ...userData, id: Date.now() };
    users.push(newUser);
    localStorage.setItem("crypto-users", JSON.stringify(users));
    
    // Do not auto-login
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("crypto-user");
  };

  const value = {
    user,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

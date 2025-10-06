import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) setUser(JSON.parse(storedUser));
    } catch (err) {
      console.error("Error parsing stored user:", err);
      localStorage.removeItem("user");
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    try {
      setUser(null);
      localStorage.removeItem("user");

      localStorage.clear();
      sessionStorage.clear();

      setTimeout(() => {
        window.location.reload();
      }, 150);
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

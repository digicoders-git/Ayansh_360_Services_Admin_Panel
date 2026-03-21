import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const USER_KEY = "AAYANSH-admin-data";
const TOKEN_KEY = "AAYANSH-admin-token";

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem(USER_KEY);
    const savedToken = localStorage.getItem(TOKEN_KEY);

    if (savedUser) {
      try {
        setAdmin(JSON.parse(savedUser));
      } catch (e) {
        console.error("Error parsing saved admin data", e);
        localStorage.removeItem(USER_KEY);
      }
    }

    if (savedToken) {
      setToken(savedToken);
    }

    setLoading(false);
  }, []);

  const setLoginData = (adminData) => {
    setAdmin(adminData);
    setToken(adminData?.token || null);

    localStorage.setItem(USER_KEY, JSON.stringify(adminData));
    if (adminData?.token) {
      localStorage.setItem(TOKEN_KEY, adminData.token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  };

  const new_logout = () => {
    setAdmin(null);
    setToken(null);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
  };

  const isLoggedIn = Boolean(admin && token);

  return (
    <AuthContext.Provider
      value={{ admin, token, setLoginData, new_logout, isLoggedIn, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

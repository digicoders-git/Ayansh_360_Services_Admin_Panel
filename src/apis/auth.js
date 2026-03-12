import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Login
export const login = (email, password) => 
  axios.post(`${API_BASE}/auth/login`, { email, password });

// Get current admin
export const getCurrentAdmin = (token) => 
  axios.get(`${API_BASE}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });

// Change password
export const changePassword = (oldPassword, newPassword, confirmPassword, token) => 
  axios.post(`${API_BASE}/auth/change-password`, 
    { oldPassword, newPassword, confirmPassword },
    { headers: { Authorization: `Bearer ${token}` } }
  );

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export const getToken = () => localStorage.getItem("token");
export const getUser = () => {
  const raw = localStorage.getItem("user");
  return raw ? JSON.parse(raw) : null;
};

export const setSession = ({ token, user }) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
};

export const clearSession = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

const apiFetch = async (path, options = {}) => {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };

  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Security gateway rejected request." }));
    throw new Error(error.message || "Network anomaly detected.");
  }

  return response.json();
};

export const getProducts = () => apiFetch("/api/products");
export const login = (payload) =>
  apiFetch("/api/auth/login", { method: "POST", body: JSON.stringify(payload) });
export const register = (payload) =>
  apiFetch("/api/auth/register", { method: "POST", body: JSON.stringify(payload) });
export const getAuditLogs = () => apiFetch("/api/admin/audit");
export const checkout = (payload) =>
  apiFetch("/api/checkout", { method: "POST", body: JSON.stringify(payload) });
export const seedProducts = () => 
  apiFetch("/api/admin/seed", { method: "POST" });

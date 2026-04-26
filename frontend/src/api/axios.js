import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/_/backend/api',
});

// Add a request interceptor to include JWT in headers
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default API;

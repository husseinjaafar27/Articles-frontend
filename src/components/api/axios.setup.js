import axios from 'axios';

const axiosInstance = axios.create({
  // You can set your base URL here if needed
  // baseURL: 'https://api.example.com',
});

// Add a request interceptor to include the token in the headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
});

export default axiosInstance;
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.29.17:3000',
});

api.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    console.log('Request:', config);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (response) {
    console.log('Response:', response);
    return response;
  },
  function (error) {
    if (error.response && error.response.status === 401) {
      console.log('Unauthorized! Redirecting to login...');
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export default api;
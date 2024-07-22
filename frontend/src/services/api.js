import axios from 'axios';

const api = axios.create({
  baseURL: 'https://my-project-lexart-backend-5cv73detn-ivans-projects-398b638a.vercel.app/',
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

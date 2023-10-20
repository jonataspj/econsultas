import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:20',
});

export default api;

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://15.229.71.220',
});

export default api;
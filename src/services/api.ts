import axios from 'axios';

const api = axios.create({
  baseURL: 'https://deploy.controlhonorarios.com',
});

export default api;
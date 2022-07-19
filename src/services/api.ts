import axios from 'axios';

const api = axios.create({
  baseURL: 'https://deploy.controlhonorarios.com',
  //baseURL: 'http://localhost:3333',
});

export default api;
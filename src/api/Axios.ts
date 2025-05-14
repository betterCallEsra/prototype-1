import axios from 'axios';

export const axiosWithCredentials = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  // * if using laravel sanctum
  withCredentials: true,
});

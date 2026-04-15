// plugins/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.MAPI || 'http://localhost', // Use MAPI environment variable or fallback to localhost
  // Other custom settings
});

export default ({ app }) => {
  // Set axios instance on app object
  app.$axios = axiosInstance;
};

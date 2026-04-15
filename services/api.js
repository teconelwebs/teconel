// ~/services/api.js
import axios from 'axios';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost/myapp/api/v2';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the token to the headers
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token'); // Get the token from local storage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});



export default {
  // POST request to get cart quantity
  getCartQuantity() {
    // Retrieve userId and access token from localStorage
    const userId = localStorage.getItem('user_id');
    const accessToken = localStorage.getItem('access_token');

    // Ensure userId and accessToken are available
    if (!userId || !accessToken) {
      throw new Error('User ID or Access Token not found in localStorage');
    }

    // Make the POST request
    const promise = axios.post(
      `http://localhost/myapp/api/v2/carts-qty/${userId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // Return only the data from the response
    return promise.then(response => response.data)
      .catch(error => {
        console.error('Error fetching cart quantity:', error);
        throw error; // Optionally rethrow the error to handle it elsewhere
      });
  },

  // Add more API methods here
};



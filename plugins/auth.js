// plugins/auth.js
import axios from 'axios';

export default ({ app }, inject) => {
  const auth = {
    user: null,
    login(email, password) {
      return axios.post(`${process.env.API_BASE_URL}/auth/login`, { email, password })
        .then(response => {
          localStorage.setItem('access_token', response.data.access_token);
          localStorage.setItem('user_id', response.data.user.id);
          localStorage.setItem('name', response.data.user.name);
          localStorage.setItem('email', response.data.user.email);
          this.user = response.data.user;
          return response.data.user;
        });
    },
    async logout() {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          const response = await axios.get('http://localhost/Welfog/api/v2/auth/logout', {
            headers: { Authorization: `Bearer ${token}` }
          });
          // Optionally, you can handle the response if needed
          console.log('Logout response:', response.data);
        } catch (error) {
          console.error('Error logging out:', error);
          // Handle token expiration or other errors as needed
        }
      }

      // Remove the token and user details from local storage
      localStorage.removeItem('access_token');
      localStorage.removeItem('user_id');
      localStorage.removeItem('name');
      localStorage.removeItem('email');

      // Commit mutations to update the state
      this.$store.commit('setUser', null);
      this.$store.commit('setLoggedIn', false);

      // Optionally, you can redirect the user to the login page or home page
      this.$router.push({ name: 'login' });
    },

    isLoggedIn() {
      return !!localStorage.getItem('access_token');
    },
    getUser() {
      if (!this.user) {
        this.user = {
          id: localStorage.getItem('user_id'),
          name: localStorage.getItem('name'),
          email: localStorage.getItem('email'),
        };
      }
      return this.user;
    }
  };

  inject('auth', auth);
};

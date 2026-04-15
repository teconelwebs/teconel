<template>
    <main class="main login-page">
      <div class="page-content">
        <div class="container">
          <div class="login-popup">
            <div class="tab tab-nav-boxed tab-nav-center tab-nav-underline">
              <ul class="nav nav-tabs text-uppercase" role="tablist">
                <li class="nav-item">
                  <a href="#sign-in" class="nav-link" :class="{ active: activeTab === 'sign-in' }" @click="activeTab = 'sign-in'">Sign In</a>
                </li>
                <li class="nav-item">
                  <nuxt-link to="/register" class="nav-link" :class="{ active: activeTab === 'sign-up' }" @click="activeTab = 'sign-up'">Sign Up</nuxt-link>
                </li>
              </ul>
              <div class="tab-content">
                <div v-show="activeTab === 'sign-in'" class="tab-pane active in" id="sign-in">
                  <div style="text-align: center;margin-bottom: 6px;">
                    <span style="color: red">{{ loginError }}</span>
                  </div>
                  <form class="form-default" @submit.prevent="submitLogin">
                    <div class="form-group">
                      <label>Username or email address *</label>
                      <input type="email" class="form-control" placeholder="Email" v-model="loginForm.email" autocomplete="off">
                    </div>
                    <div class="form-group mb-0">
                      <label>Password *</label>
                      <input type="password" class="form-control" placeholder="Password" v-model="loginForm.password">
                    </div>
                    <div class="form-checkbox d-flex align-items-center justify-content-between">
                      <input type="checkbox" v-model="loginForm.remember">
                      <span class="opacity-60">Remember Me</span>
                      <a href="/password/reset">Forgot password?</a>
                    </div>
                    <button style="width: 100%;" type="submit" class="btn btn-primary">Sign in</button>
                  </form>
                </div>
  
                <div v-show="activeTab === 'sign-up'" class="tab-pane" id="sign-up">
                  <form class="form-default" @submit.prevent="submitRegister">
                    <div class="form-group">
                      <label>Your Name *</label>
                      <input type="text" class="form-control" placeholder="Full Name" v-model="registerForm.name">
                      <span style="color: red;" v-if="errors.name">{{ errors.name }}</span>
                    </div>
                    <div class="form-group mb-5">
                      <label>Your Email *</label>
                      <input type="email" class="form-control" placeholder="Email" v-model="registerForm.email">
                      <span style="color: red;" v-if="errors.email">{{ errors.email }}</span>
                    </div>
                    <div class="form-group mb-5">
                      <label>Your Password *</label>
                      <input type="password" class="form-control" placeholder="Password" v-model="registerForm.password">
                    </div>
                    <div class="form-group mb-5">
                      <label>Confirm Password *</label>
                      <input type="password" class="form-control" placeholder="Confirm Password" v-model="registerForm.password_confirmation">
                      <span style="color: red;" v-if="errors.password">{{ errors.password }}</span>
                    </div>
                    <div class="form-checkbox d-flex align-items-center justify-content-between mb-5">
                      <input type="checkbox" v-model="registerForm.agree">
                      <label for="remember" class="font-size-md">I agree to the <a href="#" class="text-primary font-size-md">privacy policy</a></label>
                    </div>
                    <button type="submit" style="width: 100%;" class="btn btn-primary">Create Account</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </template>
  
  <script>
  import axios from "axios";
  import { mapState, mapGetters, mapActions } from 'vuex';
 
  export default {
    data() {
      return {
        activeTab: 'sign-in',
        loginForm: {
          email: '',
          password: '',
          remember: false,
        },
        registerForm: {
          name: '',
          email: '',
          password: '',
          password_confirmation: '',
          agree: false,
        },
        loginError: '',
        errors: {},
      };
    },
    computed: {
      ...mapState({
        user: state => state.user
      }),
      ...mapGetters(['isAuthenticated']),
      userName() {
        return this.user ? this.user.name : '';
      }
    },
    methods: {
      ...mapActions(['setUser', 'clearUser']),
      ...mapActions(['verifyUser']),

      
      submitLogin() {
        axios.post(`http://localhost/Welfog/api/v2/auth/login`, {
          email: this.loginForm.email,
          password: this.loginForm.password
        })
        .then(response => {
          console.log('Login successful:', response.data);
          
          // Store the access token securely
          localStorage.setItem('access_token', response.data.access_token);
          localStorage.setItem('user_id', response.data.user.id);
          
          // Update the user state
          this.setUser(response.data.user);
          this.verifyUser();
          
          // Redirect to a protected page if needed
          this.$router.push('/dashboard'); // Replace with your protected route
        })
        .catch(error => {
          console.error('Login error:', error);
          this.loginError = 'Invalid credentials. Please try again.';
        });
      },
      submitRegister() {
        // Registration logic here
      }




    },
    mounted() {
      const token = localStorage.getItem('access_token');
      if (token) {
        axios.get(`http://localhost/Welfog/api/v2/auth/user`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
          this.setUser(response.data.user);
          this.$router.push('/dashboard');
        })
        .catch(error => {
          console.error('Token verification error:', error);
          localStorage.removeItem('access_token');
          this.clearUser();
        });
      }
    }
  };
</script>


  
  <style scoped>
  /* Add any scoped styles here */
  </style>
  
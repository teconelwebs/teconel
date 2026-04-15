<template>
  <main class="main login-page">
    <div class="page-content">
      <div class="container">
        <div class="login-popup">
          <div class="tab tab-nav-boxed tab-nav-center tab-nav-underline">
            <ul class="nav nav-tabs text-uppercase" role="tablist">
              <li class="nav-item">
                    <nuxt-link to="/login" class="nav-link" :class="{ active: activeTab === 'sign-in' }" @click="activeTab = 'sign-in'">
                   Sign In</nuxt-link>
                </li>
              <li class="nav-item">
                <a href="#sign-up" class="nav-link" :class="{ active: activeTab === 'sign-up' }" @click="activeTab = 'sign-up'">Sign Up</a>
              </li>
            </ul>
            <div class="tab-content">
              <div v-show="activeTab === 'sign-in'" class="tab-pane" id="sign-in">
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

              <div v-show="activeTab === 'sign-up'" class="tab-pane active in" id="sign-up">
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
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      activeTab: 'sign-up',
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
      errors: {}
    };
  },
   methods: {
    ...mapActions(['verifyUser']),
      submitRegister() {
        const { name, email, password } = this.registerForm;

        axios.post(`http://localhost/Welfog/api/v2/auth/signup`, {
          name: name,
          email_or_phone: email,
          register_by: 'email', 
          phone: '7777777777', 
          balance: '0', 
          password: password
        })
        .then(response => {
          // console.log('Signup successful:', response.data);
          this.verifyUser();

      
         
        })
        .catch(error => {
          console.error('Signup error:', error);
        });
      }
    },

   


};
</script>

<style scoped>
/* Add any scoped styles here */
</style>

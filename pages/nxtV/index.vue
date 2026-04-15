<template>
<div>
  <div class="formprocess">
    <div class="headprocess">
      <h1>Welcome to Welfog</h1>
      <p>Create your account to start selling</p>
    </div>
    
    <div class="step-indicator">
      <div class="step">
        <div class="activestep">1</div>
        <span class="step-label">Personal</span>
      </div>
      <div class="step">
        <div class="inactivestep">2</div>
        <span class="step-label">Company</span>
      </div>
      <div class="step">
        <div class="inactivestep">3</div>
        <span class="step-label">Documents</span>
      </div>
      <div class="step">
        <div class="inactivestep">4</div>
        <span class="step-label">Bank</span>
      </div>
      <div class="step">
        <div class="inactivestep">5</div>
        <span class="step-label">Store</span>
      </div>
      <div class="step">
        <div class="inactivestep">6</div>
        <span class="step-label">Review</span>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="form-container">
      <h2 class="form-title">Enter Your Details</h2>

      <div class="form-group">
        <label for="phone">Enter Your Phone</label>
        <div class="input-group">
          <input 
            type="text" 
            class="form-control" 
            v-model="phone" 
            id="phone" 
            placeholder="Enter Phone Number" 
            name="phone" 
            required
          >
          <a class="verify" @click="verifyPhone()" id="verifyPhone">
            <span id="loadingSpinner" v-if="isLoading">
              <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </span>
            <span id="verifyText" v-else>Verify</span>
          </a>
        </div>
        <div v-if="phoneError" class="error-message">
          {{ phoneError }}
        </div>
      </div>

      <div v-if="showEmailField" class="form-group">
        <label for="email">Enter Your Email</label>
        <div class="input-group">
          <input 
            type="email" 
            class="form-control" 
            v-model="email" 
            id="email" 
            placeholder="Enter Email Address" 
            name="email" 
            required
          >
          <a class="verify" @click="verifyEmail()" id="verifyEmail">
            <span id="loadingSpinner" v-if="isLoadingEmail">
              <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </span>
            <span id="verifyText" v-else>Verify</span>
          </a>
        </div>
        <div v-if="emailError" class="error-message">
          {{ emailError }}
        </div>
      </div>

      <button v-if="showNextButton" type="submit" @click="goToNextStep()" class="btn btn-primary">
        <span v-if="isLoadingNext">Processing...</span>
        <span v-else>Next</span>
      </button>
    </div>
  </div>
</div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      phone: '',
      email: '',
      phoneError: '',
      emailError: '',
      showEmailField: false,
      showNextButton: false,
      isLoading: false,
      isLoadingEmail: false,
      isLoadingNext: false
    };
  },
  methods: {
    verifyPhone() {
      // Add your phone verification logic here
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
        this.showEmailField = true;
      }, 1000);
    },
    verifyEmail() {
      // Add your email verification logic here
      this.isLoadingEmail = true;
      setTimeout(() => {
        this.isLoadingEmail = false;
        this.showNextButton = true;
      }, 1000);
    },
    goToNextStep() {
      // Add your navigation logic here
      this.isLoadingNext = true;
      setTimeout(() => {
        this.$router.push('/shops/step2')
          .catch(err => {
            if (err.name !== 'NavigationDuplicated') {
              console.warn('Navigation error:', err);
            }
          });
      }, 1000);
    }
  }
};
</script>

<style>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem 0;
}

.form-container {
    width: 100%;
    max-width: 500px;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    background: #fff;
    transition: all 0.3s ease;
}

.form-container:hover {
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.12);
}

.form-title {
    font-size: 20px;
    font-weight: 600;
    color: #333;
    margin-bottom: 1.5rem;
    text-align: center;
}

.input-group {
    display: flex;
    align-items: stretch;
    width: 100%;
}

.input-group .form-control {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-right: none;
    flex: 1;
    height: 45px;
    font-size: 14px;
}

.verify {
    background: #fb5404;
    color: white;
    padding: 0 20px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    cursor: pointer;
    text-decoration: none;
    font-weight: 500;
    font-size: 14px;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 80px;
    border: none;
    outline: none;
    position: relative;
    overflow: hidden;
    margin: 0;
    height: 45px;
    user-select: none;
    box-shadow: none;
}

.verify:hover {
    background: #e04a00;
    color: white !important;
    text-decoration: none !important;
}

.verify:visited, .verify:active, .verify:focus {
    color: white !important;
    text-decoration: none !important;
    box-shadow: none;
}

.form-control {
    width: 100%;
    padding: 10px 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
    transition: all 0.3s ease;
    font-size: 14px;
}

.form-control:focus {
    border-color: #fb5404;
    box-shadow: 0 0 0 2px rgba(251, 84, 4, 0.1);
    outline: none;
    z-index: 1;
}

.form-control::placeholder {
    color: #999;
    font-size: 14px;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #333;
}

.error-message {
    color: #dc3545;
    font-size: 14px;
    margin-top: 5px;
    margin-bottom: 10px;
    padding: 8px;
    background: #fff5f5;
    border-radius: 4px;
    border-left: 3px solid #dc3545;
}

.btn-primary {
    background: #fb5404;
    color: white;
    border: none;
    padding: 12px 24px;
    font-size: 16px;
    font-weight: 600;
    border-radius: 8px;
    transition: all 0.3s ease;
    width: 100%;
    margin-top: 1rem;
}

.btn-primary:hover {
    background: #e04a00;
    transform: translateY(-1px);
}

.spinner-border {
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solid #fff;
    border-right-color: transparent;
    border-radius: 50%;
    animation: spinner .75s linear infinite;
}

@keyframes spinner {
    to { transform: rotate(360deg); }
}

.step-indicator {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 2rem auto;
    position: relative;
    max-width: 800px;
    padding: 0 1rem;
}

.step-indicator::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 2px;
    background: #e0e0e0;
    z-index: 1;
    transform: translateY(-50%);
}

.step {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: white;
    padding: 0 1rem;
}

.activestep {
    background: #fb5404;
    color: white;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    box-shadow: 0 2px 8px rgba(251, 84, 4, 0.3);
    transition: all 0.3s ease;
    border: 2px solid white;
    position: relative;
}

.activestep::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: 2px solid #fb5404;
    opacity: 0.2;
}

.inactivestep {
    background: #e0e0e0;
    color: #666;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    transition: all 0.3s ease;
    border: 2px solid white;
}

.step-label {
    margin-top: 8px;
    font-size: 12px;
    color: #666;
    font-weight: 500;
    text-align: center;
    white-space: nowrap;
}

.formprocess {
    margin-top: 2%;
    padding: 2rem 0;
}

.headprocess {
    text-align: center;
    font-size: 24px;
    color: #fb5404;
    font-weight: 700;
    width: 100%;
    margin-bottom: 2rem;
}

.headprocess p {
    color: #666;
    font-size: 16px;
    margin-top: 0.5rem;
}
</style>
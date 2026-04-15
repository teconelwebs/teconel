<template>
  <div class="page-container">
    <!-- Header -->
    <div class="page-header">
      <h1>Welcome to Welfog</h1>
      <p>Start selling on Welfog — where trusted suppliers become successful brands.</p>
    </div>

    <!-- Main Content -->
    <div class="main-content">
      <!-- Left: Getting Started Guide -->
      <div class="steps-section">
        <h3>Getting Started</h3>
        
        <div class="guide-steps">
          <div class="guide-step">
            <div class="step-number">✓</div>
            <div class="step-content">
              <h4>Enter Mobile Number</h4>
              <p>Provide your 10-digit mobile number</p>
            </div>
          </div>

          <div class="guide-step">
            <div class="step-number">✓</div>
            <div class="step-content">
              <h4>Verify With OTP</h4>
              <p>Enter the verification code sent to your phone</p>
            </div>
          </div>

          <div class="guide-step">
            <div class="step-number">✓</div>
            <div class="step-content">
              <h4>Complete 6 Steps</h4>
              <p>Set up your supplier account details</p>
            </div>
          </div>

          <div class="guide-step">
            <div class="step-number">✓</div>
            <div class="step-content">
              <h4>Start Selling</h4>
              <p>Begin your business journey with Welfog</p>
            </div>
          </div>
        </div>

        <div class="quick-facts">
          <h4>Quick Facts</h4>
          <div class="fact-item">
            <span class="fact-icon">🔐</span>
            <span class="fact-text">100% secure phone verification</span>
          </div>
          <div class="fact-item">
            <span class="fact-icon">💰</span>
            <span class="fact-text">Earn up to ₹50,000+ monthly</span>
          </div>
          <div class="fact-item">
            <span class="fact-icon">📈</span>
            <span class="fact-text">Grow your business 5x faster</span>
          </div>
        </div>
      </div>

      <!-- Center: Form -->
      <div class="form-section">
        <h2>Let's Get Started</h2>
        <p>Enter your mobile number to begin the registration process</p>
        
        <form>
          <div class="form-group">
            <label>Mobile Number</label>
            <div class="input-wrapper">
              <span class="country-code">+91</span>
              <input
                v-model="phoneNumber"
                type="tel"
                id="verify_phone"
                placeholder="Enter your 10-digit mobile number"
                maxlength="10"
              />
            </div>
            <small>We'll send you a verification code</small>
          </div>
         
          <button type="submit" class="button_to_verify" @click.prevent="VerifyNumber()" :disabled="isLoading || !phoneNumber.trim()">
            <span v-if="isLoading">Verifying...</span> 
            <span v-else>Verify Number</span> 
          </button>
        </form>




        <!-- Login Link Section -->
        <div class="login-section">
          <p class="login-text">
            Already have an account? 
            <a href="https://supplier.welfog.com/login" target="_blank" class="login-link">Login here</a>
          </p>
        </div>

        <!-- Terms & Conditions Section -->
        <div class="terms-section">
          <p class="terms-text">
            By continuing, you agree to our 
            <a href="https://welfog.com/page/terms-and-conditions" class="terms-link">Terms & Conditions</a> 
            ,
            <a href="https://welfog.com/page/privacy-policy" class="terms-link">Privacy Policy</a>
            and 
            <a href="https://welfog.com/page/anti-phishing-defense-policy" class="terms-link">Anti-Phishing Defense Policy</a>
          </p>
        </div>
      </div>

      <!-- Right: Trust Content -->
      <div class="trust-section">
        <h3>Why Choose Welfog?</h3>
        
        <div class="trust-items">
          <div class="trust-item">
            <div class="icon">🛡️</div>
            <div class="content">
              <h4>Secure Platform</h4>
              <p>Your data is protected with enterprise-grade security</p>
            </div>
          </div>

          <div class="trust-item">
            <div class="icon">🚀</div>
            <div class="content">
              <h4>Quick Setup</h4>
              <p>Complete registration in just 5 minutes</p>
            </div>
          </div>

          <div class="trust-item">
            <div class="icon">📈</div>
            <div class="content">
              <h4>Growth Tools</h4>
              <p>Access powerful tools to grow your business</p>
            </div>
          </div>

          <div class="trust-item">
            <div class="icon">🎧</div>
            <div class="content">
              <h4>24/7 Support</h4>
              <p>Get help whenever you need it from our expert team</p>
            </div>
          </div>
        </div>

        <div class="stats">
          <h4>Verification Benefits</h4>
          <div class="stat-row">
            <span class="number">100%</span>
            <span class="label">Secure</span>
          </div>
          <div class="stat-row">
            <span class="number">24/7</span>
            <span class="label">Available</span>
          </div>
          <div class="stat-row">
            <span class="number">Free</span>
            <span class="label">Verification</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      IMG_URL: process.env.IMG_URL,
      quantity: 1,
      phoneNumber: '',
    };
  },

  computed: {
    ...mapState({
      cartItems: state => state.cartItems,
      isLoading: state => state.isLoading,
    }),
  },
  created() {
     //////////this.$store.dispatch('testStep'); 
  },
  methods: {
    ...mapActions(['VerifyNumber']),
    ...mapActions(['testStep']),

    

   
      //  async qupdateCart(id, quantity) {

      //     try {
      //         await this.$store.dispatch('updateCart', { id, quantity});
      //         // console.log('Product updatetd successfully!');
      //     } catch (error) {
      //         console.error('Error updating product to cart:', error);
      //         // Handle error or show error message
      //     }
      // },

      
      
  },
};
</script>

<style scoped>
.page-container {
  min-height: 100vh;
  background: white;
  font-family: Arial, sans-serif;
  position: relative;
}

.page-container::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(251, 84, 4, 0.02) 0%, rgba(251, 84, 4, 0.01) 100%);
  pointer-events: none;
  z-index: 0;
}

.page-header {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 3rem 2rem;
  text-align: left;
  border-bottom: 1px solid #e9ecef;
  position: relative;
  overflow: hidden;
}

.page-header::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 200px;
  height: 100%;
  background: linear-gradient(45deg, rgba(251, 84, 4, 0.1) 0%, rgba(251, 84, 4, 0.05) 100%);
  border-radius: 50% 0 0 50%;
}

.page-header h1 {
  color: #fb5404;
  font-size: 2.8rem;
  margin: 0 0 1rem 0;
  font-weight: 300;
  letter-spacing: -0.02em;
  line-height: 1.1;
  position: relative;
  z-index: 1;
}

.page-header p {
  color: #666;
  margin: 0;
  font-size: 1.4rem;
  font-weight: 300;
  line-height: 1.4;
  max-width: 600px;
  position: relative;
  z-index: 1;
}

.main-content {
  display: grid;
  grid-template-columns: 280px 1fr 280px;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  position: relative;
  z-index: 1;
}

/* Steps Section */
.steps-section {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.steps-section h3 {
  margin: 0 0 1.5rem 0;
  color: #333;
  font-size: 1.7rem;
  text-align: center;
}

.guide-steps {
  margin-bottom: 2rem;
}

.guide-step {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  border-radius: 8px;
  background: linear-gradient(135deg, #fff 0%, #f8f9fa 100%);
  border: 1px solid #e9ecef;
  transition: all 0.3s ease;
}

.guide-step:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  border-color: #fb5404;
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #fb5404 0%, #ff6b35 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  font-weight: 700;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(251, 84, 4, 0.3);
}

.step-content h4 {
  margin: 0 0 0.25rem 0;
  font-size: 1.4rem;
  color: #333;
  font-weight: 100;
}

.step-content p {
  margin: 0;
  font-size: 1.2rem;
  color: #666;
  line-height: 1.3;
}

.quick-facts {
  border-top: 1px solid #e9ecef;
  padding-top: 1.5rem;
}

.quick-facts h4 {
  margin: 0 0 1rem 0;
  color: #333;
  font-size: 1.5rem;
  text-align: center;
  font-weight: 600;
}

.fact-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  padding: 0.5rem;
  border-radius: 6px;
  transition: background 0.3s ease;
}

.fact-item:hover {
  background: #f8f9fa;
}

.fact-icon {
  font-size: 1.2rem;
  flex-shrink: 0;
}

.fact-text {
  font-size: 1.1rem;
  color: #333;
  font-weight: 500;
}

.steps {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.step {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 6px;
}

.step.active {
  background: #fff5f0;
  border: 1px solid #fb5404;
}

.step-num {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #e9ecef;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  flex-shrink: 0;
}

.step.active .step-num {
  background: #fb5404;
  color: white;
}

.step-info h4 {
  margin: 0 0 0.25rem 0;
  font-size: 1.4rem;
  color: #333;
  font-weight:100;
}

.step-info p {
  margin: 0;
  font-size: 1.2rem;
  color: #666;
}

.step.active .step-info h4 {
  color: #fb5404;
}

/* Form Section */
.form-section {
  background: linear-gradient(135deg, #fff 0%, #f8f9fa 100%);
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid #e9ecef;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.form-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #fb5404 0%, #ff6b35 100%);
}

.form-section h2 {
  margin: 0 0 0.5rem 0;
  color: #333;
  font-size: 2.6rem;
  font-weight: 600;
}

.form-section p {
  margin: 0 0 2rem 0;
  color: #666;
  font-size: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-size: 1.4rem;
}

.input-wrapper {
  display: flex;
  border: 2px solid #e9ecef;
  border-radius: 6px;
  overflow: hidden;
}

.input-wrapper:focus-within {
  border-color: #fb5404;
}

.country-code {
  background: #f8f9fa;
  padding: 0.75rem;
  color: #666;
  font-weight: 500;
  border-right: 1px solid #e9ecef;
}

.form-group input {
  flex: 1;
  border: none;
  padding: 0.75rem;
  font-size: 1.5rem;
  outline: none;
}

.form-group input::placeholder {
  color: #999;
}

.form-group small {
  display: block;
  margin-top: 0.5rem;
  color: #666;
  font-size: 1.2rem;
}

.form-section button {
  width: 100%;
  background: #fb5404;
  color: white;
  border: none;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  font-size: 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.form-section button:hover:not(:disabled) {
  background: #e04a00;
}

.form-section button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Login Section */
.login-section {
  margin-top: 1.5rem;
  text-align: center;
  padding-top: 1.5rem;
  border-top: 1px solid #e9ecef;
}

.login-text {
  margin: 0;
  color: #666;
  font-size: 1.3rem;
}

.login-link {
  color: #fb5404;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.login-link:hover {
  color: #e04a00;
  text-decoration: underline;
}

/* Terms Section */
.terms-section {
  margin-top: 1rem;
  text-align: center;
}

.terms-text {
  margin: 0;
  color: #999;
  font-size: 1.1rem;
  line-height: 1.4;
}

.terms-link {
  color: #fb5404;
  text-decoration: none;
  font-weight: 400;
  transition: color 0.3s ease;
}

.terms-link:hover {
  color: #e04a00;
  text-decoration: underline;
}

/* Trust Section */
.trust-section {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.trust-section h3 {
  margin: 0 0 1.5rem 0;
  color: #333;
  font-size: 1.7rem;
  text-align: center;
}

.trust-items {
  margin-bottom: 2rem;
}

.trust-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding: 0.75rem;
  border-radius: 6px;
}

.trust-item:hover {
  background: #f8f9fa;
}

.trust-item .icon {
  font-size: 1.2rem;
  flex-shrink: 0;
}

.trust-item .content h4 {
  margin: 0 0 0.25rem 0;
  font-size: 1.4rem;
  color: #333;
  font-weight: 100;
}

.trust-item .content p {
  margin: 0;
  font-size: 1.2rem;
  color: #666;
  line-height: 1.3;
}

.stats {
  border-top: 1px solid #e9ecef;
  padding-top: 1.5rem;
}

.stats h4 {
  margin: 0 0 1rem 0;
  color: #333;
  font-size: 1.5rem;
  text-align: center;
  font-weight:100;
}

.stat-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f8f9fa;
}

.stat-row:last-child {
  border-bottom: none;
}

.stat-row .number {
  font-weight: 700;
  color: #fb5404;
  font-size: 1.5rem;
}

.stat-row .label {
  color: #666;
  font-size: 1.3rem;
}

/* Responsive */
@media (max-width: 992px) {
  .main-content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .page-header {
    padding: 2rem 1.5rem;
  }
  
  .page-header h1 {
    font-size: 2rem;
    font-weight: 300;
  }
  
  .page-header p {
    font-size: 1.2rem;
    font-weight: 300;
  }
}

@media (max-width: 768px) {
  .main-content {
    padding: 1rem;
  }
  
  .page-header {
    padding: 1.5rem 1rem;
  }
  
  .page-header h1 {
    font-size: 1.6rem;
    font-weight: 300;
  }
  
  .page-header p {
    font-size: 1rem;
    font-weight: 300;
  }
  
  .form-section {
    padding: 1.5rem;
  }
  
  .login-text {
    font-size: 1.2rem;
  }
  
  .terms-text {
    font-size: 1rem;
  }
  
  .steps-section,
  .trust-section {
    padding: 1rem;
  }
}

button.button_to_verify {
    width: 100% !important;
}
</style>
  
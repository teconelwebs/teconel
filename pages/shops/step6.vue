<template>
  <div class="page-container">
    <!-- Header -->
   

    <!-- Main Content -->
    <div class="main-content">
      <!-- Left: Steps -->


      <div class="steps-section">
        <h3>Registration Process</h3>
        <div class="steps">
          <div class="step completed">
            <span class="step-num">✓</span>
            <div class="step-info">
              <h4>Account Details</h4>
              <p>Add your account information</p>
            </div>
          </div>
          <div class="step completed">
            <span class="step-num">✓</span>
            <div class="step-info">
              <h4>Company Details</h4>
              <p>Add your business information</p>
            </div>
          </div>
          <div class="step completed">
            <span class="step-num">✓</span>
            <div class="step-info">
              <h4>Pickup Address</h4>
              <p>Enter your pickup address</p>
            </div>
          </div>
          <div class="step completed">
            <span class="step-num">✓</span>
            <div class="step-info">
              <h4>Bank Details</h4>
              <p>Add payment information</p>
            </div>
  </div>
          <div class="step completed">
            <span class="step-num">✓</span>
            <div class="step-info">
              <h4>Store Setup</h4>
              <p>Create your online store</p>
  </div>
  </div>

          <div class="step active final-step">
            <span class="step-num">🎉</span>
            <div class="step-info">
              <h4>Review & Launch</h4>
              <p>Final review and go live</p>
  </div>
  </div>
  </div>
</div>
            
             
             
      <!-- Center: Form -->
      <div class="form-section">
        <div v-if="successResponse" class="success-container">
          <!-- Special Final Step Header -->
          <div class="final-step-header">
            <div class="celebration-icon">🎉</div>
            <h2 class="celebration-title">Congratulations!</h2>
            <p class="celebration-subtitle">Your shop has been successfully created</p>
          </div>

          <!-- Shop Success Card -->
          <div class="success-card">
            <div class="shop-logo-container">
              <div class="shop-logo-circle">
                <img
                :src="successResponse?.data?.shop_logo 
                  ? IMG_URL + successResponse.data.shop_logo 
                  : 'https://cruximg.s3.eu-north-1.amazonaws.com/img/shop.svg'"
                :alt="successResponse?.data?.shop_name || 'Shop Logo'"
                class="shop-logo"
              />

              </div>
            </div>
            
            <div class="shop-info">
              <h3 class="shop-name">{{ successResponse.data.shop_name }}</h3>
              <p class="shop-status">✅ Your shop has been created successfully! It’s now under review by our team.</p>
            </div>

            <div class="success-message">
              <h4>🎊 Welcome To The Welfog Family!</h4>
              <p>Your shop account has been created successfully and is now under review. Our team is verifying your details to ensure everything is in order. You’ll be notified once your shop is approved and ready to start selling.</p>
        </div>

            <div class="action-buttons">
              <button @click="login_shop()" class="btn btn-primary dashboard-btn">
                <span class="btn-icon">🚀</span>
                Go to Dashboard
              </button>
                        </div>
                    </div>

                </div>

        <!-- Loading State -->
        <div v-else class="loading-container">
          <div class="loading-header">
            <div class="loading-shimmer shimmer-title"></div>
            <div class="loading-shimmer shimmer-subtitle"></div>
                        </div>
          
          <div class="loading-card">
            <div class="loading-logo shimmer-circle"></div>
            <div class="loading-content">
              <div class="loading-shimmer shimmer-text"></div>
              <div class="loading-shimmer shimmer-text-small"></div>
                      </div>
            <div class="loading-shimmer shimmer-button"></div>
                    </div>
                  </div>

        <!-- Login Link Section -->

        <!-- Terms & Conditions Section -->

                </div>

      <!-- Right: What's Next Section -->
      <div class="trust-section">
        <h3>What's Next?</h3>
        <div class="features-grid">
          <div class="feature-item">
            <div class="feature-icon">📦</div>
            <h5>Add Products</h5>
            <p>Start adding your products to your shop</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">📊</div>
            <h5>Track Sales</h5>
            <p>Monitor your sales and analytics</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">💬</div>
            <h5>Customer Support</h5>
            <p>Get help from our support team</p>
          </div>
        </div>
</div>
    </div>
</div>
  </template>
  
  <script>
  import { mapActions, mapState } from 'vuex';
  import axios from "axios";

  export default {
    data() {
    return {
      IMG_URL: process.env.IMG_URL,
      quantity: 1,
      successResponse: null, 
      tokenForLog: '',
      email: '',
    };
  },

    computed: {
      ...mapState({
        gstData: state => state.gstData,
      }),
    },
    created() {
        this.fetchSuccessShopData();
    },
    methods: {
      ...mapActions(['success_shop']),

        async fetchSuccessShopData() {
        try {
            const response = await this.success_shop();
            this.successResponse = response; 
            const encodedpass = this.successResponse.data.token;
            const tokenForLog = atob(encodedpass);
            const encodedemail = this.successResponse.data.email;
            this.tokenForLog = tokenForLog;
            this.email = encodedemail;
        } catch (error) {
            console.error('Error fetching success shop data:', error);
        }
        },

        async login_shop() {
                const token = this.tokenForLog;
      const token_email = this.email;
                try {
        await this.$store.dispatch('log_in_me', { token, token_email });
                    // Optionally, you can show a success message or update UI here
                } catch (error) {
        console.error('Error logging in:', error);
                    // Handle error or show error message
                }
    }
    },
  };
  </script>

<style scoped>
.page-container {
  min-height: 100vh;
  background: #f8f9fa;
  font-family: Arial, sans-serif;
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
  min-height: 80vh;
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

.step.completed {
  background: #f0f8f0;
  border: 1px solid #28a745;
}

.step.final-step {
  background: linear-gradient(135deg, #fff5f0 0%, #fef7f0 100%);
  border: 2px solid #fb5404;
  box-shadow: 0 4px 12px rgba(251, 84, 4, 0.2);
  animation: finalStepPulse 2s ease-in-out infinite;
}

@keyframes finalStepPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
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

.step.completed .step-num {
  background: #28a745;
  color: white;
  font-size: 1.2rem;
}

.step.final-step .step-num {
  background: linear-gradient(135deg, #fb5404 0%, #ff6b35 100%);
    color: white;
  font-size: 1.6rem;
  animation: celebrationBounce 1s ease-in-out infinite;
}

@keyframes celebrationBounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}

.step-info h4 {
  margin: 0 0 0.25rem 0;
  font-size: 1.4rem;
  color: #333;
}

.step-info p {
  margin: 0;
  font-size: 1.2rem;
  color: #666;
}

.step.active .step-info h4 {
  color: #fb5404;
}

.step.completed .step-info h4 {
  color: #28a745;
}

.step.final-step .step-info h4 {
    color: #fb5404;
    font-weight: 600;
}

/* Form Section */
.form-section {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  text-align: center;
  min-height: 600px;
}

/* Success Container */
.success-container {
  text-align: center;
}

.final-step-header {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #fb5404 0%, #ff6b35 100%);
  border-radius: 12px;
    color: white;
  position: relative;
  overflow: hidden;
}

.final-step-header::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
  animation: celebrationGlow 3s ease-in-out infinite;
}

@keyframes celebrationGlow {
  0%, 100% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(1.1) rotate(180deg); }
}

.celebration-icon {
  font-size: 3rem;
  margin-bottom: 0.5rem;
  animation: celebrationSpin 2s ease-in-out infinite;
}

@keyframes celebrationSpin {
  0%, 100% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(10deg) scale(1.1); }
}

.celebration-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  text-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.celebration-subtitle {
  font-size: 1.3rem;
  margin: 0;
  opacity: 0.9;
}

.success-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
  border: 1px solid #e9ecef;
}

.shop-logo-container {
  margin-bottom: 1.5rem;
}

.shop-logo-circle {
  width: 120px;
  height: 120px;
    border-radius: 50%;
  border: 4px solid #fb5404;
  margin: 0 auto;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(251, 84, 4, 0.3);
  animation: logoFloat 3s ease-in-out infinite;
}

@keyframes logoFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.shop-logo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.shop-info {
  margin-bottom: 1.5rem;
}

.shop-name {
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin: 0 0 0.5rem 0;
}

.shop-status {
  font-size: 1.2rem;
  color: #28a745;
  margin: 0;
  font-weight: 500;
}

.success-message {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border-left: 4px solid #fb5404;
}

.success-message h4 {
    color: #fb5404;
  font-size: 1.5rem;
  margin: 0 0 1rem 0;
}

.success-message p {
  color: #666;
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0;
}

.action-buttons {
  margin-bottom: 2rem;
}

.dashboard-btn {
  background: linear-gradient(135deg, #fb5404 0%, #ff6b35 100%);
    color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1.3rem;
  font-weight: 600;
    cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 15px rgba(251, 84, 4, 0.3);
}

.dashboard-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(251, 84, 4, 0.4);
}

.btn-icon {
  font-size: 1.2rem;
}

/* Features Section */
.features-section {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
}

.features-section h4 {
  color: #333;
  font-size: 1.5rem;
  margin: 0 0 1.5rem 0;
  text-align: center;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
}

.feature-item {
    text-align: center;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  transition: transform 0.3s ease;
}

.feature-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.feature-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.feature-item h5 {
  color: #333;
  font-size: 1.1rem;
  margin: 0 0 0.5rem 0;
}

.feature-item p {
  color: #666;
  font-size: 0.9rem;
  margin: 0;
  line-height: 1.4;
}

/* Loading States */
.loading-container {
  text-align: center;
}

.loading-header {
  margin-bottom: 2rem;
}

.loading-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
  border: 1px solid #e9ecef;
}

.loading-logo {
  width: 120px;
  height: 120px;
    border-radius: 50%;
  margin: 0 auto 1.5rem;
}

.loading-content {
  margin-bottom: 1.5rem;
}

.loading-shimmer {
  background: linear-gradient(90deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  border-radius: 4px;
  animation: shimmer 1.5s infinite;
}

.shimmer-title {
  height: 30px;
  width: 250px;
  margin: 0 auto 1rem;
}

.shimmer-subtitle {
  height: 20px;
  width: 200px;
  margin: 0 auto;
}

.shimmer-circle {
  height: 120px;
  width: 120px;
  border-radius: 50%;
}

.shimmer-text {
  height: 20px;
  width: 150px;
  margin: 0 auto 0.5rem;
}

.shimmer-text-small {
  height: 16px;
  width: 200px;
  margin: 0 auto;
}

.shimmer-button {
  height: 50px;
  width: 200px;
  margin: 0 auto;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
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

.trust-section .features-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.trust-section .feature-item {
  text-align: center;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  transition: transform 0.3s ease;
}

.trust-section .feature-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  background: white;
}

.trust-section .feature-icon {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.trust-section .feature-item h5 {
  color: #333;
  font-size: 1.1rem;
  margin: 0 0 0.5rem 0;
  font-weight: 600;
}

.trust-section .feature-item p {
  color: #666;
  font-size: 0.9rem;
  margin: 0;
  line-height: 1.4;
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
  font-weight: 100;
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
  
  .features-grid {
    grid-template-columns: 1fr;
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
</style>
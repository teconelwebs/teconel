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
            <span class="step-num">1</span>
            <div class="step-info">
              <h4>Account Details</h4>
              <p>Add your account information</p>
            </div>
          </div>
          <div class="step completed">
            <span class="step-num">2</span>
            <div class="step-info">
              <h4>Company Details</h4>
              <p>Add your business information</p>
            </div>
          </div>
          <div class="step active">
            <span class="step-num">3</span>
            <div class="step-info">
              <h4>Pickup Address</h4>
              <p>Enter your pickup address</p>
            </div>
          </div>
          <div class="step">
            <span class="step-num">4</span>
            <div class="step-info">
              <h4>Bank Details</h4>
              <p>Add payment information</p>
            </div>
          </div>
          <div class="step">
            <span class="step-num">5</span>
            <div class="step-info">
              <h4>Store Setup</h4>
              <p>Create your online store</p>
            </div>
          </div>

          <div class="step">
            <span class="step-num">6</span>
            <div class="step-info">
              <h4>Review & Launch</h4>
              <p>Final review and go live</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Center: Form -->
      <div class="form-section">
        <h2>Pickup Address</h2>
        <p>Please provide your pickup address information to continue</p>
        
          <div class="form-group">
            <label>Pincode*</label>
            <div class="input-with-button">
              <input 
                type="text" 
                inputmode="numeric"
                maxlength="10"
                v-model="pincode_number" 
                class="form-control" 
                id="pincode_number" 
                placeholder="Enter Pincode Number" 
                name="pincode" 
                required
                @input="onPincodeInput"
              />
              <button 
                class="verify-btn" 
                @click.prevent="doVerifyPincode()"
                :disabled="isLoadingC"
              >
                <span v-if="isLoadingC">
                  <div class="spinner-border" role="status"></div>
                </span>
                <span v-else>Verify</span>
              </button>
            </div>
            <p v-if="pincodeVerifyError" class="pincode-error" role="alert">
              {{ pincodeVerifyError }}
            </p>
          </div>

          <div v-if="pincodeData">
            <div class="form-group">
              <label for="first_address">First Address*</label>
              <div class="input-wrapper">
                <input
                  type="text"
                  v-model="first_address" 
                  class="form-control"
                  id="first_address"
                  placeholder="First Address"
                  required
                />
              </div>
            </div>

            <div class="form-group">
              <label for="secondary_address">Secondary Address*</label>
              <div class="input-wrapper">
                <input
                  type="text"
                  v-model="secondary_address"
                  class="form-control"
                  id="secondary_address"
                  placeholder="Secondary Address"
                  required
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group col">
                <label for="shop_city">City*</label>
                <div class="input-wrapper">
                  <input
                    type="text"
                    :value="pincodeData.city"
                    class="form-control"
                    id="shop_city"
                    placeholder="City"
                    readonly
                    required
                  />
                </div>
              </div>

              <div class="form-group col">
                <label for="shop_state">State*</label>
                <div class="input-wrapper">
                  <input
                    type="text"
                    :value="pincodeData.state"
                    class="form-control"
                    id="shop_state"
                    placeholder="State"
                    readonly
                    required
                  />
                </div>
              </div>      

              <div class="form-group col">
                <label for="shop_country">Country*</label>
                <div class="input-wrapper">
                  <input
                    type="text"
                    :value="pincodeData.country || shop_country"
                    class="form-control"
                    id="shop_country"
                    placeholder="Country"
                    readonly
                    required
                  />
                </div>
              </div>
            </div>

            <button  @click="Submit_Address()" class="btn btn-primary next_buttonm_p">
              <span v-if="isLoading">Saving....</span>
              <span v-else>Next</span>
            </button>
          </div>

        <!-- Login Link Section -->
        

        <!-- Terms & Conditions Section -->
        
      </div>

      <!-- Right: Pickup Address & Logistics -->
      <div class="trust-section">
        <h3>Pickup Address & Logistics</h3>
        
        <div class="trust-items">
          <div class="trust-item">
            <div class="icon">📍</div>
            <div class="content">
              <h4>Accurate Address</h4>
              <p>Provide correct pickup address for smooth logistics</p>
            </div>
          </div>

          <div class="trust-item">
            <div class="icon">🚚</div>
            <div class="content">
              <h4>Fast Pickup</h4>
              <p>Quick pickup service for your orders</p>
            </div>
          </div>

          <div class="trust-item">
            <div class="icon">📦</div>
            <div class="content">
              <h4>Safe Handling</h4>
              <p>Your products are handled with care during pickup</p>
            </div>
          </div>

          <div class="trust-item">
            <div class="icon">⏰</div>
            <div class="content">
              <h4>Flexible Timing</h4>
              <p>Schedule pickup at your convenient time</p>
            </div>
          </div>
        </div>

        <div class="stats">
          <h4>Logistics Benefits</h4>
          <div class="stat-row">
            <span class="number">24hrs</span>
            <span class="label">Pickup Time</span>
          </div>
          <div class="stat-row">
            <span class="number">₹0</span>
            <span class="label">Pickup Fee</span>
          </div>
          <div class="stat-row">
            <span class="number">100%</span>
            <span class="label">Secure</span>
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
      pincode_number: '',
      first_address: '',
      secondary_address: '',
      shop_country: 'India'
    };
  },

  computed: {
    ...mapState({
      pincodeData: state => state.pincodeData,
      pincodeVerifyError: state => state.pincodeVerifyError,
      isLoading: state => state.isLoading,
      isLoadingC: state => state.isLoadingC,
    }),
  },
  created() {
    //   this.$store.dispatch('VerifyNumber'); 
  },
  methods: {
    ...mapActions(['Verify_Pincode', 'resetPincodeVerification']),

    doVerifyPincode() {
      this.Verify_Pincode(this.pincode_number);
    },

    onPincodeInput() {
      this.resetPincodeVerification();
    },

    Submit_Address() {
      if (!this.pincodeData || !this.pincodeData.city) {
        alert('Please verify your pincode before continuing.');
        return;
      }

      const addressData = {
        pincode_number: this.pincode_number,
        first_address: this.first_address,
        secondary_address: this.secondary_address,
        shop_city: this.pincodeData.city,
        shop_state: this.pincodeData.state,
        shop_country: this.pincodeData.country || this.shop_country,
      };
      this.$store.dispatch('Submit_Address', addressData);
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

.step.completed .step-info h4 {
  color: #28a745;
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

.form-control {
  flex: 1;
  border: none;
  padding: 0.75rem;
  font-size: 1.5rem;
  outline: none;
}

.form-control:focus {
  border-color: #fb5404;
  box-shadow: 0 0 0 2px rgba(251, 84, 4, 0.1);
}

.form-control::placeholder {
  color: #999;
}

/* Input with button container */
.input-with-button {
  display: flex;
  border: 2px solid #e9ecef;
  border-radius: 6px;
  overflow: hidden;
  transition: border-color 0.3s ease;
}

.input-with-button:focus-within {
  border-color: #fb5404;
}

.input-with-button .form-control {
  flex: 1;
  border: none;
  padding: 0.75rem;
  font-size: 1.5rem;
  outline: none;
  border-radius: 0;
}

.input-with-button .form-control:focus {
  border: none;
  box-shadow: none;
}

.verify-btn {
  background: #fb5404;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1.3rem;
  font-weight: 600;
  cursor: pointer;
  min-width: 120px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 0;
  position: relative;
}

.verify-btn .spinner-border {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 8px;
  margin-top: 4px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.verify-btn:hover:not(:disabled) {
  background: #e04a00;
}

.verify-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.pincode-error {
  margin: 0.5rem 0 0 0;
  font-size: 1.3rem;
  color: #c0392b;
  line-height: 1.4;
  text-align: left;
}

.btn.btn-primary {
  width: 100%;
  background: #fb5404;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-size: 1.5rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;
}

.btn.btn-primary:hover:not(:disabled) {
  background: #e04a00;
}

.btn.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.form-control:read-only {
  background-color: #f8f9fa;
  cursor: not-allowed;
}

/* Form Row for multiple columns */
.form-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.form-row .form-group {
  flex: 1;
  margin-bottom: 0;
}

.form-row .form-group label {
  white-space: nowrap;
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
  
  .form-row {
    flex-direction: column;
    gap: 0;
  }
  
  .form-row .form-group {
    margin-bottom: 1.5rem;
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

button.btn.btn-primary.next_buttonm_p {
    width: 100% !important;
    border-radius: 0px;
}
</style>
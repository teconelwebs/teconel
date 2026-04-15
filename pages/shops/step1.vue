<template>
  <div class="page-container">
    <!-- Header -->
 
    <!-- Main Content -->
    <div class="main-content">
      <!-- Left: Steps -->
      <div class="steps-section">
        <h3>Registration Process</h3>
        <div class="steps">
          <div class="step active">
            <span class="step-num">1</span>
            <div class="step-info">
              <h4>Account Details</h4>
              <p>Add your account information</p>
            </div>
          </div>
          <div class="step">
            <span class="step-num">2</span>
            <div class="step-info">
              <h4>Company Details</h4>
              <p>Add your business information</p>
            </div>
          </div>
          <div class="step">
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
        <h2>Account Details</h2>
        <p>Please provide your account information to continue</p>
        
        <form>
          <div class="form-group">
            <label>Phone Number</label>
            <div class="input-wrapper">
              <input
                type="text"
                :value="phone"
                class="form-control"
                id="phone"
                readonly
                placeholder="Enter Your Phone"
                required
              />
            </div>
            <div class="edit-link">
              <nuxt-link to="/">Edit phone number?</nuxt-link>
            </div>
          </div>

          <div class="form-group">
            <label>Email Address</label>
            <div class="input-with-button">
              <input 
                type="email" 
                class="form-control" 
                id="user_email" 
                placeholder="Enter Your Email"   
                :readonly="issuccess === 'true'"  
                required 
              />
              <button 
                v-bind:style="{ display: issuccess === 'true' ? 'none' : 'block' }" 
                class="verify-btn" 
                @click.prevent="verifyMailId()"
                :disabled="isLoadingC"
              >
                <span v-if="isLoadingC">
                  <div class="spinner-border" role="status"></div>
                </span>
                <span v-else>Send OTP</span>
              </button>
            </div>
          </div>

          <div v-if="isOtpSent == 'true'" class="form-group">
            <div v-if="OtpInput == 'true'">
              <label>Email Verification Code</label>
              <div class="input-with-button">
                <input 
                  type="number" 
                  class="form-control" 
                  id="user_email_otp" 
                  placeholder="Enter Your OTP" 
                  v-model="otpValue"
                  :class="{ 'is-invalid': isInvalidOtp }"
                  required 
                />
                <button class="verify-btn" @click.prevent="verifyemail()" :class="{ 'disabled': isVerifying }">
                  <span v-if="isVerifying">
                    <div class="spinner-border" role="status"></div>
                  </span>
                  <span v-else-if="issuccess === 'true'">Verified</span>
                  <span v-else>Verify OTP</span>
                </button>
              </div>
              <div v-if="isInvalidOtp" class="error-message">Invalid OTP. Please try again.</div>
            </div>
          </div>

          <div v-if="issuccess == 'true'">
            <div class="edit-link">
              <a @click="edit_email_address()">Edit mail address?</a>
            </div>

            <div class="form-group">
              <label>Full Name</label>
              <div class="input-wrapper">
                <input
                  type="text"
                  class="form-control"
                  id="user_name"
                  placeholder="Enter Your Name"
                  v-model="userName"
                  :class="{ 'is-invalid': nameError }"
                  @input="validateName"
                  required
                />
              </div>
              <div v-if="nameError" class="error-message">Please enter your name</div>
            </div>

            <div class="form-group">
              <label>Password</label>
              <div class="password-input-container">
                <input
                  :type="showPassword ? 'text' : 'password'"
                  class="form-control"
                  id="password"
                  placeholder="Enter Your Password"
                  v-model="password"
                  :class="{ 'is-invalid': passwordError }"
                  @input="validatePassword"
                  required
                />
                <span class="password-toggle" @click="togglePasswordVisibility">
                  <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </span>
              </div>
              <div v-if="passwordError" class="error-message">Please enter a password</div>
              <div class="password-strength" v-if="password">
                <div class="strength-bar" :class="strengthClass"></div>
                <div class="strength-text">{{ strengthText }}</div>
              </div>
            </div>

            <div class="form-group">
              <label>Confirm Password</label>
              <div class="password-input-container">
                <input
                  :type="showConfirmPassword ? 'text' : 'password'"
                  class="form-control"
                  id="confirm_password"
                  placeholder="Confirm Your Password"
                  v-model="confirmPassword"
                  :class="{ 'is-invalid': confirmPasswordError }"
                  @input="validateConfirmPassword"
                  required
                />
                <span class="password-toggle" @click="toggleConfirmPasswordVisibility">
                  <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </span>
              </div>
              <div v-if="confirmPasswordError" class="error-message">Please confirm your password</div>
              <button type="button" class="btn btn-outline-primary genrate_pass" @click="generateStrongPassword">
                <i class="fas fa-key"></i> Generate Strong Password
              </button>
            </div>

            <button type="submit" @click.prevent="validateForm" class="btn btn-primary next_buttonm_p" :disabled="isLoading">
              <span v-if="isLoading">Saving...</span> 
              <span v-else>Next</span>
            </button>
          </div>
        </form>

        <!-- Login Link Section -->
       

        <!-- Terms & Conditions Section -->
       
      </div>

      <!-- Right: Account Information -->
      <div class="trust-section">
        <h3>Account Information</h3>
        
        <div class="trust-items">
          <div class="trust-item">
            <div class="icon">📱</div>
            <div class="content">
              <h4>Phone Verification</h4>
              <p>Your phone number is verified and secure</p>
            </div>
          </div>

          <div class="trust-item">
            <div class="icon">📧</div>
            <div class="content">
              <h4>Email Verification</h4>
              <p>Verify your email for account security</p>
            </div>
          </div>

          <div class="trust-item">
            <div class="icon">🔐</div>
            <div class="content">
              <h4>Secure Password</h4>
              <p>Create a strong password for your account</p>
            </div>
          </div>

          <div class="trust-item">
            <div class="icon">👤</div>
            <div class="content">
              <h4>Profile Setup</h4>
              <p>Complete your profile information</p>
            </div>
          </div>
        </div>

        <div class="stats">
          <h4>Account Security</h4>
          <div class="stat-row">
            <span class="number">100%</span>
            <span class="label">Secure</span>
          </div>
          <div class="stat-row">
            <span class="number">2FA</span>
            <span class="label">Enabled</span>
          </div>
          <div class="stat-row">
            <span class="number">24/7</span>
            <span class="label">Monitoring</span>
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
      phone: localStorage.getItem('phone'),
      issuccess:  false,
      isOtpSent: false,
      isVerifying: false,
      isInvalidOtp: false,
      otpValue: '',
      password: '',
      confirmPassword: '',
      userName: '',
      showPassword: false,
      showConfirmPassword: false,
      hasMinLength: false,
      hasUpperCase: false,
      hasLowerCase: false,
      hasNumber: false,
      hasSpecialChar: false,
      strengthClass: 'weak',
      strengthText: 'Weak',
      nameError: false,
      passwordError: false,
      confirmPasswordError: false
    };
  },

  computed: {
    ...mapState({
      cartItems: state => state.cartItems,
      isLoading: state => state.isLoading,
      emailveri : state => state.EmailVerify,
      otpVerify : state => state.OTP_Verify_email,
      isLoadingC: state => state.isLoadingC,
    }),
  },

  created() {
    //   this.$store.dispatch('VerifyNumber'); 

       /////// this.emailresponse();
     
  },

  methods: {
    ...mapActions(['VerifyNumber']),
    ...mapActions(['CreateAccount']),
    ...mapActions(['verifyMail']),
    ...mapActions(['verifyMailOtp']),

    edit_email_address(){
      this.issuccess = 'false';
      this.isOtpSent = 'false';
         console.log('thi ssssi otpVerify' , typeof this.otpVerify.result);
    },

    async verifyMailId(){
      try {
          const response = await this.verifyMail();
          this.isOtpSent = response.result;
          this.OtpInput =   response.result;
          
          console.log('after otp sent to email tis response ', response.result);
      } catch (error) {
          console.error('Error fetching success shop data:', error);
      }
    },
    
    async verifyemail(){
      try {
          this.isVerifying = true;
          this.isInvalidOtp = false;
          const response = await this.verifyMailOtp();
          if (response.result === 'true') {
            this.issuccess = 'true';
            this.OtpInput = 'false';
          } else {
            this.isInvalidOtp = true;
          }
      } catch (error) {
          console.error('Error fetching success shop data:', error);
          this.isInvalidOtp = true;
      } finally {
          this.isVerifying = false;
      }
    },
    
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    toggleConfirmPasswordVisibility() {
      this.showConfirmPassword = !this.showConfirmPassword;
    },
    checkPasswordStrength() {
      const password = this.password;
      
      // Check requirements
      this.hasMinLength = password.length >= 8;
      this.hasUpperCase = /[A-Z]/.test(password);
      this.hasLowerCase = /[a-z]/.test(password);
      this.hasNumber = /[0-9]/.test(password);
      this.hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

      // Calculate strength
      const requirementsMet = [
        this.hasMinLength,
        this.hasUpperCase,
        this.hasLowerCase,
        this.hasNumber,
        this.hasSpecialChar
      ].filter(Boolean).length;

      if (requirementsMet === 5) {
        this.strengthClass = 'strong';
        this.strengthText = 'Strong';
      } else if (requirementsMet >= 3) {
        this.strengthClass = 'medium';
        this.strengthText = 'Medium';
      } else {
        this.strengthClass = 'weak';
        this.strengthText = 'Weak';
      }
    },
    generateStrongPassword() {
      const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const lowercase = 'abcdefghijklmnopqrstuvwxyz';
      const numbers = '0123456789';
      const specialChars = '!@#$%^&*(),.?":{}|<>';
      
      let password = '';
      
      // Ensure at least one of each type
      password += uppercase.charAt(Math.floor(Math.random() * uppercase.length));
      password += lowercase.charAt(Math.floor(Math.random() * lowercase.length));
      password += numbers.charAt(Math.floor(Math.random() * numbers.length));
      password += specialChars.charAt(Math.floor(Math.random() * specialChars.length));
      
      // Add remaining characters to reach 12 characters
      const allChars = uppercase + lowercase + numbers + specialChars;
      for (let i = password.length; i < 12; i++) {
        password += allChars.charAt(Math.floor(Math.random() * allChars.length));
      }
      
      // Shuffle the password
      password = password.split('').sort(() => Math.random() - 0.5).join('');
      
      this.password = password;
      this.confirmPassword = password;
      this.checkPasswordStrength();
    },
    validateName() {
      this.nameError = !this.userName.trim();
    },
    validatePassword() {
      this.passwordError = !this.password.trim();
      this.checkPasswordStrength();
    },
    validateConfirmPassword() {
      this.confirmPasswordError = !this.confirmPassword.trim();
    },
    validateForm() {
      this.validateName();
      this.validatePassword();
      this.validateConfirmPassword();

      if (!this.nameError && !this.passwordError && !this.confirmPasswordError) {
        this.CreateAccount();
      }
    },
    
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
  margin-top :4px;
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

.verify-btn.disabled {
  opacity: 0.7;
  cursor: not-allowed;
}










.edit-link {
  text-align: right;
  margin-top: 0.5rem;
}

.edit-link a {
  color: #fb5404;
  text-decoration: none;
  font-size: 1.3rem;
  transition: color 0.3s ease;
}

.edit-link a:hover {
  color: #e04a00;
  text-decoration: underline;
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

.btn-outline-primary {
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: 1px solid #fb5404;
  color: #fb5404;
  background: transparent;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-size: 1.3rem;
}

.btn-outline-primary:hover {
  background: #fb5404;
  color: white;
}

.password-input-container {
  position: relative;
  display: flex;
  align-items: center;
  border: 2px solid #e9ecef;
  border-radius: 6px;
  overflow: hidden;
}

.password-input-container:focus-within {
  border-color: #fb5404;
}

.password-input-container .form-control {
  flex: 1;
  border: none;
  padding: 0.75rem;
  font-size: 1.5rem;
  outline: none;
}

.password-toggle {
  position: absolute;
  right: 10px;
  cursor: pointer;
  color: #666;
  font-size: 1.2rem;
}

.password-strength {
  margin-top: 0.5rem;
}

.strength-bar {
  height: 4px;
  border-radius: 2px;
  transition: width 0.3s ease;
}

.strength-bar.weak {
  width: 33%;
  background-color: #ff4444;
}

.strength-bar.medium {
  width: 66%;
  background-color: #ffbb33;
}

.strength-bar.strong {
  width: 100%;
  background-color: #00C851;
}

.strength-text {
  font-size: 1.2rem;
  color: #666;
  margin-top: 2px;
}

.error-message {
  color: #dc3545;
  font-size: 1.3rem;
  margin-top: 0.5rem;
}

.is-invalid {
  border-color: #dc3545 !important;
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

.form-section button {
    width: 10px !important;
    background: #fb5404;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 0px;
    font-size: 1.5rem;
    font-weight: 600;
    cursor: pointer;
}

button.btn.btn-outline-primary.genrate_pass {
    width: 58% !important;
    border-radius: 7px;
}

button.btn.btn-primary.next_buttonm_p {
    width: 100% !important;
}

button.button_to_verify {
    width: 100% !important;
}
</style>
  
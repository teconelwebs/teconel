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
          <div class="step completed">
            <span class="step-num">3</span>
            <div class="step-info">
              <h4>Pickup Address</h4>
              <p>Enter your pickup address</p>
            </div>
          </div>
          <div class="step active">
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
        <h2>Bank Details</h2>
        <p>Please provide your bank information to continue</p>
        
        <form @submit.prevent="Submit_bank">
          <div class="form-group">
            <label for="account_number">Bank Account Number*</label>
            <div class="input-wrapper">
              <input
                type="text"
                class="form-control"
                id="account_number"
                placeholder="Bank Account Number"
                v-model="accountNumber"
                required
                @paste.prevent
                @copy.prevent
                @cut.prevent
              />
            </div>
          </div>

          <div class="form-group">
            <label for="confirm_account_number">Confirm Account Number*</label>
            <div class="input-wrapper">
              <input
                type="text"
                class="form-control"
                id="confirm_account_number"
                placeholder="Confirm Account Number"
                v-model="confirmAccountNumber"
                required
                @paste.prevent
                @copy.prevent
                @cut.prevent
              />
            </div>
            <div v-if="accountNumberError" class="error-message">{{ accountNumberError }}</div>
          </div>

          <div class="form-group">
            <label for="ifsc_code">IFSC Code*</label>
            <div class="input-with-button">
              <input
                type="text"
                v-model="ifscCode"
                class="form-control"
                id="ifsc_code"
                placeholder="Enter IFSC"
                required
              />
              <button 
                class="verify-btn" 
                @click.prevent="handleIFSCClick"
                :disabled="isLoadingC"
              >
                <span v-if="isLoadingC">
                  <div class="spinner-border" role="status"></div>
                </span>
                <span v-else>Verify</span>
              </button>
            </div>
            <div v-if="ifscCodeError" class="error-message">{{ ifscCodeError }}</div>
          </div>

          <div v-if="ifscData.status == 'ACTIVE'">
            <div class="form-row">
              <div class="form-group col">
                <label for="account_holder_name">Account Holder Name*</label>
                <div class="input-wrapper">
                  <input
                    type="text"
                    class="form-control"
                    :value="ifscData.name"
                    id="account_holder_name"
                    placeholder="Account Holder name"
                    readonly
                  />
                </div>
              </div>
              
              <div class="form-group col">
                <label for="bank_name">Bank Name*</label>
                <div class="input-wrapper">
                  <input
                    type="text"
                    :value="ifscData.ifsc.bank"
                    class="form-control"
                    id="bank_name"
                    placeholder="Bank Name"
                    readonly
                    required
                  />
                </div>
              </div>
            </div>

            <div class="form-group">
              <label for="branch_address">Branch Address*</label>
              <div class="input-wrapper">
                <input
                  type="text"
                  :value="`${ifscData.ifsc.bank}, ${ifscData.ifsc.branch}`"
                  class="form-control"
                  id="branch_address"
                  placeholder="Branch Address"
                  readonly
                  required
                />
              </div>
            </div>

            <div class="form-group">
              <label for="cancel_check_photo">Upload ( Cancel Check or Bank Statement )*</label>
              <div class="input-wrapper">
                <input
                  ref="cancelCheckPhoto"
                  @change="onFileChange"
                  type="file"
                  class="form-control"
                  id="cancel_check_photo"
                  accept="image/*"
                  required
                />
              </div>
              <div v-if="imageError" class="error-message">{{ imageError }}</div>
            </div>

            <button type="submit" @click="Submit_bank()" class="btn btn-primary next_buttonm_p">
              <span v-if="isLoading">Saving....</span>
              <span v-else>Next</span>
            </button>
          </div>
        </form>

        <!-- Login Link Section -->
      

        <!-- Terms & Conditions Section -->
        <div class="terms-section">
        
        </div>
      </div>

      <!-- Right: Bank Details & Payment -->
      <div class="trust-section">
        <h3>Bank Details & Payment</h3>
        
        <div class="trust-items">
          <div class="trust-item">
            <div class="icon">🏦</div>
            <div class="content">
              <h4>Secure Banking</h4>
              <p>Your bank details are encrypted and secure</p>
            </div>
          </div>

          <div class="trust-item">
            <div class="icon">💳</div>
            <div class="content">
              <h4>Easy Payments</h4>
              <p>Receive payments directly to your bank account</p>
            </div>
          </div>

          <div class="trust-item">
            <div class="icon">⚡</div>
            <div class="content">
              <h4>Quick Settlement</h4>
              <p>Fast payment settlement within 24-48 hours</p>
            </div>
          </div>

          <div class="trust-item">
            <div class="icon">🔒</div>
            <div class="content">
              <h4>Verified Process</h4>
              <p>IFSC verification ensures accurate transfers</p>
            </div>
          </div>
        </div>

        <div class="stats">
          <h4>Payment Benefits</h4>
          <div class="stat-row">
            <span class="number">Instant</span>
            <span class="label">Verification</span>
          </div>
          <div class="stat-row">
            <span class="number">₹0</span>
            <span class="label">Transfer Fee</span>
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
import axios from "axios";

export default {
  data() {
    return {
      IMG_URL: process.env.IMG_URL,
      quantity: 1,
      accountNumber: '',
      confirmAccountNumber: '',
      accountNumberError: '',
      ifscCodeError: '',
      ifscCode: '',
      imageError: '',
    };
  },

  computed: {
    ...mapState({
      ifscData: state => state.ifscData,
      isLoading: state => state.isLoading,
      isLoadingC: state => state.isLoadingC,
    }),
  },
  created() {
    //   this.$store.dispatch('VerifyNumber'); 
  },
  methods: {
    ...mapActions(['IFSC_code']),
    ...mapActions(['Submit_Address']),

    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.imageFile = file;
        this.imageUrl = URL.createObjectURL(file);
        this.imageError = ''; // Clear error when file is selected
        this.reduceImageSize();
      } else {
        this.imageFile = null;
        this.imageUrl = '';
      }
    },
    formatFileSize(size) {
      if (size >= 1024 * 1024) {
        return (size / (1024 * 1024)).toFixed(2) + ' MB';
      } else if (size >= 1024) {
        return (size / 1024).toFixed(2) + ' KB';
      } else {
        return size + ' bytes';
      }
    },
    reduceImageSize() {
      if (!this.imageFile) {
        alert('Please select an image file.');
        return;
      }
  
      // Keep original image quality - no compression
      const reader = new FileReader();
      reader.readAsDataURL(this.imageFile);
      reader.onload = (e) => {
        // Store the original image data
        this.reducedImageUrl = e.target.result;
        this.reducedFileSize = this.formatFileSize(this.imageFile.size);
        
        // Keep the original file without any processing
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(this.imageFile);
        this.$refs.cancelCheckPhoto.files = dataTransfer.files;
        this.imageUrl = '';
      };
    },

    validateAccountNumbers() {
      this.accountNumberError = '';
      this.ifscCodeError = '';
      this.imageError = '';
      if (!this.accountNumber || !this.confirmAccountNumber) {
        this.accountNumberError = 'Account number fields cannot be empty.';
        return false;
      }
      if (!this.ifscCode) {
        this.ifscCodeError = 'IFSC Code fields cannot be empty.';
        return false;
      }

      if (this.accountNumber !== this.confirmAccountNumber) {
        this.accountNumberError = 'Account numbers do not match.';
        return false;
      }
      this.accountNumberError = '';
      return true;
    },
    async handleIFSCClick() {
      if (this.validateAccountNumbers()) {
        try {
          const accountData = {
            accountNumber: this.accountNumber,
            ifscCode: this.ifscCode,
          };
          const fetchBank = this.$store.dispatch('IFSC_code', accountData);
        } catch (error) {
          console.error('IFSC code verification failed:', error);
        } 
      }
    },

    async Submit_bank() {
      const ifsc_code = document.getElementById('ifsc_code').value;
      const account_holder_name = document.getElementById('account_holder_name').value;
      const account_number = document.getElementById('account_number').value;
      const confirm_account_number = document.getElementById('confirm_account_number').value;
      const bank_name = document.getElementById('bank_name').value;
      const branch_address = document.getElementById('branch_address').value;
      const cancel_check_photo = this.$refs.cancelCheckPhoto.files[0]; // Get the uploaded file

      // Clear previous errors
      this.imageError = '';

      // Validate image file
      if (!cancel_check_photo) {
        this.imageError = 'Cancel check photo is required';
        return;
      }

      if (account_number !== confirm_account_number) {
        alert('Your account numbers do not match');
      } else {
        const bankData = new FormData();
        bankData.append('ifsc_code', ifsc_code);
        bankData.append('account_holder_name', account_holder_name);
        bankData.append('account_number', account_number);
        bankData.append('confirm_account_number', confirm_account_number);
        bankData.append('bank_name', bank_name);
        bankData.append('branch_address', branch_address);
        bankData.append('cancel_check_photo', cancel_check_photo); // Append the image file

        this.$store.dispatch('Submit_Bank', bankData);
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

.error-message {
  color: #dc3545;
  font-size: 1.3rem;
  margin-top: 0.5rem;
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
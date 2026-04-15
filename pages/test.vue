<template>
    <div>
      <div class="formprocess">
        <div class="headprocess">
          <h>Welcome to Welfog</h>
          <p style="margin-bottom: 1px;color: #8b8b8b;">Create your account to start selling</p>
        </div> 
        <center>
          <div style="border-bottom: solid 1px #8b8b8b;width: 20%;  margin-bottom: 18px;"></div>
          <div class="" style="width: 85%;padding-top: 15px; padding-bottom: 15px;">
            <div class="row text-center">
              <div class="col-2"><div class=""><a class="activestep">1</a></div></div>
              <div class="col-2"><div ><a class="activestep">2</a></div></div>
              <div class="col-2"><div ><a class="activestep">3</a></div></div>
              <div class="col-2"><div><a class="activestep">4</a></div></div>
              <div class="col-2"><div class="activeline"><a class="activestep">5</a></div></div>
              <div class="col-2"><div><a class="inactivestep">6</a></div></div>
            </div>
          </div>
        </center> 
      </div>
      <div class="container">
        <div class="form-container">
          <div>
            <a class="headname nav-link active">Shop Details</a>
          </div>
          <form @submit.prevent="submitShop">
            <div class="form-group">
              <label for="shop_name">Shop Name*</label>
              <input
                v-model="shopName"
                type="text"
                class="form-control"
                id="shop_name"
                placeholder="Shop name"
                required
              />
            </div>
            <div class="form-group">
              <label for="shop_logo">Shop Logo*</label>
              <input
                ref="logoInput"
                @change="onFileChange"
                type="file"
                class="form-control"
                id="shop_logo"
                accept="image/*"
                required
              />
            </div>
            <div class="form-group">
              <label for="shop_phone">Contact Person Phone Number*</label>
              <input
                v-model="shopPhone"
                type="text"
                class="form-control"
                id="shop_phone"
                placeholder="Contact Person Phone Number"
                required
              />
            </div>
            <button type="submit" class="btn btn-primary">
              <span v-if="isLoading">Saving....</span>
              <span v-else>Next</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapState } from 'vuex';
  import axios from "axios";
  import { ref } from 'vue';
  
  export default {
    data() {
      return {
        IMG_URL: process.env.IMG_URL,
        shopName: '',
        shopPhone: '',
        isLoading: false
      };
    },
    computed: {
      ...mapState({
        ifscData: state => state.ifscData,
        isLoading: state => state.isLoading
      })
    },
    methods: {
      onFileChange(event) {
        const file = event.target.files[0];
        if (file) {
          this.imageFile = file;
          this.imageUrl = URL.createObjectURL(file);
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
    
        const reader = new FileReader();
        reader.readAsDataURL(this.imageFile);
        reader.onload = (e) => {
          const img = new Image();
          img.src = e.target.result;
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const targetWidth = 200;
            const targetHeight = img.height * (targetWidth / img.width);
            canvas.width = targetWidth;
            canvas.height = targetHeight;
            ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
            let quality = 0.2;
            let dataUrl = canvas.toDataURL('image/webp', quality);
            let currentSize = (dataUrl.length * 3) / 4 / 1024;
            const targetSizeKB = 20;
            while (currentSize > targetSizeKB && quality > 0) {
              quality -= 0.02;
              dataUrl = canvas.toDataURL('image/webp', quality);
              currentSize = (dataUrl.length * 3) / 4 / 1024;
            }
            this.reducedImageUrl = dataUrl;
            this.reducedFileSize = this.formatFileSize((dataUrl.length * 3) / 4);
            fetch(dataUrl)
              .then(res => res.blob())
              .then(blob => {
                const reducedImageFile = new File([blob], 'crux.webp', {
                  type: 'image/webp',
                });
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(reducedImageFile);
                this.$refs.logoInput.files = dataTransfer.files;
                this.imageUrl = '';
              });
          };
        };
      },
      
      
    //   async submitShop() {
    //     try {
    //       this.isLoading = true;
    //       const formData = new FormData();
    //       formData.append('shop_name', this.shopName);
    //       formData.append('shop_phone', this.shopPhone);
    //       formData.append('user_id', localStorage.getItem('shop_user_id'));
    //       const logoInput = this.$refs.logoInput;
    //       if (logoInput.files.length > 0) {
    //         formData.append('shop_logo', logoInput.files[0]);
    //       }
          
    //       const response = await axios.post(`${process.env.MAPI}/api/v2/shop_info`, formData, {
    //         headers: {
    //           'Content-Type': 'multipart/form-data'
    //         }
    //       });
  
    //       this.$store.commit('TOASTER', response.data);
    //       this.isLoading = false;
  
    //       if (response.data.result === 'true') {
    //         this.$router.push({ path: '/shops/step6' });
    //       }
    //     } catch (error) {
    //       console.error('Error submitting form:', error);
    //       // Handle error (e.g., show an error message)
    //     }
    //   }

    async submitShop() {
    try {
        this.isLoading = true;
        const formData = new FormData();
        formData.append('shop_name', this.shopName);
        formData.append('shop_phone', this.shopPhone);
        formData.append('user_id', localStorage.getItem('shop_user_id'));

        // Ensure logoInput is correctly referenced
        const logoInput = this.$refs.logoInput;
        if (logoInput && logoInput.files.length > 0) {
            formData.append('shop_logo', logoInput.files[0]);
        } else {
            console.warn('No logo file selected or logoInput reference is missing');
        }

        // Log FormData for debugging
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        const response = await axios.post(`${process.env.MAPI}/api/v2/shop_info`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        this.$store.commit('TOASTER', response.data);
        this.isLoading = false;

        if (response.data.result === 'true') {
            this.$router.push({ path: '/shops/step6' });
        } else {
            console.error('Error response:', response.data);
            // Handle non-success response
        }

    } catch (error) {
        console.error('Error submitting form:', error);
        // Handle error (e.g., show an error message)
    } finally {
        this.isLoading = false;
    }
}










        


    }
  };
  </script>
  
  <style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .form-container {
    width: 100%;
    max-width: 400px;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  button.btn.btn-primary {
    width: 100%;
  }
  
  .btn {
    display: inline-block;
    border: 2px solid #ccc;
    background-color: #fff;
    color: #666;
    outline: 0;
    border-radius: 0;
    font-family: inherit;
    font-weight: 600;
    font-size: 1.4rem;
    padding: 0.93em 1.98em;
    line-height: 1;
    text-transform: uppercase;
    text-align: center;
    transition: color 0.3s, border-color 0.3s, background-color 0.3s, box-shadow 0.3s;
    white-space: nowrap;
    cursor: pointer;
  }
  
  .activestep {
    background: #fb5404;
    color: white;
    padding: 8px;
    border-radius: 1000px;
    font-weight: 800;
    padding-left: 12px;
    padding-right: 13px;
  }
  
  .activeline {
    border-bottom: solid;
    padding-bottom: 10px;
    color: #008083;
  }
  
  .inactivestep {
    background: #b9b9b9;
    color: white;
    padding: 8px;
    border-radius: 1000px;
    font-weight: 800;
    padding-left: 12px;
    padding-right: 13px;
  }
  
  .formprocess {
    margin-top: 2%;
  }
  
  .headprocess {
    text-align: center;
    font-size: 20px;
    color: #fb5404;
    font-weight: 600;
    width: 100%;
  }
  
  .verify {
    background: #fb5404;
    color: white;
    padding: 16px;
    padding-bottom: 0px;
    margin-bottom: 0px;
    height: 47px;
    padding-top: 11px;
    cursor: pointer;
    text-decoration: none;
    font-weight: 600;
  }
  
  .verify:hover {
    background: #fb5404;
    color: white;
    padding: 16px;
    padding-bottom: 0px;
    margin-bottom: 0px;
    height: 47px;
    padding-top: 11px;
    cursor: pointer;
    text-decoration: none !important;
    font-weight: 600;
  }
  
  .spinner-border {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border: 0.2em solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    animation: spinner .75s linear infinite;
  }
  
  @keyframes spinner {
    to { transform: rotate(360deg); }
  }
  </style>
  
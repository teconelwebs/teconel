<template>
  <header class="header">
    <div
      id="toast"
      class="toast-message"
      :class="[toastVariant, { show: isToastVisible }]"
    >
      {{ toastText }}
    </div>
    
  
   
  <div class="section_p">
    <div class="" style="width: 100%;">
        <div class="row text-center">
            <div class="text-right p1 d-none d-md-block col-md-2">Welcome To Welfog Supplier!</div>
            <div class="marquee-container col-md-8 col-sm-12">
                <span class="marquee-text">
                    <p v-if="site_nav_data" class="welcome-msg pl-2 marquee">
                        {{ site_nav_data.notice_text }}
                    </p>
                </span>
            </div>
            <div class="text-left d-none d-md-block col-md-2"><a href="https://supplier.welfog.com/"> Welfog Supplier Panel</a></div>
        </div>
    </div>
</div>




  </header>



</template>

<script>

import axios from 'axios';
import authMixin from '~/plugins/authMixin';
import { mapGetters, mapState, mapActions  } from 'vuex';

export default {
  
  mixins: [authMixin],
  name: 'Header',
 
  computed: {
  ...mapState({
    user: state => state.user,
    userVerify: state => state.verifyUser,
    message: state => state.isToast,
    site_nav_data: state => state.site_nav_data,
  }),

  
  ...mapGetters(['isAuthenticated', 'getCartQuantity']),
  userName() {
    return this.user ? this.user.name : '';
  },
  cartQuantity() {
    return this.getCartQuantity; 
  },
  toastText() {
    return this.message && this.message.message ? this.message.message : '';
  },
  toastVariant() {
    if (!this.message) {
      return 'toast-error';
    }

    const toastMessage = String(this.message.message || '').toLowerCase();
    const isSuccess =
      this.message.type === 'success' ||
      this.message.result === true ||
      this.message.result === 'true' ||
      this.message.return === true ||
      this.message.return === 'true' ||
      this.message.valid === true ||
      this.message.status === 'ACTIVE' ||
      toastMessage.includes('success');

    return isSuccess ? 'toast-success' : 'toast-error';
  },
  marqueeText() {
    // Always return a text for marquee, never empty
    console.log('Computing marqueeText, site_nav_data:', this.site_nav_data);
    if (this.site_nav_data && this.site_nav_data.message) {
      console.log('Using message from site_nav_data:', this.site_nav_data.message);
      return this.site_nav_data.message;
    }
    console.log('Using fallback message');
    return "Welcome to Welfog! - Your trusted partner for online selling";
  }
},


watch: {
  message(newValue) {
    if (!newValue || !newValue.message) {
      this.isToastVisible = false;
      return;
    }

    this.isToastVisible = true;

    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }

    this.toastTimeout = setTimeout(() => {
      this.isToastVisible = false;
    }, 3500);
  },
  site_nav_data(newValue) {
    console.log('Site nav data changed:', newValue);
    console.log('New value type:', typeof newValue);
    console.log('New value keys:', newValue ? Object.keys(newValue) : 'null');
    if (newValue && newValue.message) {
      console.log('Message in new value:', newValue.message);
    }
  },
},


  data() {
    return {
      student: {},
      IMG_URL: process.env.IMG_URL,
      searchQuery: this.$route.query.keyword || '',
      isToastVisible: false,
      toastTimeout: null
    
    }
  },
 
  async mounted() {
    // this.getData();
    // this.checkCart();
    // this.verifyUser();
    
    
  },

  created() {
    // Load data in background without blocking UI
    this.loadSiteData();
  },

  mounted() {
    // Also try to load data on mount as backup
    if (!this.site_nav_data) {
      this.loadSiteData();
    }
  },

  methods: {
    async loadSiteData() {
      try {
        await this.$store.dispatch('site_nav_data');
        if (this.site_nav_data && this.site_nav_data.notice_text) {
          console.log('Marquee message:', this.site_nav_data.notice_text);
        } else {
          console.log('No message found in site_nav_data:', this.site_nav_data);
        }
      } catch (error) {
        console.error('Error loading site nav data:', error);
      }
    },
    
    async toaster() {
       try {
          console.log('toaster toastertoastertoaster');         
        } catch (error) {
          console.error("Error applyCoupon  to cart:", error);
        }
    },
    
    
    
    ...mapActions(["logout"]),
    performSearch() {
      this.$router.push({ path: '/search', query: { keyword: this.searchQuery } });
    },


    async verifyUser() {
       try {
          await this.$store.dispatch("verifyUser");          
        } catch (error) {
          console.error("Error applyCoupon  to cart:", error);
        }
    },


    async logout(){
      try {
        await this.$store.dispatch("logout");
      } catch (error) {
        console.error("Error applyCoupon  to cart:", error);
      }
    },


     

    getData() { 
      axios.get('http://localhost:3001/nav_data')
        .then(res => {
          this.student = res.data;
          console.log('Marquee:', this.student.notice_text); // Log the marquee type
          console.log('Logo Path:', this.student.header_logo); // Log the logo path
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    },
    ...mapActions(['checkCart']), // Map the 'checkCart' action


 
  }
}
</script>



<style scoped>
   a.w-icon-call {
    color: white !important;
    background: #fb5404;
    border-radius: 100px;
    padding: 8px;
    font-size: 20px !important;
}
.toast-message {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translate(-50%, 20px);
      color: #fff;
      padding: 12px 20px;
      border-radius: 10px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease;
      z-index: 9999;
      min-width: 320px;
      max-width: min(90vw, 560px);
      text-align: center;
      font-size: 14px;
      font-weight: 600;
      line-height: 1.5;
    }

    .toast-message.show {
      opacity: 1;
      visibility: visible;
      transform: translate(-50%, 0);
    }

    .toast-success {
      background: linear-gradient(135deg, #198754 0%, #157347 100%);
    }

    .toast-error {
      background: linear-gradient(135deg, #c0392b 0%, #a93226 100%);
    }


    .section_p {
            background: linear-gradient(135deg, #fb5404 0%, #e04a03 100%);
            color: white;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 15px 20px;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 14px;
            margin-top: 0px;
            font-weight: 400;
            box-shadow: 0 2px 10px rgba(251, 84, 4, 0.3);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
    
    .marquee-container {
            flex: 2;
            overflow: hidden;
            position: relative;
            white-space: nowrap;
            text-align: center;
            mask-image: linear-gradient(to right, transparent, white 15%, white 85%, transparent);
            -webkit-mask-image: linear-gradient(to right, transparent, white 15%, white 85%, transparent);
            padding: 0 10px;
        }

        .marquee-text {
            display: inline-block;
            padding-left: 100%;
            animation: marquee 25s linear infinite;
            white-space: nowrap;
            font-weight: 500;
            letter-spacing: 0.5px;
            animation-delay: 0s;
        }

        .marquee-text:hover {
            animation-play-state: paused;
        }

        .welcome-msg {
            margin: 0;
            padding: 0;
            line-height: 1.4;
        }
 
        @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-100%); }
        }
  /* Extra small screens */
    @media (max-width: 575px) {
        .section_p {
            padding: 12px 15px;
            font-size: 12px;
        }
        .marquee-container {
            flex: 1;
            padding: 0 5px;
        }
        .marquee-text {
            font-size: 11px;
            letter-spacing: 0.3px;
        }
        .text-right, .text-left {
            font-size: 11px;
            text-align: center;
        }
    }

    /* Small screens (tablets and small phones) */
    @media (max-width: 767px) {
        .section_p {
            padding: 13px 17px;
            font-size: 13px;
        }

        .marquee-container {
            flex: 1;
            padding: 0 8px;
        }

        .text-right, .text-left {
            font-size: 12px;
        }

        .marquee-text {
            font-size: 12px;
            letter-spacing: 0.4px;
        }
    }

    /* Medium screens (landscape tablets, small desktops) */
    @media (max-width: 991px) {
        .section_p {
            padding: 14px 18px;
            font-size: 13px;
        }

        .text-right, .text-left {
            font-size: 13px;
        }

        .marquee-text {
            font-size: 13px;
            letter-spacing: 0.4px;
        }
    }

    /* Large screens */
    @media (min-width: 992px) {
        .section_p {
            padding: 15px 20px;
            font-size: 14px;
        }

        .text-right, .text-left {
            font-size: 14px;
        }

        .marquee-text {
            font-size: 14px;
            letter-spacing: 0.5px;
        }
    } 


    .marquee-container.col-md-8 {
        height: 28px;
        display: flex;
        align-items: center;
    }

    .text-right, .text-left {
        font-weight: 600;
        letter-spacing: 0.3px;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }

    .marquee-text[data-v-1a9bb128] {
        font-size: 13px;
        padding-top: 0px !important;
        margin-top: 0px;
    }
    .header a:not(.btn):hover {
    color: #ffffff;
    text-decoration: none;
}
</style>
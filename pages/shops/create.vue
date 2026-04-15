<template>

  <div>
  


    <div class="formprocess">
              <div class="headprocess"><h>Welcome to Welfog</h><p style="margin-bottom: 1px;color: #8b8b8b;">Create your account to start selling</p></div> 
              <center><div style="border-bottom: solid 1px #8b8b8b;width: 20%;  margin-bottom: 18px;"></div>
              <div class="" style="width: 85%;padding-top: 15px; padding-bottom: 15px;" >
                <div class="row text-center">
                    <div class="col-2"><div class="activeline"><a class="activestep">1</a></div></div>
                    <div class="col-2"><div><a class="inactivestep">2</a></div></div>
                    <div class="col-2"><div><a class="inactivestep">3</a></div></div>
                    <div class="col-2"><div><a class="inactivestep">4</a></div></div>
                    <div class="col-2"><div><a class="inactivestep">5</a></div></div>
                    <div class="col-2"><div><a class="inactivestep">6</a></div></div>
                </div>
            </div>
          </center> 
        </div>
    <div class="container">
       
      
        <div class="form-container">

          <div>
          <a  class="headname nav-link active">Enter Your Phone</a>
        </div>


        <div class="form-group">
          <!-- <label for="name">Enter Your Phone</label> -->
          <input
            type="number"
            class="form-control"
            id="verify_phone"
           
            placeholder="Enter Your Phone (Without Country code)"
          />
        </div>
       
        <button type="submit" @click="VerifyNumber()" class="btn btn-primary">
          <span v-if="isLoading">Please Wait....</span> <span v-else>Verify Number</span> 
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
      IMG_URL: process.env.IMG_URL,
      quantity: 1,
    };
  },

    computed: {
      ...mapState({
        cartItems: state => state.cartItems,
        isLoading: state => state.isLoading,
      }),
    },
    created() {
    //   this.$store.dispatch('VerifyNumber'); 
    },
    methods: {
      ...mapActions(['VerifyNumber']),

     

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

  
  <style>
 
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    /* height: 100vh; */
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
    text-transform: math-auto;
    text-align: center;
    transition: color 0.3s, border-color 0.3s, background-color 0.3s, box-shadow 0.3s;
    white-space: nowrap;
    cursor: pointer;
}
  </style>
  
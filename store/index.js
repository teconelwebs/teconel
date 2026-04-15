// index.js

const getToastPayload = (payload = {}) => {
  if (!payload || typeof payload !== 'object') {
    return {
      result: false,
      type: 'error',
      message: 'Something went wrong. Please try again.',
    };
  }

  const isSuccess =
    payload.result === true ||
    payload.result === 'true' ||
    payload.valid === true ||
    payload.status === 'ACTIVE';

  if (isSuccess) {
    return {
      ...payload,
      type: 'success',
      message: payload.message || 'Bank account verified successfully.',
    };
  }

  return {
    ...payload,
    result: false,
    type: 'error',
    message:
      payload.message ||
      'We could not verify this bank account right now. Please check the account number and IFSC, try a different bank account, or contact support.',
  };
};

export const state = () => ({
  user: false,
  isAuthenticated: true,
  cartQuantity: 0, // Initial cart quantity
  cartItems: [],
  cartSummary: [],
  shipCountry: [],
  shipState: [],
  shipCity: [],
  shipGetAddress: [],
  paymentTypes: [],
  applyCoupon: [],
  removeCoupon:[],
  placeOrder:[],
  searchProduct:[],
  catData:[],
  verifyUser:[],
  isToast: [],
  compareList:[],
  wishlistList:[],
  orderList:[],
  orderDetail:[],
  orderDetailItem:[],
  balanceHistry:[],
  mybalance:[],
  CheckPincode:[],
  reviewList:[],
  relatedPro:[],
  shopProduct:[],
  shopDetails:[],

  //////////////////////////////////here for spplier//////////////////////////////
  gstData:[],
  pincodeData: null,
  pincodeVerifyError: null,
  ifscData:[],
  isLoading: false,
  isLoadingC:false,
  EmailVerify: [],
  OTP_Verify_email:[],
  sellerData: null,
  DashData:[],
  isVerifying:false,
  site_nav_data: null,
});

export const mutations = {
  
  setUser(state, user) {
    state.user = user;
  },
  clearUser(state) {
    state.user = null;
  },
  updateCartQuantity(state, quantity) {
    state.cartQuantity = quantity;
  },
  SET_CART_ITEMS(state, cartItems) {
    state.cartItems = cartItems;
  },

  SET_CART_SUMMARY(state, cartSummary) {
    state.cartSummary = cartSummary;
  },

  SET_SHIP_COUNTRY(state, shipCountry) {
    state.shipCountry = shipCountry;
  },

  SET_SHIP_STATE(state, shipState) {
    state.shipState = shipState;
  },

  SET_SHIP_CITY(state, shipCity) {
    state.shipCity = shipCity;
  },

  SET_SHIP_GET_ADDRESS(state, shipGetAddress) {
    state.shipGetAddress = shipGetAddress;
  },

  SET_PAYMENT_TYPES(state, paymentTypes) {
    state.paymentTypes = paymentTypes;
  },

  SET_APPLY_COUPON(state, applyCoupon) {
    state.applyCoupon = applyCoupon;
  },
  
  SET_REMOVE_COUPON(state, removeCoupon) {
    state.removeCoupon = removeCoupon;
  },

  SET_PLACE_ORDER(state, placeOrder) {
    state.placeOrder = placeOrder;
  },

  SET_SEARCH_PRODUCT(state, searchProduct) {
    state.searchProduct = searchProduct;
  },

  SET_CAT_DATA(state, catData) {
    state.catData = catData;
  },


  USER_VERIFY(state, verifyUser) {
    state.verifyUser = verifyUser;
  },

  USER_IS_LOGGEDIN(state, isAuthenticated) {
    state.isAuthenticated = isAuthenticated;
  },

  TOASTER(state, isToast) {
    state.isToast = isToast;
  },

  COMPARE_LIST(state, compareList) {
    state.compareList = compareList;
  },

  WISHLIST_LIST(state, wishlistList) {
    state.wishlistList = wishlistList;
  },

  ORDER_LIST(state, orderList) {
    state.orderList = orderList;
  },
  ORDER_DETAIL(state, orderDetail) {
    state.orderDetail = orderDetail;
  },

  ORDER_DETAIL_ITEM(state, orderDetailItem) {
    state.orderDetailItem = orderDetailItem;
  },


  BALANCE_HISTRY(state, balanceHistry) {
    state.balanceHistry = balanceHistry;
  },

  BALANCE_AMOUNT(state, mybalance) {
    state.mybalance = mybalance;
  },


  PINCODE_CHECKING(state, CheckPincode) {
    state.CheckPincode = CheckPincode;
  },
  REVIEW_LIST(state, reviewList) {
    state.reviewList = reviewList;
  },

  RELATED_PRO(state, relatedPro) {
    state.relatedPro = relatedPro;
  },


  SHOP_DETAILS(state, shopDetails) {
    state.shopDetails = shopDetails;
  },
  

  SHOP_PRODUCT(state, shopProduct) {
    state.shopProduct = shopProduct;
  },


    //////////////////////////////////here for spplier//////////////////////////////

  
    
  GST_DETAILS(state, gstData) {
    state.gstData = gstData;
  },
  PINCODE_DETAILS(state, pincodeData) {
    state.pincodeData = pincodeData;
  },
  SET_PINCODE_VERIFY_ERROR(state, message) {
    state.pincodeVerifyError = message;
  },
  IFSC_DETAILS(state, ifscData) {
    state.ifscData = ifscData;
  },

  IS_LOAD(state, isLoading) {
    state.isLoading = isLoading;
  },

  IS_LOAD_C(state, isLoadingC) {
    state.isLoadingC = isLoadingC;
  },


  

  isVerifying(state, isVerifying) {
    state.isVerifying = isVerifying;
  },
  
  EMAILVERIFY(state, EmailVerify) {
    state.EmailVerify = EmailVerify;
  },

  OTP_VERIFY_EMAIL(state, OTP_Verify_email) {
    state.OTP_Verify_email = OTP_Verify_email;
  },

  SET_API_DATA(state, data) {
    state.apiData = data;
  },

  SET_SELLER_DATA(state, data) {
    state.sellerData = data;
  },

  DASH_BOARD(state, data) {
    state.DashData = data;
  },

  site_nav_data(state, site_nav_data) {
    state.site_nav_data = site_nav_data;
  },
  
  
  
};

export const actions = {
 


  ////////////////////////////////////////////////////fecth dashboard data///////////

async site_nav_data({ commit , dispatch}) {
 
  try {
    console.log('Fetching site nav data from:', `${process.env.APP_URL}/api/welfog_supplier/site_nav_data`);
    
    // Add timeout to prevent long delays
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
    
    const site_nav_data_Response = await this.$axios.get(`${process.env.APP_URL}/api/welfog_supplier/site_nav_data`, {
      signal: controller.signal,
      timeout: 5000
    });
    
    clearTimeout(timeoutId);
    console.log('site_nav_data_Response ', site_nav_data_Response.data);

     commit('site_nav_data', site_nav_data_Response.data);
  } catch (error) {
    console.error('Error fetching site nav data:', error);
    // Set a fallback data structure immediately
    const fallbackData = {
      type: "welcome",
      message: "Welcome to Welfog! - Your trusted partner for online selling",
      header_logo: null
    };
    commit('site_nav_data', fallbackData);
    // Don't throw error to prevent blocking UI
  }
},

/////////////////////////end fathing dashboard data///////////////////////

  ////////////updating  location/////////////

  async update_location({ commit , dispatch}) {
    let user_id = localStorage.getItem('shop_user_id'); 
    let location_id = localStorage.getItem('system_location_id');
    let created_location_id = localStorage.getItem('location_id');

  try {
    const response = await this.$axios.post(`${process.env.APP_URL}/api/welfog_supplier/update_location`, {
      user_id: user_id,
      location_id: location_id,
      created_location_id: created_location_id
   });

      

      console.log('Response data:', response.data);
  } catch (error) {
      console.error('Error submitting step:', error.message || error);
      throw error; 
  }



  },
  ///////////updating location///////////////
  
////////////////////////////////////////////////////fecth dashboard data///////////

async dashBoardData({ commit , dispatch}) {
 
  const user_my_id = localStorage.getItem('shop_user_id'); 
  try {
    const DashResponse = await this.$axios.get(`${process.env.APP_URL}/api/welfog_supplier/dashboard_details/${user_my_id}`, {
    });
    console.log('DashResponse DashResponse', DashResponse.data);
    commit('DASH_BOARD', DashResponse.data);
  } catch (error) {
    console.error('Error compareList of cart:', error);
    throw error; 
  }
},

/////////////////////////end fathing dashboard data///////////////////////

////////////////////////////////////////////////

async upDateStep5({ commit , dispatch}) {
  const updateStep = await dispatch('AddStep', {
    step: 5,
  });
},
 

////////////////////////////////////////

////////////////////////////////////////////////

async AddStep({ commit }, { step }) {
  const seller_id = localStorage.getItem('shop_user_id');

  try {
      const response = await this.$axios.post(`${process.env.APP_URL}/api/welfog_supplier/step`, {
          seller_id: seller_id,
          step: step,
      });

      console.log('Response data:', response.data);
  } catch (error) {
      console.error('Error submitting step:', error.message || error);
      throw error; 
  }
},

  async testStep({ dispatch }) {
    try {
      const updateStep = await dispatch('AddStep', {
        step: 1,
      });
      return updateStep;  // Return the result if needed
    } catch (error) {
      console.error('Error testing step:', error.message || error);
    }
  },
 

////////////////////////////////////////

    //////////////////////////////////verifying the mail id//////////////////////////////

async verifyMail({ commit, dispatch }) {

  commit('IS_LOAD_C', true);

  const req_email = document.getElementById('user_email').value  || '';
  

  if(req_email == ''){
      alert('Please enter Email Id');
      commit('IS_LOAD_C', false);
  } else{

    try {
        const response = await this.$axios.post(`${process.env.APP_URL}/api/welfog_supplier/verifyEmail`, {
         email: req_email,
        }
    );



    const emailReponse = response.data;

    console.log('emailReponse emailReponse emailReponse' , emailReponse);
     commit('TOASTER', emailReponse);
     commit('EMAILVERIFY', emailReponse);
     commit('IS_LOAD_C', false);

     return emailReponse;




    //  if (gstsubReponse.result == 'true') {
    //     this.$router.push({ path: '/shops/step3'});
    //   } 


    } catch (error) {
      alert('Try Again !')
    }


  }    
  
},

    //////////////////////////////////verifying the mail id//////////////////////////////


 //////////////////////////////////verifyMailOtp the mail id//////////////////////////////
 async verifyMailOtp({ commit, dispatch }) {
  // commit('IS_LOAD_C', true);
  const req_email_otp = document.getElementById('user_email_otp').value  || '';
  const user_email = document.getElementById('user_email').value  || '';

  if(user_email == ''){
    alert('Please enter Email');
    // commit('IS_LOAD_C', false);
  } else if(req_email_otp == ''){
      alert('Please enter OTP');
      // commit('IS_LOAD_C', false);
  } else{
    try {
      const response = await this.$axios.post(`${process.env.APP_URL}/api/welfog_supplier/verifyEmailOTP`, {
         email_otp: req_email_otp,
         email : user_email,
        }
    );
    const emailOTPReponse = response.data;
     commit('TOASTER', emailOTPReponse);
     commit('OTP_VERIFY_EMAIL', emailOTPReponse);

     console.log('email verify success by funtion index.js');

     return emailOTPReponse;
    // commit('IS_LOAD_C', false);

    //  if (gstsubReponse.result == 'true') {
    //     this.$router.push({ path: '/shops/step3'});
    //   } 
    } catch (error) {
      alert('Try Again !')
    }
  }    
},
//////////////////////////////////verifyMailOtp the mail id//////////////////////////////

    


    //////////////////////////////////here for spplier//////////////////////////////

    


    async log_in_me({ commit , dispatch}, { token, token_email}) {
      commit('IS_LOAD', true);
     
      const user_my_id = localStorage.getItem('shop_user_id'); 
      const shop_seller_id = localStorage.getItem('shop_seller_id');

      try {
      
        const loginResponse = await this.$axios.post(`${process.env.APP_URL}/api/welfog_supplier/loginme`, {
          token: token,
          token_email: token_email,
          user_id: user_my_id,
          shop_seller_id : shop_seller_id,
        });
  
        commit('TOASTER', loginResponse.data);
        commit('IS_LOAD', false);
      

        localStorage.setItem('loginData', JSON.stringify(loginResponse.data.user_data)); 

    
        console.log('loginResponse.data', loginResponse.data.user_data);
       
         
        
        if (loginResponse.data.result == true) {
            window.location.replace(loginResponse.data.url);
        }
      

  
      } catch (error) {
        console.error('Error compareList of cart:', error);
        throw error; 
      }
    },



    
  async success_shop({ commit , dispatch}) {
    commit('IS_LOAD', true);

    try {
      const accessToken = localStorage.getItem('shop_user_id');
      const shopResponse = await this.$axios.get(`${process.env.APP_URL}/api/welfog_supplier/success_shop`, {
        params: {
          user_id: accessToken,
        }
      });

      console.log('shop created data ', shopResponse );
      commit('IS_LOAD', false);

      await dispatch('AddStep', {
        step: 5,
      });

      return shopResponse;

      // commit('SHOP_DETAILS', shopResponse);

    } catch (error) {
      alert('try again !');
    }
  },



    // async Submit_Bank({ commit }, bankData) {
    //   commit('IS_LOAD', true);
    //   const { ifsc_code, account_holder_name, account_number, confirm_account_number, bank_name, branch_address, cancel_check_photo } = bankData;

    // const shop_user_id = localStorage.getItem('shop_user_id');

    // alert(ifsc_code);

    // // Validate required fields
    // if (!ifsc_code || !account_holder_name || !account_number) {
    //   alert('All fields are required!');
    //   commit('IS_LOAD', false);
    //   return;
    // } else{


    //   try {
    //     // Make POST request to API
    //     const response = await this.$axios.post(`${process.env.APP_URL}/api/welfog_supplier/submitBank`, {
    //       user_id: shop_user_id,
    //       ifsc_code: ifsc_code,
    //       bank_acc_name: account_holder_name,
    //       bank_acc_no: account_number,
    //       first_address: confirm_account_number,
    //       bank_name: bank_name,
    //       bank_address: branch_address,
    //       cancel_check_photo : cancel_check_photo,
    //     });
  
    //     const banksubResponse = response.data;
  
  
    //     console.log('banksubResponse  banksubResponse banksubResponse', banksubResponse);


    //     //  commit('TOASTER', banksubResponse);
    //     //  commit('IS_LOAD', false);
  
    //     // if (banksubResponse.result) {
    //     //   this.$router.push({ path: '/shops/step5' })
    //     //     .catch(err => {
    //     //       if (err.name !== 'NavigationDuplicated') {
    //     //         console.warn('Navigation error:', err);
    //     //       }
    //     //     });
    //     // }
    //     // }
    //   } catch (error) {
    //     alert('try again !');
    //   }



    // }

    
    // } , 


    async Submit_Bank({ commit, dispatch }, bankData) {
      commit('IS_LOAD', true);
  
      const shop_user_id = localStorage.getItem('shop_user_id');
  
      // Validate required fields by checking the form data entries
      if (!bankData.get('ifsc_code') || !bankData.get('account_holder_name') || !bankData.get('account_number')) {
          alert('All fields are required!');
          commit('IS_LOAD', false);
          return;
      } else {
          try {
              // Append the user ID to the FormData
              bankData.append('user_id', shop_user_id);
  
              // Make POST request to API with FormData
              const response = await this.$axios.post(`${process.env.APP_URL}/api/welfog_supplier/submitBank`, bankData, {
                  headers: {
                      'Content-Type': 'multipart/form-data'
                  }
              });
  
              const banksubResponse = response.data;
  
           ////   console.log('banksubResponse', banksubResponse);
  
              commit('TOASTER', banksubResponse);
              commit('IS_LOAD', false);
  
              if (banksubResponse.result) {

                await dispatch('AddStep', {
                  step: 4,
                });

                this.$router.push({ path: '/shops/step5' })
                  .catch(err => {
                    if (err.name !== 'NavigationDuplicated') {
                      console.warn('Navigation error:', err);
                    }
                  });
              }
          } catch (error) {
              alert('try again!');
          } finally {
              commit('IS_LOAD', false);
          }
      }
  },
  




    async IFSC_code({ commit }, accountData) {
      commit('IS_LOAD_C', true);
      commit('IFSC_DETAILS', []);

      const url = 'https://api.attestr.com/api/v1/public/finanx/acc';
      const { accountNumber, ifscCode } = accountData;
      const data = {
        acc: accountNumber,
        ifsc: ifscCode,
        fetchIfsc: true,
      };
      const authToken = 'T1gwc2Q2ZFlRNE1SR1V6TDF6LjMzN2YxYTY4ZjcyYzNiYmIwYjRmZWU5YWVmMDIyYmNjOmRmMDdmNDI3NThiMjQyZTQ4ZmZiYTE3NzFiODA5NDkxZjE1ZWQ5YjFjODEwODhjNg==';

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${authToken}`,
          },
          body: JSON.stringify(data),
        });

        const responseData = await response.json().catch(() => ({}));

        if (!response.ok) {
          const errorToast = getToastPayload({
            ...responseData,
            message:
              'We could not verify this bank account right now. Please check the account number and IFSC, try a different bank account, or contact support.',
          });
          commit('TOASTER', errorToast);
          return errorToast;
        }

        if (responseData.valid === true && responseData.status === 'ACTIVE') {
          commit('IFSC_DETAILS', responseData);
          const successToast = getToastPayload({
            ...responseData,
            message: 'Bank account verified successfully.',
          });
          commit('TOASTER', successToast);
          return responseData;
        }

        commit('IFSC_DETAILS', []);
        const invalidToast = getToastPayload({
          ...responseData,
          message:
            'This bank account could not be verified. Please use a different bank account or contact support if the issue continues.',
        });
        commit('TOASTER', invalidToast);
        return invalidToast;
      } catch (error) {
        console.error('IFSC verification failed:', error);
        commit('IFSC_DETAILS', []);
        const errorToast = getToastPayload({
          message:
            'Unable to verify bank details right now. Please check your internet connection and try again in a moment.',
        });
        commit('TOASTER', errorToast);
        return errorToast;
      } finally {
        commit('IS_LOAD_C', false);
      }

      // const ifsc_code = document.getElementById('ifsc_code').value;
      // if(ifsc_code == ''){
      //   alert('Please enter your ifsc code');
      //   commit('IS_LOAD_C', false);
      // }else{
      //   try {
      //   const response = await this.$axios.get(`https://ifsc.razorpay.com/${ifsc_code}`);
      //   const ifscReponse = response;
      //   console.log(ifscReponse);
      //    commit('IFSC_DETAILS', ifscReponse);
      //    commit('IS_LOAD_C', false);
      //   } catch (error) {  
      //     const response = {
      //       result: false,
      //       message: 'Wrong IFSC Code!'
      //     };
      //     commit('TOASTER', response);
      //     commit('IS_LOAD_C', false);

      //   }
      // }
    },




    
    async Submit_Address({ commit, dispatch }, addressData) {
      commit('IS_LOAD', true);
      const { pincode_number, first_address, secondary_address, shop_city, shop_state, shop_country } = addressData;

    const shop_user_id = localStorage.getItem('shop_user_id');

    // Validate required fields
    if (!pincode_number || !first_address || !secondary_address) {
      alert('All fields are required!');
      commit('IS_LOAD', false);
      return;
    }


    try {
      // Make POST request to API
      const response = await this.$axios.post(`${process.env.APP_URL}/api/welfog_supplier/submitAddress`, {
        user_id: shop_user_id,
        city: shop_city,
        state: shop_state,
        country: shop_country,
        first_address: first_address,
        secondary_address: secondary_address,
        pincode: pincode_number,
      });

      const subaddressResponse = response.data;
      commit('TOASTER', subaddressResponse);
      commit('IS_LOAD', false);

      ///console.log('Map APi Data ', subaddressResponse);
      
        
        if (subaddressResponse.result) {
          await dispatch('AddStep', { step: 3, });
          this.$router.push({ path: '/shops/step4' })
            .catch(err => {
              if (err.name !== 'NavigationDuplicated') {
                console.warn('Navigation error:', err);
              }
            });
        }
    } catch (error) {
      console.error('Error submitting address:', error);
      throw error; // Re-throw error for further handling
    }
    } ,    


    // async Verify_Pincode({ commit }) {
    //   commit('IS_LOAD_C', true);
    //   const pincode_number = document.getElementById('pincode_number').value;
    //    if(pincode_number == ''){
    //     alert('Please enter your Pincode number');
    //     commit('IS_LOAD_C', false);
    //   }else{
        
    //     this.$axios.get(`https://api.postalpincode.in/pincode/${pincode_number}`)
    //     .then(response => {
    //       const pinReponse = response.data;
    //       const tosts = {
    //             result: pinReponse[0].Status,
    //             message: pinReponse[0].Message
    //       };
    //       commit('TOASTER', tosts);
    //       commit('IS_LOAD_C', false);
    //       if(pinReponse[0].Status == 'Success'){
    //         commit('PINCODE_DETAILS', pinReponse);
    //       }
    //     })
    //     .catch(error => {
    //       alert('Somthing Wrong ! Try again');
    //     });
 
    //   }
    // },


    async Verify_Pincode({ commit }, pincode_input) {
      commit('IS_LOAD_C', true);
      commit('SET_PINCODE_VERIFY_ERROR', null);
      commit('PINCODE_DETAILS', null);

      const pincode_number = pincode_input ? String(pincode_input).trim() : '';

      if (!pincode_number) {
        commit('SET_PINCODE_VERIFY_ERROR', 'Please enter your pincode.');
        commit('IS_LOAD_C', false);
        return;
      }

      try {
        const response = await this.$axios.get(
          `${process.env.APP_URL}/api/welfog_supplier/get-pincode?pincode=${encodeURIComponent(pincode_number)}`
        );
        const apiResponse = response.data;

        const ok =
          apiResponse.result === true ||
          apiResponse.result === 'true';

        if (ok && apiResponse.data) {
          const d = apiResponse.data;
          commit('PINCODE_DETAILS', {
            pincode: d.pincode,
            city: d.city,
            state: d.state,
            country: d.country || 'India',
            status: d.status,
          });
          commit('TOASTER', {
            result: true,
            message: apiResponse.message || 'OK',
          });
        } else {
          commit('PINCODE_DETAILS', null);
          let errMsg =
            apiResponse.message ||
            'This pincode could not be verified. Please try again.';
          if (
            apiResponse.code === 'PINCODE_SERVICE_UNAVAILABLE' &&
            apiResponse.details
          ) {
            errMsg = `${errMsg} ${apiResponse.details}`.trim();
          }
          commit('SET_PINCODE_VERIFY_ERROR', errMsg);
          commit('TOASTER', {
            result: false,
            message: errMsg,
          });
        }
      } catch (error) {
        console.error(error);
        const errMsg = 'Something went wrong. Please try again.';
        commit('SET_PINCODE_VERIFY_ERROR', errMsg);
        commit('TOASTER', { result: false, message: errMsg });
      } finally {
        commit('IS_LOAD_C', false);
      }
    },

    resetPincodeVerification({ commit }) {
      commit('PINCODE_DETAILS', null);
      commit('SET_PINCODE_VERIFY_ERROR', null);
    },
    


      async Submit_GST({ commit, dispatch }) {



        commit('IS_LOAD', true);
      const gst_nom = document.getElementById('gst_number').value  || '';
      const gst_address = document.getElementById('firm_address').value  || '';
      const gst_type = document.getElementById('firm_type').value  || '';
      const gst_name = document.getElementById('firm_name').value  || '';
      const shop_user_idss = localStorage.getItem('shop_user_id');
      if(gst_nom == ''){
        alert('Please enter GSTIN Number');
        commit('IS_LOAD', false);
      } else{


        try {
          const response = await this.$axios.post(`${process.env.APP_URL}/api/welfog_supplier/submitGst`, {
            gst_number: gst_nom,
            firm_address: gst_address,
            firm_type: gst_type,
            firm: gst_name,
            shop_user_id: shop_user_idss,
            }
        );
  
        const gstsubReponse = response.data;
        commit('TOASTER', gstsubReponse);
        commit('IS_LOAD', false);


 
         if (gstsubReponse.result == 'true') {

          await dispatch('AddStep', {
            step: 2,
          });
          
          // Use router.push with catch to handle NavigationDuplicated errors
          this.$router.push({ path: '/shops/step3' })
            .catch(err => {
              if (err.name !== 'NavigationDuplicated') {
                console.warn('Navigation error:', err);
              }
            });
          } 
        } catch (error) {
          alert('Try Again !')
        }




      }
      
    },
    

    async Verify_GST({ commit, dispatch }) {
      commit('IS_LOAD_C', true);
      const gst_number = document.getElementById('gst_number').value;
      const shop_user_id = localStorage.getItem('shop_user_id');
      if(gst_number == ''){
        alert('Please enter your GST number');
        commit('IS_LOAD_C', false);
      }else{
        try {
          const response = await this.$axios.post(`${process.env.APP_URL}/api/welfog_supplier/gstVerify`, {
            gstin: gst_number,
            shop_user_id: shop_user_id,
            }
        );
        const gstReponse = response.data;
        commit('TOASTER', gstReponse);
        commit('IS_LOAD_C', false);

       
        if(gstReponse.result == 'true'){
          let alldata =  gstReponse.data;
          commit('GST_DETAILS', alldata);
        }
        // let alldata =  gstReponse.data;
        // commit('GST_DETAILS', alldata);

        } catch (error) {

          alert('Please try again !');
          commit('IS_LOAD_C', false);
          

        }
      }
    },


    async CreateAccount({ commit, dispatch }) {
      commit('IS_LOAD', true);
      // Get form values
      const phone = document.getElementById('phone').value;
      const userName = document.getElementById('user_name').value;
      const userEmail = document.getElementById('user_email').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirm_password').value;
      // Validation


      let strCon = password.toString();  // Convert the value to a string
      let countPass = strCon.length; 

      if (countPass < 6) {
          const error = {
              result: false, // or true, depending on the situation
              message: "Your password must be at least 6 characters long" // Replace with the actual error message
          };
          commit('TOASTER', error);
          commit('IS_LOAD', false);
          return;
      } 

      if (!phone || !userName || !userEmail || !password || !confirmPassword) {
          alert('All fields are required.');
          commit('IS_LOAD', false);
          return;
      }
  
      if (password !== confirmPassword) {
          alert('Passwords do not match.');
          commit('IS_LOAD', false);
          return;
      }
        try {
          const response = await this.$axios.post(`${process.env.APP_URL}/api/welfog_supplier/createaccount`, {
            name: userName,
            email: userEmail,
            phone: phone,
            password: password,
            password_confirmation: confirmPassword,
            }
        );





        const userReponse = response.data;
      

        localStorage.setItem('shop_user_id', userReponse.user_id);
        localStorage.setItem('shop_seller_id', userReponse.seller_id);
        localStorage.setItem('shop_loggin', true);

        
        commit('TOASTER', userReponse);
        commit('IS_LOAD', false);

        const updateStep = await dispatch('AddStep', {
          step: 1,
        });

        

        if (userReponse.result == 'true') {
          this.$router.push({ path: '/shops/step2', phone: { verify_number: '' } })
            .catch(err => {
              if (err.name !== 'NavigationDuplicated') {
                console.warn('Navigation error:', err);
              }
            });
        }

        // commit('PINCODE_CHECKING', pincodeResult);
      
        } catch (error) {
          console.error('Error adding product to cart:', error);
          throw error;
        }
  },



  async VerifyOTP({ commit, dispatch }) {
    commit('IS_LOAD', true);
    commit('isVerifying', true);
    const  verify_otp = document.getElementById("verify_otp").value;
    const verifyPhone = localStorage.getItem('phone');


    try {
      const response = await this.$axios.post(`${process.env.APP_URL}/api/welfog_supplier/checkVerifyOtp`, {
        phone: verifyPhone,
        otp: verify_otp,
      });
      const OTPDetail = response.data; 



     /// console.log('OTPDetail OTPDetail' , OTPDetail);

      // if(OTPDetail.user_id != 0 && OTPDetail.seller_id != 0){
          localStorage.setItem('shop_user_id', OTPDetail.user_id);
          localStorage.setItem('shop_seller_id', OTPDetail.seller_id);
          localStorage.setItem('shop_loggin', true);
          
      // }

     
      
  
      commit('TOASTER', OTPDetail);
      commit('IS_LOAD', false);

      commit('isVerifying', false);


      if(OTPDetail.result == 'true'){
        localStorage.setItem('posme', false);
        this.$router.push({ path: '/shops/step1', phone: { verify_number: '' } })
            .catch(err => {
              if (err.name !== 'NavigationDuplicated') {
                console.warn('Navigation error:', err);
              }
            });
      }

  
    } catch (error) {
      console.error('Error:', error);
      throw error; 
    }
    



  

   
  },
  



    async VerifyNumber({ commit, dispatch }) {

      commit('IS_LOAD', true);
      const verify_number = document.getElementById("verify_phone").value;
      try {
        const response = await this.$axios.get(`${process.env.APP_URL}/api/welfog_supplier/verifynumber`, {
          params: {
            phone: verify_number,
          }
        });
        const shopDetail = response.data; 
        
    
        commit('TOASTER', shopDetail);
        commit('IS_LOAD', false);


        const currentTime = Date.now();
        localStorage.setItem('phone', verify_number);
        localStorage.setItem('otpTimestamp', currentTime);
        localStorage.setItem('posme', true);

        if (shopDetail.return == true) {
          this.$router.push({ path: '/shops/verify_number', phone: { verify_number: '' } })
            .catch(err => {
              if (err.name !== 'NavigationDuplicated') {
                console.warn('Navigation error:', err);
              }
            });
    
        }
    
      } catch (error) {
        console.error('Error:', error);
        throw error; 
      }
    },

    async VerifyNumberWithPhone({ commit }, { phone }) {
      commit('IS_LOAD', true);
      try {
        const response = await this.$axios.get(`${process.env.APP_URL}/api/welfog_supplier/verifynumber`, {
          params: {
            phone: phone,
          }
        });
        const shopDetail = response.data;
        commit('TOASTER', shopDetail);
        commit('IS_LOAD', false);
        const currentTime = Date.now();
        localStorage.setItem('phone', phone);
        localStorage.setItem('otpTimestamp', currentTime);
        localStorage.setItem('posme', true);
        // Do not redirect here, just resend OTP
        return shopDetail;
      } catch (error) {
        console.error('Error:', error);
        throw error;
      }
    },


    
















































  setUser({ commit }, user) {
    commit('setUser', user);
  },

  clearUser({ commit }) {
    commit('clearUser');
  },
  setCartQuantity({ commit }, quantity) {
    commit('updateCartQuantity', quantity);
  },


  

   ////////////////////////////////////  relatedProduct///////////////////////////

  async relatedProduct({ commit , dispatch}, { pro_related_id}) {
    
    try {
      const userId = localStorage.getItem('user_id');
      const accessToken = localStorage.getItem('access_token');
      const response = await this.$axios.get(`http://localhost/Welfog/api/welfog_supplier/products/related/${pro_related_id}`, {
        params: {
          id: pro_related_id,
         
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const relatedProduct = response.data.data; 
  
      // await dispatch('wishlistList');
      commit('RELATED_PRO', relatedProduct);
  
      await dispatch('OrderItem', { orderIdItems: order_details.id });
  
  
    } catch (error) {
      console.error('Error compareList of cart:', error);
      throw error; 
    }

  },
 ////////////////////////////////////  relatedProduct///////////////////////////

   ////////////////////////////////////  submit review ///////////////////////////

  async submitReview({ commit , dispatch}, { reviewData}) {

    try {
   
      const userId = localStorage.getItem('user_id');
      const accessToken = localStorage.getItem('access_token');
      const response = await this.$axios.post('http://localhost/Welfog/api/welfog_supplier/reviews/submit', {
          user_id: userId,
          reviewData: reviewData,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
    );
    const reviewResponse = response.data;
  
    console.log('reviewResponse reviewResponse  reviewResponse', reviewResponse);
       commit('TOASTER', reviewResponse);
       await dispatch('reviewList');
       
  
    } catch (error) {
      console.error('Error adding product to cart:', error);
      throw error;
    }


  },
 ////////////////////////////////////  checkProductPincode///////////////////////////
 async checkProductPincode({ commit , dispatch}, { pincode}) {
  try {
   
    const userId = localStorage.getItem('user_id');
    const accessToken = localStorage.getItem('access_token');
    const response = await this.$axios.post('http://localhost/Welfog/api/welfog_supplier/pincode/check', {
        user_id: userId,
        pincode: pincode,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
  );
  const pincodeResult = response.data;

  console.log('pincode pincode pincode pincodepincode pincode', pincodeResult);
   commit('TOASTER', pincodeResult);
   commit('PINCODE_CHECKING', pincodeResult);

  } catch (error) {
    console.error('Error adding product to cart:', error);
    throw error;
  }
},
//////////////////////////////////// checkProductPincode///////////////////////////


  ////////////////////////////////////  UPDATE_PROFILE///////////////////////////
 async updateProfile({ commit , dispatch}, { user_name, user_phone, user_email, user_pass, user_cpass }) {
  try {
    const uname = user_name;
    const uphone = user_phone;
    const uemail = user_email;
    const upass = user_pass;
    const userId = localStorage.getItem('user_id');
    const accessToken = localStorage.getItem('access_token');
    const response = await this.$axios.post('http://localhost/Welfog/api/welfog_supplier/profile/update', {
        id: userId,
        name: uname,
        password: upass,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
  );
  const profileresult = response.data;
  commit('TOASTER', profileresult);
  } catch (error) {
    console.error('Error adding product to cart:', error);
    throw error;
  }
},
//////////////////////////////////// UPDATE_PROFILE///////////////////////////

 //////////////////////////////////// orderDetail ///////////////////////////
 async orderDetail({ commit , dispatch}, orderId) {


  console.log('orderDetail  orderDetail orderDetail orderDetail orderList', orderId);

  try {
    const userId = localStorage.getItem('user_id');
    const order_Id = orderId;
    const accessToken = localStorage.getItem('access_token');
    const response = await this.$axios.get(`http://localhost/Welfog/api/welfog_supplier/purchase-history-details/${order_Id}`, {
      params: {
        user_id: userId,
       
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const order_details = response.data.data[0]; 

    console.log('order data order data order data ', order_details.id);
    // await dispatch('wishlistList');
    commit('ORDER_DETAIL', order_details);

    await dispatch('OrderItem', { orderIdItems: order_details.id });


  } catch (error) {
    console.error('Error compareList of cart:', error);
    throw error; 
  }
},
//////////////////////////////////// orderDetail ///////////////////////////

  //////////////////////////////////// OrderItem ///////////////////////////
 async OrderItem({ commit , dispatch}, {orderIdItems}) {

  try {
    const userId = localStorage.getItem('user_id');
    const order_Id_item = orderIdItems;
    const accessToken = localStorage.getItem('access_token');
    const response = await this.$axios.get(`http://localhost/Welfog/api/welfog_supplier/purchase-history-items/${order_Id_item}`, {
      params: {
        user_id: userId,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const order_item = response.data.data[0]; 

    commit('ORDER_DETAIL_ITEM', order_item);
  } catch (error) {
    console.error('Error compareList of cart:', error);
    throw error; 
  }
},
//////////////////////////////////// OrderItem ///////////////////////////



//////////////////////////////////// review list ///////////////////////////
async reviewList({ commit , dispatch}) {

  try {
    const userId = localStorage.getItem('user_id');
    const accessToken = localStorage.getItem('access_token');
    const response = await this.$axios.get(`http://localhost/Welfog/api/welfog_supplier/reviews/user/${userId}`, {
      params: {
        user_id: userId,
       
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const review_list = response.data; 

    console.log('review_list data review_list review_list review_list review_list ', review_list);
    // await dispatch('wishlistList');
      commit('REVIEW_LIST', review_list);


  } catch (error) {
    console.error('Error compareList of cart:', error);
    throw error; 
  }
},
////////////////////////////////////  review list ///////////////////////////


  //////////////////////////////////// orderList ///////////////////////////
async orderList({ commit , dispatch}) {

  try {
    const userId = localStorage.getItem('user_id');
    const accessToken = localStorage.getItem('access_token');
    const response = await this.$axios.get(`http://localhost/Welfog/api/welfog_supplier/purchase-history/${userId}`, {
      params: {
        user_id: userId,
       
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const order_list = response.data.data; 

    console.log('order data order data order data ', order_list);
    // await dispatch('wishlistList');
    commit('ORDER_LIST', order_list);


  } catch (error) {
    console.error('Error compareList of cart:', error);
    throw error; 
  }
},
//////////////////////////////////// orderList ///////////////////////////

//////////////////////////////////// RemoveWishlist ///////////////////////////
async removeWishlist({ commit , dispatch}, {removeWishlistId, productId}) {
  try {
    const userId = localStorage.getItem('user_id');
    const CompId = removeWishlistId;
    const accessToken = localStorage.getItem('access_token');
    const response = await this.$axios.get(`http://localhost/Welfog/api/welfog_supplier/wishlists-remove-product`, {
      params: {
        product_id: productId,
        user_id: userId,
        compare_id: CompId,
      },
    });
    const removeResponse = response.data; 
    await dispatch('wishlistList');
    commit('TOASTER', removeResponse);
  } catch (error) {
    console.error('Error compareList of cart:', error);
    throw error; 
  }
},
//////////////////////////////////// RemoveWishlist ///////////////////////////


//////////////////////////////////// wishlistList ///////////////////////////
  async wishlistList({ commit , dispatch}) {
              
      try {
        const userId = localStorage.getItem('user_id');
        const accessToken = localStorage.getItem('access_token');
        const response = await this.$axios.get(`http://localhost/Welfog/api/welfog_supplier/wishlists/${userId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const wishlistsDetail = response.data.data; 

        commit('WISHLIST_LIST', wishlistsDetail);

          // commit('SET_SHIP_CITY', shipCity);
      } catch (error) {
        console.error('Error wishlistsDetail of cart:', error);
        throw error; 
      }
    

  },
//////////////////////////////////// wishlistList ///////////////////////////


  
//////////////////////////////////// RemoveCompare ///////////////////////////
async RemoveCompare({ commit , dispatch}, {removeCompareId, productId}) {
  try {
    const userId = localStorage.getItem('user_id');
    const CompId = removeCompareId;
    const accessToken = localStorage.getItem('access_token');
    const response = await this.$axios.get(`http://localhost/Welfog/api/welfog_supplier/compare-remove-product`, {
      params: {
        product_id: productId,
        user_id: userId,
        compare_id: CompId,
      },
    });
    const removeResponse = response.data; 
    await dispatch('compareList');
    commit('TOASTER', removeResponse);
  } catch (error) {
    console.error('Error compareList of cart:', error);
    throw error; 
  }
},
//////////////////////////////////// RemoveCompare ///////////////////////////


//////////////////////////////////// compareList ///////////////////////////
  async compareList({ commit , dispatch}) {
              
      try {
        const userId = localStorage.getItem('user_id');
        const accessToken = localStorage.getItem('access_token');
        const response = await this.$axios.get(`http://localhost/Welfog/api/welfog_supplier/compare/${userId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const compareDetail = response.data.data; 

        commit('COMPARE_LIST', compareDetail);


          // commit('SET_SHIP_CITY', shipCity);
      } catch (error) {
        console.error('Error compareList of cart:', error);
        throw error; 
      }
    

  },
//////////////////////////////////// compareList ///////////////////////////

//////////////////////////////////// toaster ///////////////////////////

  async toaster({ commit , dispatch}, { data }) {
    try {

     console.log('toaster massage willl be', data);

      
      commit('TOASTER', data);
      
     
    } catch (error) {
      console.error('Error searching product:', error);
      throw error;
    }
  },

  //////////////////////////////////// toaster ///////////////////////////
  

//////////////////////////////////// wishlists-add-product ///////////////////////////

async addToWishList({ commit , dispatch},{ product_id }) {
  try {
    const accessToken = localStorage.getItem('access_token');
    const mpid = product_id;
    const myuid = localStorage.getItem('user_id');
    const response = await this.$axios.get('http://localhost/Welfog/api/welfog_supplier/wishlists-add-product', {
      params: {
        product_id: mpid,
        user_id: myuid
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const DataWishList = response.data; 
    
    console.log('DataCompare DataCompare:', DataWishList);

    await dispatch('toaster', { data: DataWishList });

  } catch (error) {
    console.error('Error searching product:', error);
    throw error;
  }
},
//////////////////////////////////// wishlists-add-product ///////////////////////////

//////////////////////////////////// addToCompare ///////////////////////////

  async addToCompare({ commit , dispatch},{ product_id }) {
        try {
          const accessToken = localStorage.getItem('access_token');
          const mpid = product_id;
          const myuid = localStorage.getItem('user_id');
          const response = await this.$axios.get('http://localhost/Welfog/api/welfog_supplier/compare-add-product', {
            params: {
              product_id: mpid,
              user_id: myuid
            },
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
      
          const DataCompare = response.data; 
          
          console.log('DataCompare DataCompare:', DataCompare);

          await dispatch('toaster', { data: DataCompare });
      
          // Process your response data as needed
          // commit('SET_SEARCH_PRODUCT', searchData);
      
        } catch (error) {
          console.error('Error searching product:', error);
          throw error;
        }
  },
  //////////////////////////////////// addToCompare ///////////////////////////

//////////////////////////////////// logout ///////////////////////////
async logout({ commit , dispatch}) {
    try {
      const accessToken = localStorage.getItem('access_token');
      const response = await this.$axios.get(`http://localhost/Welfog/api/welfog_supplier/auth/logout`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const logOutStatus = response; 
      commit('updateCartQuantity', 0);
      await dispatch('verifyUser');
    } catch (error) {
      console.error('Error getting summary of cart:', error);
      throw error; 
    }
},
//////////////////////////////////// logout///////////////////////////


  ////////////////////////////////////  user validation///////////////////////////
 async verifyUser({ commit , dispatch}) {

  try {
    const userId = localStorage.getItem('user_id');
    const accessToken = localStorage.getItem('access_token');
    const response = await this.$axios.post('http://localhost/Welfog/api/welfog_supplier/get-user-by-access_token', {
        access_token: accessToken,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
  );

   const userData = response.data;
   commit('USER_VERIFY', userData);
   commit('USER_IS_LOGGEDIN', response.data.result);
   localStorage.setItem('isLoggedIn', response.data.result);

   await dispatch('checkCart');
   await dispatch('cartSummary');
   

  // if (oresult.result == true) { 
  //   await dispatch('checkCart');
  //   this.$router.push({ 
  //     name: 'order_success', 
  //     query: { combined_order_id: oresult.combined_order_id } 
  //   });
  // }
  

  //  await dispatch('cartSummary');
  } catch (error) {
    console.error('Error adding product to cart:', error);
    throw error;
  }

},
////////////////////////////////////  user validation///////////////////////////

  ////////////////////////////////////  catData catData catData///////////////////////////
    async catData({ commit }) {
      try {
        const response = await this.$axios.get(`http://localhost/Welfog/api/nav_cat_data`);
        const catData = response.data;

        commit('SET_CAT_DATA', catData);
      } catch (error) {
        console.error('Error getting summary of cart:', error);
        throw error; 
      }
    },
  //////////////////////////////////// catData catData catData///////////////////////////

      


  ////////////////////////////////////  searchProduct///////////////////////////

  async searchProduct({ commit, dispatch }, { search_data, catid, color, sort_by }) {
    console.log('sort_by sort_by sort_by', sort_by);
  
    try {
      const accessToken = localStorage.getItem('access_token');
      const response = await this.$axios.get('http://localhost/Welfog/api/welfog_supplier/products/search', {
        params: {
          name: search_data,
          categories: catid,
          color: color, // Add color to the API request params
          sort_key:sort_by
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      const searchData = response.data; // Assuming response is JSON data
      
      console.log('searchData:', searchData);
  
      // Process your response data as needed
      commit('SET_SEARCH_PRODUCT', searchData);
  
    } catch (error) {
      console.error('Error searching product:', error);
      throw error;
    }
  },

////////////////////////placeOrder///////////////////////////////////////////

async placeOrder({ commit, dispatch }, { payment_option, totalPrice, executeHTML }) {

  try {
    const userId = localStorage.getItem('user_id');
    const paymentOption = payment_option;
    const accessToken = localStorage.getItem('access_token');

    const cod_api = 'http://localhost/Welfog/api/welfog_supplier/payments/pay/cod';
    const wallet_api = 'http://localhost/Welfog/api/welfog_supplier/payments/pay/wallet';
    const razorpay_api = 'http://localhost/Welfog/api/welfog_supplier/payments/pay/razorpay';

    let payment_api;

    if (payment_option === 'cash_on_delivery') {
      payment_api = cod_api;
    } else if (payment_option === 'wallet') {
      payment_api = wallet_api;
    } else if (payment_option === 'razorpay') {
      payment_api = razorpay_api;
    }

    const response = await this.$axios.post(payment_api, {
      user_id: userId,
      payment_option: paymentOption,
      amount: totalPrice,
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const oresult = response.data;

    if (payment_option === 'razorpay') {
      const rezorpayResult = await dispatch('rezorpay', {
        combined_order_id: oresult.combined_order_id,
        order_id: oresult.order_id,
        payment_type: 'cart_payment',
        amount: totalPrice,
      });
      return rezorpayResult;
    } else{

      commit('TOASTER', oresult);
      commit('SET_PLACE_ORDER', oresult);
      if (oresult.result == true) { 
        await dispatch('checkCart');
        this.$router.push({ 
          name: 'order_success', 
          query: { combined_order_id: oresult.combined_order_id } 
        });
      }
    }

   

  } catch (error) {
    console.error('Error adding product to cart:', error);
    throw error;
  }
},

//////////////////////////////////// placeOrder///////////////////////////



////////////////////////////////////  rezorpay paymentSuccess///////////////////////////


async paymentSuccess({ commit , dispatch} , {combined_order_id , paymentData}) {
  try {
    const userId = localStorage.getItem('user_id');
    const accessToken = localStorage.getItem('access_token');
    const response = await this.$axios.post('http://localhost/Welfog/api/welfog_supplier/razorpay/success', {
        user_id: userId,
        payment_details: paymentData,
        payment_type: 'cart_payment',
        combined_order_id: combined_order_id,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const order_succes_payment = response.data;
    commit('TOASTER', order_succes_payment);
    commit('SET_PLACE_ORDER', order_succes_payment);
    if (order_succes_payment.result == true) { 
      await dispatch('checkCart');
      this.$router.push({ 
        name: 'order_success', 
        query: { combined_order_id: order_succes_payment.combined_order_id } 
      });
    }

  } catch (error) {
    console.error('Error processing Razorpay payment:', error);
    throw error;
  }
},

//////////////////////////////paymentSuccess////////////////////////////////////

//////////////////////////////////////rezorpay////////////////////////////////////

async rezorpay({ commit }, { combined_order_id, order_id,  payment_type, amount }) {
  try {
    const userId = localStorage.getItem('user_id');
    const accessToken = localStorage.getItem('access_token');
    const response = await this.$axios.post('http://localhost/Welfog/api/welfog_supplier/razorpay/pay-with-razorpay', {
      user_id: userId,
      payment_type: payment_type,
      system_order_id: order_id,
      amount: amount,
      combined_order_id: combined_order_id,
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const rezorpayResult = response.data;
    return rezorpayResult;

  } catch (error) {
    console.error('Error processing Razorpay payment:', error);
    throw error;
  }
},

////////////////////////////////////  rezorpay ///////////////////////////


//////////////////////////////////////rezorpay wallet////////////////////////////////////

async recharzWallet({ commit }, { recharzAmount }) {
  try {
    const userId = localStorage.getItem('user_id');
    const accessToken = localStorage.getItem('access_token');
    const response = await this.$axios.post('http://localhost/Welfog/api/welfog_supplier/razorpay/pay-with-razorpay', {
      user_id: userId,
      payment_type: 'wallet_payment',
      amount: recharzAmount,
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const rezorpayWallet = response.data;
    return rezorpayWallet;

  } catch (error) {
    console.error('Error processing Razorpay payment:', error);
    throw error;
  }
},

////////////////////////////////////  /rezorpay wallet ///////////////////////////


//////////////////////////////////// walletpaymentSuccess  rezorpay paymentSuccess///////////////////////////


async WalletPaymentSuccess({ commit , dispatch} , {w_userId , w_amount, walletPaymentData}) {
  try {
    const userId = localStorage.getItem('user_id');
    const accessToken = localStorage.getItem('access_token');
    const response = await this.$axios.post('http://localhost/Welfog/api/welfog_supplier/razorpay/success', {
        user_id: w_userId,
        amount: w_amount,
        payment_type: 'wallet_payment',
        payment_details: walletPaymentData,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const wallet_succes_payment = response.data;

    commit('TOASTER', wallet_succes_payment);
   
    await dispatch('myBalance');
    await dispatch('myBalanceHistry');
    

    return wallet_succes_payment.result;
   

  } catch (error) {
    console.error('Error processing Razorpay payment:', error);
    throw error;
  }
},

//////////////////////////////walletpaymentSuccess////////////////////////////////////

////////////////////////////////////  removeCoupon///////////////////////////
async removeCoupon({ commit , dispatch}) {
  try {
    const userId = localStorage.getItem('user_id');
    const accessToken = localStorage.getItem('access_token');
    const response = await this.$axios.post('http://localhost/Welfog/api/welfog_supplier/coupon-remove', {
        user_id: userId,
        coupon_code: coupon,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
  );
  const removecouponresult = response.data;
  commit('SET_REMOVE_COUPON', removecouponresult);
  await dispatch('cartSummary');
  } catch (error) {
    console.error('Error adding product to cart:', error);
    throw error;
  }
},
//////////////////////////////////// removeCoupon///////////////////////////


    ////////////////////////////////////  applyCoupon///////////////////////////
async applyCoupon({ commit , dispatch}, { coupon }) {
  console.log('applyCoupon');

  try {
    const userId = localStorage.getItem('user_id');
    const accessToken = localStorage.getItem('access_token');
    const response = await this.$axios.post('http://localhost/Welfog/api/welfog_supplier/coupon-apply', {
        user_id: userId,
        coupon_code: coupon,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
  
  );

  const applycouponresult = response.data;

  console.log('applyCoupon applyCouponapplyCouponapplyCoupon', applycouponresult);

  commit('SET_APPLY_COUPON', applycouponresult);
   await dispatch('cartSummary');
  

  } catch (error) {
    console.error('Error adding product to cart:', error);
    throw error;
  }

},
  //////////////////////////////////// applyCoupon///////////////////////////



  
  ////////////////////////////////////  paymentTypes paymentTypes paymentTypes///////////////////////////
  async paymentTypes({ commit }) {
    console.log('paymentTypes paymentTypes paymentTypes');
    try {
      const response = await this.$axios.get(`http://localhost/Welfog/api/welfog_supplier/payment-types`);
      const paymentTypes = response.data;
      commit('SET_PAYMENT_TYPES', paymentTypes);
    } catch (error) {
      console.error('Error getting summary of cart:', error);
      throw error; 
    }
  },
    //////////////////////////////////// paymentTypes paymentTypes paymentTypes///////////////////////////

    //////////////////////////////////// Ship shipAddress///////////////////////////
async shipAddress({ commit , dispatch}, { address_id, country_id, state_id, city_id, pincode_id, phone_id }) {

  try {
    const userId = localStorage.getItem('user_id');
    const accessToken = localStorage.getItem('access_token');
    const response = await this.$axios.post('http://localhost/Welfog/api/welfog_supplier/user/shipping/create', {
        user_id: userId,
        address: address_id,
        country_id: country_id,
        state_id: state_id,
        city_id:city_id,
        postal_code: pincode_id,
        phone: phone_id
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
  
  );

  await dispatch('shipGetAddress');
   console.log('adddddddressssss creatinnngggg', response);

  } catch (error) {
    console.error('Error adding product to cart:', error);
    throw error;
  }

},
  //////////////////////////////////// Ship shipAddress///////////////////////////
 
  ////////////////////////////////////User balance histry///////////////////////////
 async myBalanceHistry({ commit }) {
  console.log(' myBalance myBalance myBalance/');
  try {
    const userId = localStorage.getItem('user_id');
    const accessToken = localStorage.getItem('access_token');
    const response = await this.$axios.get(`http://localhost/Welfog/api/welfog_supplier/wallet/history/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const balanceData = response.data.data; 

    commit('BALANCE_HISTRY', balanceData);


    console.log('balanceData balanceData balanceData balanceData',balanceData);
    // commit('SET_SHIP_GET_ADDRESS', shipGetAddress);
      // commit('SET_SHIP_CITY', shipCity);
  } catch (error) {
    console.error('Error getting summary of cart:', error);
    throw error; 
  }
},
  //////////////////////////////////// User histry ///////////////////////////

  ////////////////////////////////////User balance///////////////////////////
 async myBalance({ commit }) {
  try {
    const userId = localStorage.getItem('user_id');
    const accessToken = localStorage.getItem('access_token');
    const response = await this.$axios.get(`http://localhost/Welfog/api/welfog_supplier/wallet/balance/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const mybalance = response.data; 

    commit('BALANCE_AMOUNT', mybalance);


    console.log('mybalance  mybalance mybalance', mybalance);
    // commit('SET_SHIP_GET_ADDRESS', shipGetAddress);
      // commit('SET_SHIP_CITY', shipCity);
  } catch (error) {
    console.error('Error getting summary of cart:', error);
    throw error; 
  }
},
  //////////////////////////////////// User balance ///////////////////////////


 //////////////////////////////////// Ship shipAddress getting///////////////////////////
 async shipGetAddress({ commit }) {
  console.log(' Ship shipAddress getting/');
  try {
    const userId = localStorage.getItem('user_id');
    const accessToken = localStorage.getItem('access_token');
    const response = await this.$axios.get(`http://localhost/Welfog/api/welfog_supplier/user/shipping/address/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const shipGetAddress = response.data.data[0]; 
    commit('SET_SHIP_GET_ADDRESS', shipGetAddress);
      // commit('SET_SHIP_CITY', shipCity);
  } catch (error) {
    console.error('Error getting summary of cart:', error);
    throw error; 
  }
},
  //////////////////////////////////// Ship Ship shipAddress getting///////////////////////////


  //////////////////////////////////// Ship shipCity///////////////////////////
async shipCity({ commit }, { selectedStateId }) {
  try {
    const response = await this.$axios.get(`http://localhost/Welfog/api/welfog_supplier/cities-by-state/${selectedStateId}`);
    const shipCity = response.data.data;
      commit('SET_SHIP_CITY', shipCity);
  } catch (error) {
    console.error('Error getting summary of cart:', error);
    throw error; 
  }
},
  //////////////////////////////////// Ship shipCity///////////////////////////

  //////////////////////////////////// Ship State///////////////////////////
  
async shipState({ commit }, { selectedCountryId }) {
  try {
    const userId = localStorage.getItem('user_id');
    const accessToken = localStorage.getItem('access_token');
    const response = await this.$axios.get(`http://localhost/Welfog/api/welfog_supplier/states-by-country/${selectedCountryId}`);
    const shipState = response.data;
      commit('SET_SHIP_STATE', shipState);
  } catch (error) {
    console.error('Error getting summary of cart:', error);
    throw error; 
  }
},
  //////////////////////////////////// Ship State///////////////////////////


//////////////////////////////////// shipCountry///////////////////////////
  

async shipCountry({ commit }) {
  // console.log('Fetching shipCountry shipCountryshipCountryshipCountryshipCountry...');

  try {
    const userId = localStorage.getItem('user_id');
    const accessToken = localStorage.getItem('access_token');
    const response = await this.$axios.get(`http://localhost/Welfog/api/welfog_supplier/countries`);
    const shipCountry = response.data.data;
    // console.log('shipCountry shipCountryshipCountry:', shipCountry);
      commit('SET_SHIP_COUNTRY', shipCountry);
  } catch (error) {
    console.error('Error getting summary of cart:', error);
    throw error; 
  }
},

////////////////////////////////////shipCountry///////////////////////////


  //////////////////////////////////// cart listingg///////////////////////////
  

  async cartSummary({ commit }) {
    // console.log('Fetching cart summary...');
    try {
      const userId = localStorage.getItem('user_id');
      const accessToken = localStorage.getItem('access_token');
  
      // Make sure to correctly configure Axios for the GET request
      const response = await this.$axios.get(`http://localhost/Welfog/api/welfog_supplier/cart-summary/${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      // Assuming response.data contains the actual data you need
      const cartSummary = response.data;
      // console.log('Cart Summary:', cartSummary);
  
      // Optionally, you can commit the cart summary to Vuex store
       commit('SET_CART_SUMMARY', cartSummary);
  
    } catch (error) {
      console.error('Error getting summary of cart:', error);
      throw error; // Rethrow the error to be caught by the caller
    }
  },
  
  ////////////////////////////////////cart listingg///////////////////////////



  async addToCart({ commit, getters }, { id, color, quantity, userId }) {
    try {
      const response = await this.$axios.post('http://localhost/Welfog/api/crux/addcart', {
        user_id: userId,
        product_id: id,
        color_code: color,
        quantity: quantity,
      });


      const cartData = response.data;
      commit('TOASTER', cartData);
  
      const newCartQuantity = getters.getCartQuantity + 1; // Access via getters
      commit('updateCartQuantity', newCartQuantity); // Commit mutation
  
      console.log('Product added to cart:', newCartQuantity);
    } catch (error) {
      console.error('Error adding product to cart:', error);
      throw error;
    }
  },
  
  ////////////////////////////////////checkning the cart qty///////////////////////////
  async checkCart({ commit }) {
    try {
      const userId = localStorage.getItem('user_id');
      const accessToken = localStorage.getItem('access_token');
      const response = await this.$axios.post(`http://localhost/Welfog/api/welfog_supplier/carts-qty/${userId}`, 
        {
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const databaseqty = response.data;
      commit('updateCartQuantity', databaseqty);
    } catch (error) {
      console.error('Error checking cart:', error);
      throw error; 
    }
  },
  ////////////////////////////////////checkning the cart qty///////////////////////////




  //////////////////////////////////// cart listingg///////////////////////////
  async cartList({ commit }) {

    // console.log('cartListcartListcartListcartListcartListcartListcartListcartListcartList');
    try {
      const userId = localStorage.getItem('user_id');
      const accessToken = localStorage.getItem('access_token');
      
      if (!userId || !accessToken) {
        throw new Error('User ID or Access Token not found in localStorage');
      }

      const response = await this.$axios.post(`http://localhost/Welfog/api/welfog_supplier/carts/${userId}`, 
        {
          // Your data object here, if any
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log(response.data.length);
      

      if (response.data.length > 0) {
        const cartItemsss = response.data[0].cart_items; 
        commit('SET_CART_ITEMS', cartItemsss);
      }else{
        commit('SET_CART_ITEMS', null);
      }
      

    } catch (error) {
      console.error('Error checking cart:', error);
      throw error; // Re-throw the error to handle it in the component or wherever this action is called
    }
  },
  ////////////////////////////////////cart listingg///////////////////////////






  //////////////////////////////////// cart qty updating///////////////////////////
  async updateCart({ commit, dispatch  }, { id, quantity }) {
    try {
      const userId = localStorage.getItem('user_id');
      const accessToken = localStorage.getItem('access_token');
      if (!userId || !accessToken) {
        throw new Error('User ID or Access Token not found in localStorage');
      }
      const response = await this.$axios.post(`http://localhost/Welfog/api/welfog_supplier/carts/change-quantity`, 
        {
          id: id,
          quantity: quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      await dispatch('checkCart');
      await dispatch('cartSummary');
      
    } catch (error) {
      console.error('Error checking cart:', error);
      throw error; // Re-throw the error to handle it in the component or wherever this action is called
    }
  },
  ////////////////////////////////////cart qty updating//////////////////////////


  //////////////////////////////////// Remove cart product updating///////////////////////////
  async RemoveCart({ commit, dispatch  }, { removeCartId }) {
    // console.log('sssssssssssssssssssssssssssss', removeCartId);

    try {
      const userId = localStorage.getItem('user_id');
      const accessToken = localStorage.getItem('access_token');
      const response = await this.$axios.post(`http://localhost/Welfog/api/welfog_supplier/carts`, 
        {
          id: removeCartId
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // console.log('cart removvvvvvvvvvvvved succefffuuuuuuuuuuuuuuulllll');

      await dispatch('checkCart');
      await dispatch('cartList');
      await dispatch('cartSummary');


    } catch (error) {
      console.error('Error checking cart:', error);
      throw error; // Re-throw the error to handle it in the component or wherever this action is called
    }


  },
  ////////////////////////////////////Remove cart product updating//////////////////////////



  
};

export const getters = {
  isAuthenticated(state) {
    return !!state.user;
  },
  getUser(state) {
    return state.user;
  },
  getCartQuantity(state) {
    return state.cartQuantity;
  },
  cartItems(state) {
    return state.cartItems;
  },

};

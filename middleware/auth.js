export default async function ({ $axios, store, redirect, route }) {
  const shop_user_id = localStorage.getItem('shop_user_id');
  const stepRoutes = ['shops-step1', 'shops-step2', 'shops-step3', 'shops-step4', 'shops-step5', 'shops-step6'];
  
//   alert(route.name);
  // Allow access to `/shops/verify_number` without `shop_user_id`

  if (route.name === 'shops-verify_number') {
    const shop_posme = localStorage.getItem('posme');

    // alert(shop_posme);
    
    if(shop_posme === 'true'){
        // alert(shop_posme);
        return; 
    } else{
        return redirect('/?login_here');
    }
  }


  


  


  // Redirect to root (`/`) if accessing step routes without `shop_user_id`

    if(!shop_user_id && stepRoutes.includes(route.name) && !route.query.first_logIn) {
        return redirect('/?first_logIn');
    }


  // Handle cases where `shop_user_id` exists and the user is on a step route
  if (shop_user_id && stepRoutes.includes(route.name)) {
      const apiUrl = `${process.env.APP_URL}/api/welfog_supplier/fatche_step/${shop_user_id}`;
      const response = await $axios.get(apiUrl);
      const data = response.data;

      store.commit('SET_API_DATA', data);

      const stepRouteMapping = {
          0: '/shops/step1',
          1: '/shops/step2',
          2: '/shops/step3',
          3: '/shops/step4',
          4: '/shops/step5',
          5: '/shops/step6'
      };
      const targetRoute = stepRouteMapping[data];
      // Redirect to the appropriate step route if different from the current route
      // Normalize paths by removing trailing slashes for comparison
      const currentPath = route.path.replace(/\/$/, '');
      const normalizedTargetRoute = targetRoute.replace(/\/$/, '');
      
      if (targetRoute && currentPath !== normalizedTargetRoute) {
          return redirect(targetRoute);
      }
  } else {
      // Check for user login data (`nvData`) if not on a step route

      

      const userData = localStorage.getItem('loginData');
      const nvData = userData ? JSON.parse(userData) : null;
      // If `nvData` is missing and not already on the root route, redirect to root with `log_in` query
      if (!nvData) {
          if (route.path !== '/') {
              return redirect('/?log_in');
          }
          return; // Prevent further redirects if already on root route
      }

      // If user is logged in, verify their access token
      if (nvData) {
          const access_token = nvData.access_token;
          const user_id = nvData.user.id;
          const response = await $axios.post(
              `${process.env.APP_URL}/api/welfog_supplier/get-seller-by-access_token`,
              { access_token, userId: user_id },
              { headers: { Authorization: `Bearer ${access_token}` } }
          );

          const sellerData = response.data;
          store.commit('SET_SELLER_DATA', sellerData);
          console.log('Seller data:', sellerData);



          // Additional logic can be added here based on `sellerData`
      }
  }
}


///in this change one thisnk that
<template>
  <div class="aiz-main-content">


         


<div class="px-15px px-lg-25px">
  <div id="thismycontent">
    

<div id="content" class="app-content">
<h class=" mb-3" style="font-size: 17px;">
Hi, {{ DashData.user.name }} <small>here's what's happening with your store today.</small>
</h>
<div class="row">
<div class="col-xl-6 mb-3">
<div class="card h-100 overflow-hidden">
<div class="card-img-overlay d-block d-lg-none bg-blue rounded"></div>
<div class="card-img-overlay d-none d-md-block bg-blue rounded mb-n1 mx-n1" style="background-position: right bottom; background-repeat: no-repeat; background-size: 100%;"></div>
<div class="card-img-overlay d-none d-md-block bottom-0 top-auto">
<div class="row">
<div class="col-md-8 col-xl-6"></div>
<div class="col-md-4 col-xl-6 mb-n2">
<img src="#" alt="" class="d-block ms-n3 mb-5" style="max-height: 310px">
</div>
</div>
</div>










<div class="card-body position-relative text-white text-opacity-70">
<div class="row">



<div class="col-md-8">
<div class="d-flex">
<div class="me-auto">
<h5 class="text-white text-opacity-80 mb-3">Total Earning</h5>
<h3 class="text-white mt-n1 mb-1">Rs <span :v-if="DashData.user">{{ DashData.user.receivedAmount }}</span></h3>
<p class="mb-1 text-white text-opacity-60 text-truncate">
<i class="fa fa-caret-up"></i> <b></b>You Received Rs <span :v-if="DashData.user">{{ DashData.user.receivedAmount }}</span>  Amount

</p>
</div>
</div>
<hr class="bg-white bg-opacity-75 mt-3 mb-3">
<div class="row">
<div class="col-6 col-lg-5">
<div class="mt-1">
<i class="fa fa-fw fa-shopping-bag fs-28px text-black text-opacity-50"></i>
</div>
<div class="mt-1">
<div>Store Sales</div>
<div class="fw-600 text-white">{{ DashData.counts.totalOrders }} Products</div>
</div>
</div>
<div class="col-6 col-lg-5">
<div class="mt-1">
<i class="fa fa-fw fa-retweet fs-28px text-black text-opacity-50"></i>
</div>
<div class="mt-1">
<div>Return</div>
<div class="fw-600 text-white">{{ DashData.counts.refundRequestCount }} Products</div>
</div>
</div>
</div>
<hr class="bg-white bg-opacity-75 mt-3 mb-3">
<div class="mt-3 mb-2">
<a  class="btn btn-yellow btn-rounded btn-sm ps-5 pe-5 pt-2 pb-2 fs-14px fw-600"><i class="fa fa-eye me-2 ms-n2"></i>View Details</a>
</div>
<p class="fs-12px">
It usually takes 3-7 business days for transferring the earning to your bank account.

</p>
</div>
<div class="col-md-4 d-none d-md-block" style="min-height: 380px;"></div>
</div>
</div>
</div>
</div>



<!-- =============seller dash============= -->








<div class="col-xl-6">
<div class="row">
<div class="col-sm-6">
<div class="card mb-3 overflow-hidden fs-13px border-0 bg-gradient-custom-orange" style="min-height: 199px;">
<div class="card-img-overlay mb-n4 me-n4 d-flex" style="bottom: 0; top: auto;">
<img src="#" alt="" class="ms-auto d-block mb-n3" style="max-height: 105px">
</div>

<div class="card-body position-relative">
<h5 class="text-white text-opacity-80 mb-3 fs-16px">Product Listing</h5>
<h3 class="text-white mt-n1">{{ DashData.counts.productCount }}</h3>
<div class="progress bg-black bg-opacity-50 mb-2" style="height: 6px">
<div class="progrss-bar progress-bar-striped bg-white" style="width: 100%"></div>
</div>
<div class="text-white text-opacity-80 mb-4"><i class="fa fa-caret-up"></i> All Active Listing</div>
<div><a onclick="handleClick('https://supplier.Welfog.com/seller/products/all')" class="clickme text-white d-flex align-items-center text-decoration-none">View All <i class="fa fa-chevron-right ms-2 text-white text-opacity-50"></i></a></div>
</div>

</div>


<div class="card mb-3 overflow-hidden fs-13px border-0 bg-gradient-custom-teal" style="min-height: 199px;">

<div class="card-img-overlay mb-n4 me-n4 d-flex" style="bottom: 0; top: auto;">
<img src="#" alt="" class="ms-auto d-block mb-n3" style="max-height: 105px">
</div>


<div class="card-body position-relative">
<h5 class="text-white text-opacity-80 mb-3 fs-16px">Return Requests</h5>
<h3 class="text-white mt-n1">{{ DashData.counts.refundRequestCount }}</h3>
<div class="progress bg-black bg-opacity-50 mb-2" style="height: 6px">
<div class="progrss-bar progress-bar-striped bg-white" style="width: 100%"></div>
</div>
<div class="text-white text-opacity-80 mb-4"><i class="fa fa-caret-up"></i> Return Orders</div>
<div><a  class="clickme text-white d-flex align-items-center text-decoration-none">View All <i class="fa fa-chevron-right ms-2 text-white text-opacity-50"></i></a></div>
</div>

</div>

</div>


<div class="col-sm-6">

<div class="card mb-3 overflow-hidden fs-13px border-0 bg-gradient-custom-pink" style="min-height: 199px;">

<div class="card-img-overlay mb-n4 me-n4 d-flex" style="bottom: 0; top: auto;">
<img class="ms-auto d-block mb-n3" style="max-height: 105px">
</div>


<div class="card-body position-relative">
<h5 class="text-white text-opacity-80 mb-3 fs-16px">All Orders</h5>
<h3 class="text-white mt-n1">{{ DashData.counts.totalOrders }}</h3>
<div class="progress bg-black bg-opacity-50 mb-2" style="height: 6px">
<div class="progrss-bar progress-bar-striped bg-white" style="width: 100%"></div>
</div>
<div class="text-white text-opacity-80 mb-4"><i class="fa fa-caret-down"></i>  Orders Created By Customers</div>
<div><a  class="clickme text-white d-flex align-items-center text-decoration-none">View All <i class="fa fa-chevron-right ms-2 text-white text-opacity-50"></i></a></div>
</div>

</div>


<div class="card mb-3 overflow-hidden fs-13px border-0 bg-gradient-custom-indigo" style="min-height: 199px;">

<div class="card-img-overlay mb-n4 me-n4 d-flex" style="bottom: 0; top: auto;">
<img alt="" class="ms-auto d-block mb-n3" style="max-height: 105px">
</div>


<div class="card-body position-relative">
<h5 class="text-white text-opacity-80 mb-3 fs-16px">Accepted Orders</h5>
<h3 class="text-white mt-n1">{{ DashData.counts.acceptedOrders }}</h3>
<div class="progress bg-black bg-opacity-50 mb-2" style="height: 6px">
<div class="progrss-bar progress-bar-striped bg-white" style="width: 100%"></div>
</div>
<div class="text-white text-opacity-80 mb-4"><i class="fa fa-caret-up"></i> Order Accepted By Marketplace</div>
<div><a  class="clickme text-white d-flex align-items-center text-decoration-none">View All <i class="fa fa-chevron-right ms-2 text-white text-opacity-50"></i></a></div>
</div>

</div>

</div>

</div>

</div>

</div>


<div class="row">


</div>

</div>

<style type="text/css">
a.clickme {
cursor: pointer;
}
</style>
  </div>
</div>


 <!--//////loader/////////-->
 <div class="spinner" id="spinner" style="display: none;">
  <div class="aiz-main-content">
   <div class="px-24px px-lg-24px" style="padding-left: 30px; padding-right: 30px;">
     <div class="skeleton-container">
      <div class="skeleton skeleton-text"></div>
      <div class="skeleton skeleton-text"></div>
      <div class="skeleton skeleton-image"></div>
      </div>
    </div>
     </div>
    </div>
    <!--//////loader/////////-->

<div class="bg-white text-center py-3 px-15px px-lg-25px mt-auto">
  <p class="mb-0">© Welfog </p>
</div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  layout: 'app',
  async asyncData({ store }) {
    await store.dispatch('dashBoardData');
  },

  data() {
    return {
      IMG_URL: process.env.IMG_URL,
    };
  },

  computed: {
    ...mapState({
      DashData: (state) => state.DashData
    })
  },
};
</script>

<style scoped>

</style>

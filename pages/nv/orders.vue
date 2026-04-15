<template>
  <div id="content" class="app-content">
    <!-- <div class="d-flex align-items-center mb-3 order_list">
      <div>
        <h1 class="page-header mb-0">Order List</h1>
      </div>
      <div class="ms-auto"></div>
    </div> -->

    <div class="menu-search card" style="background: white; padding: 10px;">
      <nav id="menu">
        <ul id="menu-nav">
          <li><a @click="navigateTo('hold_orders.index')" :class="isActive('hold_orders.index')">On Hold ( {{ orderstatus.hold }} )</a></li>
          <li><a @click="navigateTo('pending_orders.index')" :class="isActive('pending_orders.index')">Pending ( {{ orderstatus.pending }} )</a></li>
          <li><a @click="navigateTo('accepted_orders.index')" :class="isActive('accepted_orders.index')">Accepted ( {{ orderstatus.confirmed }} )</a></li>
          <li><a @click="navigateTo('handover_orders.index')" :class="isActive('handover_orders.index')">Handover ( {{ orderstatus.handover }} )</a></li>
          <li><a @click="navigateTo('breached_orders.index')" :class="isActive('breached_orders.index')">Breached ( {{ orderstatus.breached }} )</a></li>
          <li><a @click="navigateTo('shipped_orders.index')" :class="isActive('shipped_orders.index')">Shipped ( {{ orderstatus.shipped }} )</a></li>
          <li><a @click="navigateTo('delivered_orders.index')" :class="isActive('delivered_orders.index')">Delivered ( {{ orderstatus.delivered }} )</a></li>
          <li><a @click="navigateTo('cancelled_orders.index')" :class="isActive('cancelled_orders.index')">Cancelled ( {{ orderstatus.cancelled }} )</a></li>
        </ul>
      </nav>
    </div>

    <div class="card">
      <form @submit.prevent="sortOrders" id="sort_orders">
        <div class="card-header row gutters-5" style="background: white; margin-left: 6px; width: 98%;">
          <div class="dropdown mb-2 mb-md-0 col-md-1">
            <button id="myButton" class="btn border dropdown-toggle" @click="bulkDownloadCsv" type="button" :disabled="true">Download Order Report</button>
          </div>

          <!-- Change Status Modal -->
          <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Choose an order status</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                </div>
                <div class="modal-body">
                  <select class="form-control" v-model="updateDeliveryStatus" @change="changeStatus">
                    <option value="hold">On Hold</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Accepted</option>
                    <option value="handover">Handover</option>
                    <option value="breached">Breached</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancel</option>
                  </select>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary" @click="saveStatus">Save changes</button>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-2 ml-auto">
            <select v-if="isAll" class="form-control form-select" v-model="deliveryStatus" @change="sortOrders">
              <option value="">Filter by Delivery Status</option>
              <option v-for="status in deliveryStatuses" :key="status.value" :value="status.value">{{ status.label }}</option>
            </select>
          </div>

          <div class="col-lg-8 ml-auto" style="display: flex; justify-content: right;">
            <div class="form-group mb-0">
              <input type="text" class="form-control" v-model="searchQuery" placeholder="SKU/OrderId/Title">
            </div>
          </div>

          <div class="col-auto">
            <div class="form-group mb-0">
              <button type="submit" class="btn btn-primary">Refresh</button>
            </div>
          </div>
        </div>

        <div class="card-body">
          <table class="table mb-0" id="myTable">
            <thead>
              <tr>
                <th>
                  <div class="form-group">
                    <div class="aiz-checkbox-inline">
                      <label class="aiz-checkbox">
                        <input type="checkbox" @click="checkAllChanged" class="check-all">
                        <span class="aiz-square-check"></span>
                      </label>
                    </div>
                  </div>
                </th>
                <th>Product Image</th>
                <th>Product Title</th>
                <th>SKU</th>
                <th>Order Id</th>
                <th>Color</th>
                <th>Size</th>
                <th>Order Date</th>
                <th>Qty</th>
                <th>Order Amount</th>
                <th>Product id</th>
                <th class="text-right">Options</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in orders" :key="order.order_id">
                <td>
                  <div class="form-group">
                    <div class="aiz-checkbox-inline">
                      <label class="aiz-checkbox">
                        <input type="checkbox" @click="checkboxChanged" class="checkbox check-one" :value="order.order_id">
                        <span class="aiz-square-check"></span>
                      </label>
                    </div>
                  </div>
                </td>

                <td>
                  <img v-if="order.thumbnail_img" :src="order.thumbnail_img" height="50" :alt="order.product_name">
                  <strong v-else>N/A</strong>
                </td>

                <td>
                  <a v-if="order.slug" :href="`/product/${order.slug}`" target="_blank">{{ order.product_name }}</a>
                  <strong v-else>Product Unavailable</strong>
                </td>

                <td>{{ order.sku || '-------' }}</td>
                <td>{{ order.order_id }}</td>
                <td>{{ order.color || 'Free Color' }}</td>
                <td>{{ order.size || 'Free Size' }}</td>
                <td>{{ new Date(order.order_date * 1000).toLocaleDateString() }}</td>
                <td>{{ order.quantity }}</td>
                <td>{{ order.price | currency }}</td>
                <td>{{ order.product_id }}</td>
                <td class="text-right">
                  <a class="btn btn-soft-primary btn-icon btn-circle btn-sm" @click="viewOrder(order.order_id)">
                    <i class="fa fa-eye"></i>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>

          <div class="aiz-pagination">
            <pagination :total-items="totalOrders" :current-page="currentPage" @change="paginateOrders"></pagination>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'app',

  data() {
    return {
      orderstatus: {
        hold: 10,
        pending: 20,
        confirmed: 15,
        handover: 5,
        breached: 3,
        shipped: 8,
        delivered: 18,
        cancelled: 2
      },
      orders: [],
      searchQuery: '',
      deliveryStatus: '',
      updateDeliveryStatus: '',
      isAll: true,
      totalOrders: 100,
      currentPage: 1,
      deliveryStatuses: [
        { label: 'On Hold', value: 'hold' },
        { label: 'Pending', value: 'pending' },
        { label: 'Accepted', value: 'confirmed' },
        { label: 'Handover', value: 'handover' },
        { label: 'Breached', value: 'breached' },
        { label: 'Shipped', value: 'shipped' },
        { label: 'Delivered', value: 'delivered' },
        { label: 'Cancelled', value: 'cancelled' }
      ]
    };
  },
  methods: {
    isActive(route) {
      return this.$route.name === route ? 'active' : '';
    },
    navigateTo(route) {
      this.$router.push({ name: route });
    },
    sortOrders() {
      // Handle sorting logic based on searchQuery and deliveryStatus
    },
    saveStatus() {
      // Save selected status
    },
    bulkDownloadCsv() {
      // Handle CSV download logic
    },
    checkboxChanged() {
      // Handle checkbox changes
    },
    checkAllChanged() {
      // Handle "select all" checkbox
    },
    paginateOrders(page) {
      this.currentPage = page;
      // Fetch orders for the selected page
    },
    viewOrder(orderId) {
      // Navigate to order detail page
      this.$router.push(`/order-detail/${orderId}`);
    }
  },
  filters: {
    currency(value) {
      return `$${parseFloat(value).toFixed(2)}`;
    }
  }
};
</script>

<style scoped>
/* Add any necessary styles here */
</style>

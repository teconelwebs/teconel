<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info" class="navBarNew">
      <!-- Left side: Navbar Toggler button -->
      <b-navbar-toggle target="navbar-nav"></b-navbar-toggle>

      <!-- Brand on the left side -->
      <b-navbar-brand href="#">
        <img
          style="width: 33px; border: solid; border-radius: 50px; padding: 0px; background: #ffffff; padding-top: 3px; padding-bottom: 3px;"
          src="https://d1f02fefkbso7w.cloudfront.net/public/uploads/all/8M5M8DnEMA1R2sMgpSAYuebdwpeJkx8T5wUaDfA6.png"
        />
      </b-navbar-brand>

      <!-- Navbar Collapse -->
      <b-collapse id="navbar-nav" is-nav>
        <!-- Main Navbar Items (Menu List) -->
        <b-navbar-nav>
          <b-nav-item href="/nv">Home</b-nav-item>
          <b-nav-item href="/nv/orders">Order</b-nav-item>
          <b-nav-item href="#">Return</b-nav-item>
          <b-nav-item href="#">Listing</b-nav-item>
          <b-nav-item href="#">Payment</b-nav-item>
          <b-nav-item href="#">Growth</b-nav-item>
          <b-nav-item href="#">Advertising</b-nav-item>
          <b-nav-item href="#">Support Ticket</b-nav-item>
          <b-nav-item href="#">Profile</b-nav-item>
          <b-nav-item href="#">Img URL</b-nav-item>
        </b-navbar-nav>

        <!-- Navbar Right Side (Select Bar, Notification Dropdown, and Profile) -->
        <b-navbar-nav class="ml-auto">
          <!-- Select Dropdown -->
          <div class="menu-item dropdown" style="margin-right: 23px !important; padding-top: 5px;">
            <select 
              class="styled-select" 
              id="location_select" 
              name="location_select" 
              v-model="selectedLocation"
              @change="handleLocationChange"
            >
              <option 
                v-for="location in sellerData.location" 
                :key="location.id" 
                :value="location.location_id" 
                class="styled-option"
              >
                {{ location.location_name }}
              </option>
            </select>
          </div>

          <!-- Notification Dropdown -->
          <b-nav-item>
            <i class="fa fa-bell" aria-hidden="true"></i>
          </b-nav-item>

          <!-- Profile Section with Online Status -->
          <b-nav-item class="profile-section">
            <div class="d-flex align-items-center">
              <!-- Profile Image -->
              <div class="menu-img online">
                <img
                  :src="IMG_URL+sellerData.avatar_original"
                  style="width: 32px; height: 32px;"
                  alt=""
                  class="rounded-circle"
                />
              </div>
              <!-- Profile Name -->
              <div class="ml-2">{{sellerData.shop_info.name}}</div>
            </div>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'NavbarLayout',
  data() {
    return {
      IMG_URL: process.env.IMG_URL,
      selectedLocation: null, // Will hold the selected location_id
    };
  },
  

  

  computed: {
    ...mapState({
      site_nav_data: state => state.site_nav_data,
      sellerData: (state) => state.sellerData,
    }),

  },

  created() {
    this.$store.dispatch('site_nav_data');

    this.setSelectedLocation();
    this.handleLocationChange();
  },

  methods: {
    ...mapState(['site_nav_data']),
    handleLocationChange() {
      const selectedLocation = this.sellerData.location.find(
        (location) => location.location_id === this.selectedLocation
      );
      if (selectedLocation) {
        localStorage.setItem('system_location_id', selectedLocation.id);
        localStorage.setItem('location_id', selectedLocation.location_id);
      }

      let systemLocationId = selectedLocation.id;
      let Location_id = selectedLocation.location_id;

      this.$store.dispatch('update_location', systemLocationId, Location_id);

    },
    
    setSelectedLocation() {
      const selectedLocation = this.sellerData.location.find(
        (location) => location.selectedAddress === 1
    );
      
      if (selectedLocation) {
        this.selectedLocation = selectedLocation.location_id;
      }
    },

    logout() {
      alert("Logged out!");
    },
  },
};
</script>

<style scoped>
/* Optional custom styling for avatar and dropdown button */
b-avatar {
  display: inline-block;
  position: relative;
  top: 4px;
}

/* Optional custom styling for the profile dropdown */
b-dropdown-item {
  cursor: pointer;
}

.navBarNew {
  background: #fb5404 !important;
}

.navbar {
  padding: 0;
  padding-left: 15px;
  padding-right: 15px;
}

a.nav-link[data-v-a16d9f54] {
  font-weight: 500;
  font-size: 14px !important;
}

.navbar-dark .navbar-nav .nav-link[data-v-a16d9f54] {
  color: rgb(255 255 255);
  text-transform: capitalize;
}

.nav-item:not(:last-child) {
  margin-right: 2rem;
}

.styled-select {
  width: 200px;
  padding: 10px;
  border-radius: 3px;
  border: 3px solid #fff;
  background-color: #fb5404;
  font-family: Arial, sans-serif;
  font-size: 16px;
  color: #fff;
  outline: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.styled-select option {
  padding: 10px;
  background-color: #fff;
  color: #333;
}

/* Flex styling for profile and notification */
.profile-section {
  display: flex;
  align-items: center;
  margin-left: 20px;
}

.profile-section .menu-img {
  display: inline-block;
  margin-right: 10px; /* Adding spacing between image and name */
}

.profile-section .ml-2 {
  margin-left: 10px;
}

.profile-section i {
  font-size: 20px;
  margin-right: 10px; /* Spacing between notification and profile */
}

/* Ensure that all elements in the navbar are inline and centered */
.navbar-nav {
  display: flex;
  align-items: center;
}

.navbar-nav .nav-item {
  display: flex;
  align-items: center;
}

.navbar-nav .nav-link {
  display: inline-block;
}

/* Remove any unwanted pseudo-element */
.profile-section::after {
  content: none !important; /* Ensure no after element is added */
}

/* Remove the default expand/collapse icon */
.expand::after, .collapse::after {
    content: none !important;  /* Removes the icon */
}

/* Optional: If you want to replace it with something else, you can add this instead */
.expand::after, .collapse::after {
    content: "";  /* Ensures no content is added */
    display: none; /* Hides the pseudo-element completely */
}
</style>

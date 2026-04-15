<!-- layouts/default.vue -->
<template>
    <div>
    <Header />
      <Nuxt />
      <Footer />
    </div>
  </template>
  
  <script>
  import Header from '~/components/app/Header.vue'
  import Footer from '~/components/app/Footer.vue'
  
  export default {
    components: {
      Header,
      Footer
    }
  }
  </script>
  
  
  
  
  <style scoped>
  /* Add your styles here */
  </style>
  
  
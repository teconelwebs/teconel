<template>
    <div>
      <button @click="handleClick" :disabled="isLoading">
        <span v-if="isLoading">Loading...</span>
        <span v-else>Submit</span>
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const isLoading = ref(false);
  
  const handleClick = async () => {
    isLoading.value = true;
  
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
  
      // Your actual API call here
      // await axios.post('/your-api-endpoint', { ... });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      isLoading.value = false;
    }
  };
  </script>
  
  <style scoped>
  button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  </style>
  
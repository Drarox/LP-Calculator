<template>
  <nav class=" text-white p-4 relative">
    <div class="container mx-auto flex justify-between items-center">
      <div class="flex items-center">
        <img src="/favicon.svg" alt="Logo" class="h-8 w-8 mr-2">
        <router-link to="/" class="bg-gradient-to-r from-purple-400 to-blue-300 text-transparent bg-clip-text text-xl font-bold">LP Calculator</router-link>
      </div>
      <div class="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-4">
        <router-link to="/" class="text-gray-300 hover:text-gray-100">Concentrated (V3)</router-link>
        <router-link to="/classic" class="text-gray-300 hover:text-gray-100">Classic (V2)</router-link>
      </div>
      <div class="md:hidden">
        <button @click="toggleMenu" class="focus:outline-none">
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </div>
    <div v-if="isMenuOpen" class="md:hidden mt-4">
      <router-link to="/" class="block py-2 px-4 hover:bg-gray-700">Concentrated (V3)</router-link>
      <router-link to="/classic" class="block py-2 px-4 hover:bg-gray-700">Classic (V2)</router-link>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<style scoped>
</style>

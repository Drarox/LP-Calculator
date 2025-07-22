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
        <router-link to="/apr" class="text-gray-300 hover:text-gray-100">APR Calculator</router-link>
        <router-link to="/tracker" class="text-gray-300 hover:text-gray-100">Position Tracker</router-link>
      </div>
      <div class="flex items-center gap-3">
        <!-- Extension Promotion Button -->
        <button @click="openExtensionStore" 
                title="Get HyperEVM Real-Time Gas Extension"
                class="hidden sm:flex items-center gap-2 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition duration-150 ease-in-out cursor-pointer">
          <img src="/hyperevm.svg" alt="HyperEVM" class="h-5 w-5">
          <span class="hidden lg:inline">Get HyperEVM Extension</span>
        </button>
        
        <!-- Mobile Menu Button -->
        <div class="md:hidden">
          <button @click="toggleMenu" class="focus:outline-none">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div v-if="isMenuOpen" class="md:hidden mt-4">
      <router-link to="/" class="block py-2 px-4 hover:bg-gray-700">Concentrated (V3)</router-link>
      <router-link to="/classic" class="block py-2 px-4 hover:bg-gray-700">Classic (V2)</router-link>
      <router-link to="/apr" class="block py-2 px-4 hover:bg-gray-700">APR Calculator</router-link>
      <router-link to="/tracker" class="block py-2 px-4 hover:bg-gray-700">Position Tracker</router-link>
      
      <!-- Extension Promotion in Mobile Menu -->
      <div class="border-t border-gray-600 mt-2 pt-2">
        <button @click="openExtensionStore" 
                class="flex items-center gap-3 w-full py-2 px-4 hover:bg-gray-700 text-left">
          <img src="/hyperevm.svg" alt="HyperEVM" class="h-5 w-5">
          <div>
            <div class="text-green-400 font-medium">Get HyperEVM Extension</div>
            <div class="text-xs text-gray-400">Real-Time Gas Tracking</div>
          </div>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

// Browser detection and extension store links
const detectBrowser = (): 'firefox' | 'chrome' => {
  const userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.includes('firefox')) {
    return 'firefox';
  }
  return 'chrome'; // Default to Chrome for all other browsers
};

const openExtensionStore = () => {
  const browser = detectBrowser();
  const extensionUrls = {
    firefox: 'https://addons.mozilla.org/en-US/firefox/addon/hyperevm-real-time-gas/',
    chrome: 'https://chromewebstore.google.com/detail/hyperevm-real-time-gas/lbmelajajgmfmhfplcfhbgjlngmhbplm'
  };
  
  window.open(extensionUrls[browser], '_blank');
};
</script>

<style scoped>
</style>

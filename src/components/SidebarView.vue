<template>
  <!-- Desktop Sidebar -->
  <div class="hidden md:flex fixed left-0 top-0 h-full w-68 bg-gray-800 shadow-2xl flex-col z-40">

    <!-- Sidebar Header -->
    <div class="flex items-center justify-center p-6 border-b border-gray-700">
      <div class="flex items-center gap-3">
        <img src="/favicon.svg" alt="Logo" class="h-8 w-8">
        <span class="bg-gradient-to-r from-purple-400 to-blue-300 text-transparent bg-clip-text text-xl font-bold">LP
          Calculator</span>
      </div>
    </div>

    <!-- Navigation Menu -->
    <div class="flex-1 py-6 overflow-y-auto flex flex-col">
      <NavigationMenu :is-desktop="true" />
    </div>


  </div>
</template>

<script setup lang="ts">
import NavigationMenu from './NavigationMenu.vue';
</script>
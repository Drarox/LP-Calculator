<template>
  <div class="min-h-screen flex">
    <!-- Desktop Sidebar -->
    <SidebarView />
    
    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col md:ml-80">
      <!-- Mobile Header -->
      <HeaderView class="md:hidden" />
      
      <!-- Page Content - Centered -->
      <main class="flex-grow flex items-center justify-center">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderView from './components/HeaderView.vue';
import SidebarView from './components/SidebarView.vue';
</script>

<template>
  <div class="min-h-screen flex flex-col">

    <router-view class="flex-grow"/>


    <footer class="text-center text-gray-500 text-sm p-4">
      <p>&copy; {{ new Date().getFullYear() }} LP Calculator. Created by <a href="https://github.com/Drarox" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:text-blue-300">Drarox</a>.</p>
    </footer>
  </div>
</template>

<script setup>
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <HeaderView />
    <router-view class="flex-grow"/>
    <FooterView />
  </div>
</template>

<script setup lang="ts">
import HeaderView from './components/HeaderView.vue';
import FooterView from './components/FooterView.vue';
</script>

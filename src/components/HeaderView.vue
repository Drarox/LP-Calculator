<template>
  <nav class="text-white p-4 relative">
    <div class="container mx-auto flex justify-between items-center">
      <div class="flex items-center">
        <img src="/favicon.svg" alt="Logo" class="h-8 w-8 mr-2">
        <router-link to="/"
          class="bg-gradient-to-r from-purple-400 to-blue-300 text-transparent bg-clip-text text-xl font-bold">
          LP Calculator
        </router-link>
      </div>

      <!-- Mobile Menu Button -->
      <button @click="toggleMenu" class="focus:outline-none">
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>
    </div>

    <!-- Mobile Menu Overlay -->
    <Transition name="menu-overlay">
      <div v-if="isMenuOpen" class="md:hidden fixed inset-0 z-50" @click="closeMenu">
        <!-- Backdrop -->
        <div class="fixed inset-0 backdrop-custom transition-all duration-300"></div>

        <!-- Menu Panel -->
        <Transition name="menu-slide">
          <div v-if="isMenuOpen"
            class="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-gray-800 shadow-2xl flex flex-col"
            @click.stop>

        <!-- Menu Header -->
        <div class="flex items-center justify-between p-4 border-b border-gray-700 flex-shrink-0">
          <div class="flex items-center gap-2">
            <img src="/favicon.svg" alt="Logo" class="h-6 w-6">
            <span class="bg-gradient-to-r from-purple-400 to-blue-300 text-transparent bg-clip-text font-bold">
              LP Calculator
            </span>
          </div>
          <button @click="closeMenu" class="p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200">
            <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

            <!-- Navigation Menu -->
            <div class="flex-1 py-4">
              <NavigationMenu @navigate="closeMenu" />
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import NavigationMenu from './NavigationMenu.vue';

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};
</script>

<style scoped>
/* Menu overlay fade animation */
.menu-overlay-enter-active,
.menu-overlay-leave-active {
  transition: opacity 0.3s ease;
}

.menu-overlay-enter-from,
.menu-overlay-leave-to {
  opacity: 0;
}

/* Menu slide animation - Right to Left on open, Left to Right on close */
.menu-slide-enter-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.menu-slide-leave-active {
  transition: transform 0.25s cubic-bezier(0.4, 0, 1, 1);
}

/* Opening: slide from right (off-screen) to left (on-screen) */
.menu-slide-enter-from {
  transform: translateX(100%);
}

/* Closing: slide from left (on-screen) to right (off-screen) */
.menu-slide-leave-to {
  transform: translateX(100%);
}

/* Simple backdrop without blur */
.backdrop-custom {
  background: rgba(0, 0, 0, 0.4);
}
</style>

<template>
  <div class="flex items-center justify-center p-4">
    <div class="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-2xl border border-gray-700">
      <h1 class="text-4xl font-bold text-center text-gray-100 mb-6">
        <span class="bg-gradient-to-r from-purple-400 to-blue-300 text-transparent bg-clip-text">Classic Liquidity Calculator</span>
      </h1>
      <p class="text-center text-gray-400 mb-8">
        Calculate your required token amounts for a Classic Liquidity Pool.
      </p>

      <div class="mb-8">
        <!-- Total USD Input -->
        <div class="input-group mb-6">
          <label for="totalUSD" class="block text-sm font-medium text-gray-300 mb-1">Total USD to Deposit</label>
          <input type="number" id="totalUSD" v-model.number="totalUSD" step="any"
                 class="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-700 text-gray-100 transition duration-150 ease-in-out">
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Price Token0 Input -->
          <div class="input-group">
            <label for="priceToken0" class="block text-sm font-medium text-gray-300 mb-1">Price of Token0 (in USD)</label>
            <input type="number" id="priceToken0" v-model.number="priceToken0" step="0.0001"
                   class="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-700 text-gray-100 transition duration-150 ease-in-out">
          </div>

          <!-- Price Token1 Input -->
          <div class="input-group">
            <label for="priceToken1" class="block text-sm font-medium text-gray-300 mb-1">Price of Token1 (in USD)</label>
            <input type="number" id="priceToken1" v-model.number="priceToken1" step="0.0001"
                   class="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-700 text-gray-100 transition duration-150 ease-in-out">
          </div>
        </div>
      </div>

      <!-- Validation Message -->
      <div v-if="totalUSD <= 0 || priceToken0 <= 0 || priceToken1 <= 0"
           class="bg-red-800 border border-red-700 text-red-200 px-4 py-3 rounded-md mb-6" role="alert">
        <p class="font-bold">Input Error:</p>
        <p>All input values must be greater than zero.</p>
      </div>


      <!-- Results Section -->
      <div class="bg-blue-900 p-6 rounded-lg shadow-inner border border-blue-700">
        <h2 class="text-2xl font-semibold text-blue-200 mb-4">Required Token Amounts</h2>
        <div class="flex flex-col sm:flex-row justify-between items-center text-lg font-medium">
          <div class="mb-2 sm:mb-0">
            <span class="text-gray-300">Amount Token0:</span>
            <span class="text-blue-400 font-bold ml-2">{{ calculatedAmounts.amount0 }}</span>
          </div>
          <div>
            <span class="text-gray-300">Amount Token1:</span>
            <span class="text-blue-400 font-bold ml-2">{{ calculatedAmounts.amount1 }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';

// Helper functions for localStorage
const loadFromStorage = (key: string, defaultValue: any) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const saveToStorage = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Silently fail if localStorage is not available
  }
};

// Reactive data properties
const totalUSD = ref<number>(1000);
const priceToken0 = ref<number>(1);
const priceToken1 = ref<number>(1);

// Load saved values on component mount
onMounted(() => {
  totalUSD.value = loadFromStorage('classic-totalUSD', 1000);
  priceToken0.value = loadFromStorage('classic-priceToken0', 1);
  priceToken1.value = loadFromStorage('classic-priceToken1', 1);
});

// Watch for changes and save to localStorage
watch(totalUSD, (newValue) => saveToStorage('classic-totalUSD', newValue));
watch(priceToken0, (newValue) => saveToStorage('classic-priceToken0', newValue));
watch(priceToken1, (newValue) => saveToStorage('classic-priceToken1', newValue));

interface CalculationParams {
  totalUSD: number;
  priceToken0: number;
  priceToken1: number;
}

// V2 calculation logic
const calculateTokenAmounts = ({ totalUSD, priceToken0, priceToken1 }: CalculationParams): { amount0: number; amount1: number } => {
    if (totalUSD <= 0 || priceToken0 <= 0 || priceToken1 <= 0) {
        return { amount0: 0, amount1: 0 };
    }

    const halfUSD = totalUSD / 2;
    const amount0 = halfUSD / priceToken0;
    const amount1 = halfUSD / priceToken1;

    return {
        amount0: Number(amount0.toFixed(6)),
        amount1: Number(amount1.toFixed(6))
    };
};

// Computed property for calculated amounts
const calculatedAmounts = computed(() => {
    return calculateTokenAmounts({
        totalUSD: totalUSD.value,
        priceToken0: priceToken0.value,
        priceToken1: priceToken1.value
    });
});
</script>

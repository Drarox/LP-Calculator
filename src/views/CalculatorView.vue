<template>
  <div class="flex items-center justify-center p-4">
    <div class="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-2xl border border-gray-700">
      <h1 class="text-4xl font-bold text-center text-gray-100 mb-6">
        <span class="bg-gradient-to-r from-purple-400 to-blue-300 text-transparent bg-clip-text">Concentrated Liquidity Calculator</span>
      </h1>
      <p class="text-center text-gray-400 mb-8">
        Calculate your required token amounts for a Concentrated Liquidity Pool.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <!-- Total USD Input -->
        <div class="input-group">
          <label for="totalUSD" class="block text-sm font-medium text-gray-300 mb-1">Total USD to Deposit</label>
          <input type="number" id="totalUSD" v-model.number="totalUSD" step="any"
                 class="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-700 text-gray-100 transition duration-150 ease-in-out">
        </div>

        <!-- Current Price Input -->
        <div class="input-group">
          <label for="P_current" class="block text-sm font-medium text-gray-300 mb-1">Current Price (Token1 per Token0)</label>
          <input type="number" id="P_current" v-model.number="P_current" step="any"
                 class="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-700 text-gray-100 transition duration-150 ease-in-out">
        </div>

        <!-- Lower Price Input -->
        <div class="input-group">
          <label for="P_lower" class="block text-sm font-medium text-gray-300 mb-1">Lower Price Bound</label>
          <input type="number" id="P_lower" v-model.number="P_lower" step="any"
                 class="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-700 text-gray-100 transition duration-150 ease-in-out">
          <p v-if="lowerDiffPercentage !== null"
             :class="{'text-green-400': lowerDiffPercentage >= 0, 'text-red-400': lowerDiffPercentage < 0}"
             class="text-xs mt-1">
            {{ lowerDiffPercentage.toFixed(2) }}% from current price
          </p>
        </div>

        <!-- Upper Price Input -->
        <div class="input-group">
          <label for="P_upper" class="block text-sm font-medium text-gray-300 mb-1">Upper Price Bound</label>
          <input type="number" id="P_upper" v-model.number="P_upper" step="any"
                 class="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-700 text-gray-100 transition duration-150 ease-in-out">
          <p v-if="upperDiffPercentage !== null"
             :class="{'text-green-400': upperDiffPercentage >= 0, 'text-red-400': upperDiffPercentage < 0}"
             class="text-xs mt-1">
            {{ upperDiffPercentage.toFixed(2) }}% from current price
          </p>
        </div>

        <!-- Price Token0 Input -->
        <div class="input-group">
          <label for="priceToken0" class="block text-sm font-medium text-gray-300 mb-1">Price of Token0 (in USD)</label>
          <input type="number" id="priceToken0" v-model.number="priceToken0" step="any"
                 class="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-700 text-gray-100 transition duration-150 ease-in-out">
        </div>

        <!-- Price Token1 Input -->
        <div class="input-group">
          <label for="priceToken1" class="block text-sm font-medium text-gray-300 mb-1">Price of Token1 (in USD)</label>
          <input type="number" id="priceToken1" v-model.number="priceToken1" step="any"
                 class="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-700 text-gray-100 transition duration-150 ease-in-out">
        </div>
      </div>

      <!-- Validation Message -->
      <div v-if="P_lower >= P_upper" class="bg-red-800 border border-red-700 text-red-200 px-4 py-3 rounded-md mb-6" role="alert">
        <p class="font-bold">Input Error:</p>
        <p>The lower price bound must be less than the upper price bound.</p>
      </div>
      <div v-if="P_current <= 0 || P_lower <= 0 || P_upper <= 0 || totalUSD <= 0 || priceToken0 <= 0 || priceToken1 <= 0"
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
import { ref, computed } from 'vue';

// Reactive data properties
const P_current = ref<number>(1.00107);
const P_lower = ref<number>(1);
const P_upper = ref<number>(1.0012);
const totalUSD = ref<number>(1000);
const priceToken0 = ref<number>(1);
const priceToken1 = ref<number>(1);

interface CalculationParams {
  P_current: number;
  P_lower: number;
  P_upper: number;
  totalUSD: number;
  priceToken0: number;
  priceToken1: number;
}

// Original calculation logic
const calculateTokenAmounts = ({ P_current, P_lower, P_upper, totalUSD, priceToken0, priceToken1 }: CalculationParams): { amount0: number; amount1: number } => {
    if (P_current <= 0 || P_lower <= 0 || P_upper <= 0 || totalUSD <= 0 || priceToken0 <= 0 || priceToken1 <= 0) {
        return { amount0: 0, amount1: 0 };
    }
    if (P_lower >= P_upper) {
        return { amount0: 0, amount1: 0 };
    }

    const sqrtP = Math.sqrt(P_current);
    const sqrtPl = Math.sqrt(P_lower);
    const sqrtPu = Math.sqrt(P_upper);

    let amount0 = 0;
    let amount1 = 0;

    if (P_current <= P_lower) {
        amount0 = totalUSD / priceToken0;
        amount1 = 0;
    } else if (P_current >= P_upper) {
        amount0 = 0;
        amount1 = totalUSD / priceToken1;
    } else {
        const numerator0 = (sqrtPu - sqrtP);
        const denominator0 = sqrtP * sqrtPu;
        const ratio0 = numerator0 / denominator0;
        const ratio1 = sqrtP - sqrtPl;
        const totalRatio = (ratio0 * priceToken0) + (ratio1 * priceToken1);
        if (totalRatio === 0) {
            return { amount0: 0, amount1: 0 };
        }
        const value0 = (ratio0 * priceToken0 / totalRatio) * totalUSD;
        const value1 = totalUSD - value0;
        amount0 = value0 / priceToken0;
        amount1 = value1 / priceToken1;
    }

    return {
        amount0: Number(amount0.toFixed(6)),
        amount1: Number(amount1.toFixed(6))
    };
};

// Computed property for calculated amounts
const calculatedAmounts = computed(() => {
    return calculateTokenAmounts({
        P_current: P_current.value,
        P_lower: P_lower.value,
        P_upper: P_upper.value,
        totalUSD: totalUSD.value,
        priceToken0: priceToken0.value,
        priceToken1: priceToken1.value
    });
});

// Computed property for lower price difference percentage
const lowerDiffPercentage = computed<number | null>(() => {
    if (P_current.value === null || P_current.value === 0 || P_lower.value === null) {
        return null;
    }
    return ((P_lower.value - P_current.value) / P_current.value) * 100;
});

// Computed property for upper price difference percentage
const upperDiffPercentage = computed<number | null>(() => {
    if (P_current.value === null || P_current.value === 0 || P_upper.value === null) {
        return null;
    }
    return ((P_upper.value - P_current.value) / P_current.value) * 100;
});
</script>
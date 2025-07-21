<template>
  <div class="flex items-center justify-center p-4">
    <div class="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-2xl border border-gray-700">
      <h1 class="text-4xl font-bold text-center text-gray-100 mb-6">
        <span class="bg-gradient-to-r from-purple-400 to-blue-300 text-transparent bg-clip-text">APR Calculator</span>
      </h1>
      <p class="text-center text-gray-400 mb-8">
        Calculate your Annual Percentage Rate (APR) based on initial investment, fees collected, and time period.
      </p>

      <div class="mb-8">
        <!-- Initial Amount Input -->
        <div class="input-group mb-6">
          <label for="initialAmount" class="block text-sm font-medium text-gray-300 mb-1">Initial Investment Amount
            ($)</label>
          <input type="number" id="initialAmount" v-model.number="formData.initialAmount" step="any"
            class="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-700 text-gray-100 transition duration-150 ease-in-out">
        </div>

        <!-- Fees Collected Input -->
        <div class="input-group mb-6">
          <label for="feesCollected" class="block text-sm font-medium text-gray-300 mb-1">Total Fees Collected
            ($)</label>
          <input type="number" id="feesCollected" v-model.number="formData.feesCollected" step="any"
            class="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-700 text-gray-100 transition duration-150 ease-in-out">
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Start Date Input -->
          <div class="input-group">
            <label for="startDate" class="block text-sm font-medium text-gray-300 mb-1">Start Date</label>
            <input type="date" id="startDate" v-model="formData.startDate"
              class="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-700 text-gray-100 transition duration-150 ease-in-out">
          </div>

          <!-- End Date Input -->
          <div class="input-group">
            <label for="endDate" class="block text-sm font-medium text-gray-300 mb-1">End Date</label>
            <input type="date" id="endDate" v-model="formData.endDate"
              class="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-700 text-gray-100 transition duration-150 ease-in-out">
          </div>
        </div>

        <!-- Time Period Display -->
        <div v-if="daysBetween > 0" class="mt-4 text-center">
          <span class="text-gray-300">Investment Period: </span>
          <span class="text-blue-400 font-semibold">{{ daysBetween }} days</span>
          <span class="text-gray-400 ml-2">({{ (daysBetween / 365).toFixed(2) }} years)</span>
        </div>
      </div>

      <!-- Validation Messages -->
      <div v-if="validationError" class="bg-red-800 border border-red-700 text-red-200 px-4 py-3 rounded-md mb-6"
        role="alert">
        <p class="font-bold">Input Error:</p>
        <p>{{ validationError }}</p>
      </div>

      <!-- Results Section -->
      <div class="bg-blue-900 p-6 rounded-lg shadow-inner border border-blue-700">
        <h2 class="text-2xl font-semibold text-blue-200 mb-4">APR Results</h2>

        <div class="space-y-4">
          <!-- APR Display -->
          <div class="flex justify-between items-center text-lg font-medium">
            <span class="text-gray-300">Annual Percentage Rate (APR):</span>
            <span class="text-blue-400 font-bold text-2xl">{{ calculatedResults.apr }}%</span>
          </div>

          <!-- Additional Metrics -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-400">Total Return:</span>
              <span class="text-green-400 font-semibold">${{ calculatedResults.totalReturn }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-400">Return Percentage:</span>
              <span class="text-green-400 font-semibold">{{ calculatedResults.returnPercentage }}%</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-400">Daily Rate:</span>
              <span class="text-blue-300 font-semibold">{{ calculatedResults.dailyRate }}%</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-400">Monthly Rate:</span>
              <span class="text-blue-300 font-semibold">{{ calculatedResults.monthlyRate }}%</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Info Section -->
      <div class="mt-6 bg-gray-700 p-4 rounded-lg border border-gray-600">
        <h3 class="text-lg font-semibold text-gray-200 mb-2">How APR is Calculated</h3>
        <p class="text-gray-400 text-sm">
          APR = (Total Fees / Initial Investment) × (365 / Days) × 100
        </p>
        <p class="text-gray-400 text-sm mt-2">
          This calculation uses simple interest to annualize your liquidity pool returns, which is appropriate since
          fees are collected but not automatically reinvested.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useFormPersistence } from '@/composables/useFormPersistence';
import { useAprCalculations } from '@/composables/useAprCalculations';
import { calculateDaysBetween } from '@/utils/datetime';

// Form data with persistence
const { formData } = useFormPersistence('apr-form', {
  initialAmount: 1000,
  feesCollected: 50,
  startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  endDate: new Date().toISOString().split('T')[0]
});

// APR calculations composable
const { calculateAPR, formatAPRValue } = useAprCalculations();

// Computed property for days between dates
const daysBetween = computed(() => {
  if (!formData.value.startDate || !formData.value.endDate) return 0;
  return calculateDaysBetween(formData.value.startDate, formData.value.endDate);
});

// Validation error computed property
const validationError = computed(() => {
  if (formData.value.initialAmount <= 0) {
    return 'Initial investment amount must be greater than zero.';
  }
  if (formData.value.feesCollected < 0) {
    return 'Fees collected cannot be negative.';
  }
  if (!formData.value.startDate || !formData.value.endDate) {
    return 'Both start and end dates must be provided.';
  }
  if (daysBetween.value <= 0) {
    return 'End date must be after start date.';
  }
  return null;
});

// Computed property for calculated results using the composable
const calculatedResults = computed(() => {
  if (validationError.value || daysBetween.value === 0) {
    return {
      apr: '0.00',
      totalReturn: '0.00',
      returnPercentage: '0.00',
      dailyRate: '0.00',
      monthlyRate: '0.00'
    };
  }

  const results = calculateAPR({
    initialAmount: formData.value.initialAmount,
    totalFees: formData.value.feesCollected,
    startDate: formData.value.startDate,
    endDate: formData.value.endDate
  });

  return {
    apr: formatAPRValue(results.apr),
    totalReturn: formatAPRValue(results.totalReturn),
    returnPercentage: formatAPRValue(results.returnPercentage),
    dailyRate: formatAPRValue(results.dailyRate, 4),
    monthlyRate: formatAPRValue(results.monthlyRate)
  };
});
</script>
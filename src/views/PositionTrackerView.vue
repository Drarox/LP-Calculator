<template>
  <div class="flex items-center justify-center p-4">
    <div class="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-4xl border border-gray-700">
      <h1 class="text-4xl font-bold text-center text-gray-100 mb-6">
        <span class="bg-gradient-to-r from-purple-400 to-blue-300 text-transparent bg-clip-text">LP Position
          Tracker</span>
      </h1>
      <p class="text-center text-gray-400 mb-8">
        Track your liquidity pool positions and monitor their APR performance over time.
      </p>

      <!-- Global Stats -->
      <div v-if="positions.length > 0" class="bg-gray-700 p-4 rounded-lg border border-gray-600 mb-6">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <h3 class="text-xl font-semibold text-gray-200 mb-2 sm:mb-0">Global Performance</h3>
          <div class="flex items-center gap-2">
            <label class="text-sm text-gray-300">Filter:</label>
            <select v-model="globalStatsFilter"
              class="px-3 py-1 border border-gray-600 rounded-md bg-gray-800 text-gray-100 text-sm focus:ring-blue-500 focus:border-blue-500">
              <option value="all">All Pairs</option>
              <option value="stable">Stable Only</option>
              <option value="volatile">Volatile Only</option>
            </select>
          </div>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm text-center">
          <div class="bg-gray-800 p-3 rounded">
            <div class="text-gray-400">Currently Invested</div>
            <div class="text-green-400 font-semibold">${{ globalStats.currentlyInvested.toFixed(2) }}</div>
          </div>
          <div class="bg-gray-800 p-3 rounded">
            <div class="text-gray-400">Total Fees</div>
            <div class="text-green-400 font-semibold">${{ globalStats.totalFees.toFixed(2) }}</div>
          </div>
          <div class="bg-gray-800 p-3 rounded">
            <div class="text-gray-400">Total Return</div>
            <div class="text-green-400 font-semibold">{{ globalStats.totalReturn.toFixed(2) }}%</div>
          </div>
          <div class="bg-gray-800 p-3 rounded">
            <div class="text-gray-400">Avg. APR</div>
            <div class="text-blue-400 font-semibold">{{ globalStats.averageApr.toFixed(2) }}%</div>
          </div>
          <div class="bg-gray-800 p-3 rounded">
            <div class="text-gray-400">Avg. Days Active</div>
            <div class="text-blue-400 font-semibold">{{ globalStats.averageDaysActive.toFixed(2) }}</div>
          </div>
        </div>
      </div>

      <!-- Header Actions -->
      <div class="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div class="flex flex-wrap gap-2">
          <button @click="exportData" title="Export Backup"
            class="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition duration-150 ease-in-out flex items-center gap-2 cursor-pointer">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
              </path>
            </svg>
            Export
          </button>

          <button @click="triggerFileInput" title="Import Backup"
            class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition duration-150 ease-in-out flex items-center gap-2 cursor-pointer">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
            </svg>
            Import
          </button>
          <input type="file" ref="fileInput" @change="importData" accept=".json" class="hidden">
        </div>

        <button @click="openAddForm"
          class="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition duration-150 ease-in-out flex items-center gap-2 cursor-pointer">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Add Position
        </button>
      </div>

      <!-- Add Position Form -->
      <div v-if="showAddForm" class="bg-gray-700 p-6 rounded-lg border border-gray-600 mb-6">
        <h3 class="text-xl font-semibold text-gray-200 mb-4">Add New LP Position</h3>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1">Position Name</label>
            <input type="text" v-model="newPosition.name" placeholder="e.g. USDC/USDT on Uniswap"
              class="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-800 text-gray-100 focus:ring-blue-500 focus:border-blue-500">
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1">Initial Investment ($)</label>
            <input type="number" v-model.number="newPosition.initialAmount" step="any"
              class="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-800 text-gray-100 focus:ring-blue-500 focus:border-blue-500">
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1">Pair Type</label>
            <select v-model="newPosition.pairType"
              class="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-800 text-gray-100 focus:ring-blue-500 focus:border-blue-500">
              <option value="stable">Stable</option>
              <option value="volatile">Volatile</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1">Opening Date & Time</label>
            <input type="datetime-local" v-model="newPosition.openingDate"
              class="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-800 text-gray-100 focus:ring-blue-500 focus:border-blue-500">
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1">External Link (Optional)</label>
            <input type="url" v-model="newPosition.externalLink" placeholder="https://..."
              class="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-800 text-gray-100 focus:ring-blue-500 focus:border-blue-500">
          </div>
        </div>

        <div class="flex gap-3">
          <button @click="addPosition" :disabled="!newPosition.name || !newPosition.initialAmount"
            class="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition duration-150 ease-in-out cursor-pointer">
            Create Position
          </button>
          <button @click="cancelAddForm"
            class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition duration-150 ease-in-out cursor-pointer">
            Cancel
          </button>
        </div>
      </div>

      <!-- Positions List -->
      <div v-if="positions.length === 0 && !showAddForm" class="text-center text-gray-400 py-12">
        <p class="text-lg mb-4">No LP positions tracked yet</p>
        <p>Click "Add New Position" to start tracking your liquidity pool performance</p>
      </div>

      <!-- Active Positions Section -->
      <div v-if="activePositions.length > 0" class="mb-8">
        <h2 class="text-2xl font-semibold text-gray-200 mb-4 flex items-center">
          <span class="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
          Active Positions ({{ activePositions.length }})
        </h2>
        <div class="space-y-4">
          <div v-for="position in activePositions" :key="position.id"
            class="bg-gray-700 rounded-lg border border-gray-600 overflow-hidden">

            <!-- Position Header -->
            <div class="p-4">
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 class="text-lg font-semibold text-gray-200 truncate">{{ position.name }}</h3>
                    <span :class="[
                      'px-2 py-1 text-xs rounded-full flex-shrink-0',
                      position.pairType === 'stable' ? 'bg-blue-600 text-blue-100' : 'bg-yellow-600 text-yellow-100'
                    ]">{{ position.pairType === 'stable' ? 'Stable' : 'Volatile' }}</span>
                    <span class="px-2 py-1 bg-green-600 text-green-100 text-xs rounded-full flex-shrink-0">Active</span>

                    <!-- Fee Entry Notification -->
                    <div v-if="needsFeeEntryForToday(position)" title="Fee entry for today is pending"
                      class="flex items-center flex-shrink-0">
                      <svg class="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                  </div>
                  <p class="text-sm text-gray-400">Initial: ${{ position.initialAmount.toFixed(2) }} • Opened: {{
                    formatDate(position.openingDate) }}</p>
                </div>

                <div class="flex items-center justify-between sm:justify-end gap-2 flex-shrink-0">
                  <!-- APR Stats -->
                  <div class="text-left sm:text-right">
                    <div class="text-lg font-bold text-blue-400">{{ getPositionAPR(position) }}%</div>
                    <div class="text-xs text-gray-400">Current APR</div>
                  </div>

                  <!-- Action Buttons with Icons -->
                  <div class="flex items-center gap-1 flex-shrink-0">

                    <!-- Delete Button -->
                    <button @click="deletePosition(position.id)" title="Delete Position"
                      class="bg-red-600 hover:bg-red-700 text-white p-2 rounded transition duration-150 ease-in-out">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                        </path>
                      </svg>
                    </button>

                    <!-- Close Position Button -->
                    <button @click="closePosition(position.id)" title="Close Position"
                      class="bg-orange-600 hover:bg-orange-700 text-white p-2 rounded transition duration-150 ease-in-out cursor-pointer">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </button>

                    <!-- External Link Button -->
                    <button v-if="position.externalLink" @click="openExternalLink(position.externalLink)"
                      title="Open External Link"
                      class="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded transition duration-150 ease-in-out">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                      </svg>
                    </button>

                    <!-- Expand/Collapse Button -->
                    <button @click="togglePosition(position.id)"
                      :title="expandedPositions.has(position.id) ? 'Collapse Details' : 'Expand Details'"
                      class="bg-gray-600 hover:bg-gray-500 text-white p-2 rounded transition duration-150 ease-in-out">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path v-if="!expandedPositions.has(position.id)" stroke-linecap="round" stroke-linejoin="round"
                          stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7">
                        </path>
                      </svg>
                    </button>

                  </div>
                </div>
              </div>
            </div>

            <!-- Expanded Content for Active Positions -->
            <div v-if="expandedPositions.has(position.id)" class="border-t border-gray-600 p-4">

              <!-- Add Fee Entry Form -->
              <div class="bg-gray-800 p-4 rounded-lg mb-4">
                <h4 class="text-md font-semibold text-gray-200 mb-3">Add Fee Collection</h4>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-300 mb-1">Fees Collected ($)</label>
                    <input type="number" v-model.number="newFeeEntry[position.id].amount" step="any"
                      class="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-gray-100 focus:ring-blue-500 focus:border-blue-500">
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-300 mb-1">Collection Date</label>
                    <input type="datetime-local" v-model="newFeeEntry[position.id].datetime"
                      class="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-gray-100 focus:ring-blue-500 focus:border-blue-500">
                  </div>

                  <div class="flex items-end">
                    <button @click="addFeeEntry(position.id)" :disabled="!newFeeEntry[position.id]?.amount"
                      class="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition duration-150 ease-in-out">
                      Add Entry
                    </button>
                  </div>
                </div>
              </div>

              <!-- Fee Entries List -->
              <div class="space-y-2">
                <h4 class="text-md font-semibold text-gray-200 mb-2">Fee Collection History</h4>

                <div v-if="position.feeEntries.length === 0" class="text-gray-400 text-sm">
                  No fee collections recorded yet
                </div>

                <div v-else class="space-y-2 max-h-60 overflow-y-auto">
                  <div v-for="(entry, index) in position.feeEntries.slice().reverse()" :key="index"
                    class="bg-gray-800 p-3 rounded flex justify-between items-center">
                    <div>
                      <span class="text-green-400 font-semibold">${{ entry.amount.toFixed(2) }}</span>
                      <span class="text-gray-400 text-sm ml-2">{{ formatDate(entry.datetime) }}</span>
                    </div>
                    <button @click="deleteFeeEntry(position.id, position.feeEntries.length - 1 - index)"
                      title="Delete Entry"
                      class="bg-red-600 hover:bg-red-700 text-white p-1 rounded transition duration-150 ease-in-out">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                        </path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Position Stats -->
              <div class="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div class="bg-gray-800 p-3 rounded">
                  <div class="text-gray-400">Total Fees</div>
                  <div class="text-green-400 font-semibold">${{ getTotalFees(position).toFixed(2) }}</div>
                </div>
                <div class="bg-gray-800 p-3 rounded">
                  <div class="text-gray-400">Total Return</div>
                  <div class="text-green-400 font-semibold">{{ getTotalReturnPercentage(position).toFixed(2) }}%</div>
                </div>
                <div class="bg-gray-800 p-3 rounded">
                  <div class="text-gray-400">Days Active</div>
                  <div class="text-blue-400 font-semibold">{{ formatDaysActive(position) }}</div>
                </div>
                <div class="bg-gray-800 p-3 rounded">
                  <div class="text-gray-400">Avg Daily</div>
                  <div class="text-blue-400 font-semibold">${{ getAverageDailyFees(position).toFixed(2) }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Closed Positions Section -->
      <div v-if="closedPositions.length > 0">
        <h2 class="text-2xl font-semibold text-gray-200 mb-4 flex items-center">
          <span class="w-3 h-3 bg-gray-500 rounded-full mr-2"></span>
          Position History ({{ closedPositions.length }})
        </h2>
        <div class="space-y-4">
          <div v-for="position in closedPositions" :key="position.id"
            class="bg-gray-700 rounded-lg border border-gray-600 overflow-hidden opacity-75">

            <!-- Position Header -->
            <div class="p-4">
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 class="text-lg font-semibold text-gray-200 truncate">{{ position.name }}</h3>
                    <span :class="[
                      'px-2 py-1 text-xs rounded-full flex-shrink-0',
                      position.pairType === 'stable' ? 'bg-blue-600 text-blue-100' : 'bg-yellow-600 text-yellow-100'
                    ]">{{ position.pairType === 'stable' ? 'Stable' : 'Volatile' }}</span>
                    <span class="px-2 py-1 bg-gray-600 text-gray-300 text-xs rounded-full flex-shrink-0">Closed</span>
                  </div>
                  <p class="text-sm text-gray-400">
                    Initial: ${{ position.initialAmount.toFixed(2) }} •
                    {{ formatDate(position.openingDate) }} - {{ formatDate(position.closingDate!) }}
                  </p>
                </div>

                <div class="flex items-center justify-between sm:justify-end gap-2 flex-shrink-0">
                  <!-- Final APR Stats -->
                  <div class="text-left sm:text-right">
                    <div class="text-lg font-bold text-gray-400">{{ getPositionAPR(position) }}%</div>
                    <div class="text-xs text-gray-400">Final APR</div>
                  </div>

                  <!-- Action Buttons -->
                  <div class="flex items-center gap-1 flex-shrink-0">
                    <!-- External Link Button -->
                    <button v-if="position.externalLink" @click="openExternalLink(position.externalLink)"
                      title="Open External Link"
                      class="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded transition duration-150 ease-in-out">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                      </svg>
                    </button>

                    <!-- Delete Button -->
                    <button @click="deletePosition(position.id)" title="Delete Position"
                      class="bg-red-600 hover:bg-red-700 text-white p-2 rounded transition duration-150 ease-in-out">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                        </path>
                      </svg>
                    </button>

                    <!-- Reopen Position Button -->
                    <button @click="reopenPosition(position.id)" title="Reopen Position"
                      class="bg-green-600 hover:bg-green-700 text-white p-2 rounded transition duration-150 ease-in-out">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15">
                        </path>
                      </svg>
                    </button>

                    <!-- Expand/Collapse Button -->
                    <button @click="togglePosition(position.id)"
                      :title="expandedPositions.has(position.id) ? 'Collapse Details' : 'Expand Details'"
                      class="bg-gray-600 hover:bg-gray-500 text-white p-2 rounded transition duration-150 ease-in-out">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path v-if="!expandedPositions.has(position.id)" stroke-linecap="round" stroke-linejoin="round"
                          stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7">
                        </path>
                      </svg>
                    </button>

                  </div>
                </div>
              </div>
            </div>

            <!-- Expanded Content for Closed Positions (Read-only) -->
            <div v-if="expandedPositions.has(position.id)" class="border-t border-gray-600 p-4">

              <!-- Fee Entries List (Read-only) -->
              <div class="space-y-2">
                <h4 class="text-md font-semibold text-gray-200 mb-2">Fee Collection History (Final)</h4>

                <div v-if="position.feeEntries.length === 0" class="text-gray-400 text-sm">
                  No fee collections were recorded
                </div>

                <div v-else class="space-y-2 max-h-60 overflow-y-auto">
                  <div v-for="(entry, index) in position.feeEntries.slice().reverse()" :key="index"
                    class="bg-gray-800 p-3 rounded flex justify-between items-center">
                    <div>
                      <span class="text-green-400 font-semibold">${{ entry.amount.toFixed(2) }}</span>
                      <span class="text-gray-400 text-sm ml-2">{{ formatDate(entry.datetime) }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Final Position Stats -->
              <div class="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div class="bg-gray-800 p-3 rounded">
                  <div class="text-gray-400">Total Fees</div>
                  <div class="text-green-400 font-semibold">${{ getTotalFees(position).toFixed(2) }}</div>
                </div>
                <div class="bg-gray-800 p-3 rounded">
                  <div class="text-gray-400">Total Return</div>
                  <div class="text-green-400 font-semibold">{{ getTotalReturnPercentage(position).toFixed(2) }}%</div>
                </div>
                <div class="bg-gray-800 p-3 rounded">
                  <div class="text-gray-400">Days Active</div>
                  <div class="text-blue-400 font-semibold">{{ formatDaysActive(position) }}</div>
                </div>
                <div class="bg-gray-800 p-3 rounded">
                  <div class="text-gray-400">Avg Daily</div>
                  <div class="text-blue-400 font-semibold">${{ getAverageDailyFees(position).toFixed(2) }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch, computed } from 'vue';
import { loadFromStorage, saveToStorage } from '@/utils/storage';
import { getLocalDateTimeString, formatDateTime } from '@/utils/datetime';
import { useAprCalculations } from '@/composables/useAprCalculations';

interface FeeEntry {
  amount: number;
  datetime: string;
}

interface Position {
  id: string;
  name: string;
  initialAmount: number;
  pairType: 'stable' | 'volatile';
  externalLink?: string;
  createdAt: string;
  openingDate: string;
  closingDate?: string;
  status: 'active' | 'closed';
  feeEntries: FeeEntry[];
}

// Reactive state
const positions = ref<Position[]>([]);
const showAddForm = ref(false);
const expandedPositions = ref(new Set<string>());
const newFeeEntry = reactive<Record<string, { amount: number | null; datetime: string }>>({});
const fileInput = ref<HTMLInputElement>();
const globalStatsFilter = ref<'all' | 'stable' | 'volatile'>('all');

const newPosition = reactive({
  name: '',
  initialAmount: null as number | null,
  pairType: 'stable' as 'stable' | 'volatile',
  externalLink: '',
  openingDate: getLocalDateTimeString()
});

// APR calculations composable
const { calculateAPR, formatAPRValue } = useAprCalculations();

// Helper functions for localStorage
const loadPositions = (): Position[] => {
  return loadFromStorage('lp-positions', []);
};

const savePositions = () => {
  saveToStorage('lp-positions', positions.value);
};

// Initialize new fee entry for a position
const initializeFeeEntry = (positionId: string) => {
  if (!newFeeEntry[positionId]) {
    newFeeEntry[positionId] = {
      amount: null,
      datetime: getLocalDateTimeString()
    };
  } else {
    // Always refresh the datetime when initializing
    newFeeEntry[positionId].datetime = getLocalDateTimeString();
  }
};

// Position management functions
const addPosition = () => {
  if (!newPosition.name || !newPosition.initialAmount) return;

  const position: Position = {
    id: Date.now().toString(),
    name: newPosition.name,
    initialAmount: newPosition.initialAmount,
    pairType: newPosition.pairType,
    externalLink: newPosition.externalLink || undefined,
    createdAt: new Date().toISOString(),
    openingDate: newPosition.openingDate,
    status: 'active',
    feeEntries: []
  };

  positions.value.push(position);
  initializeFeeEntry(position.id);
  cancelAddForm();
};

const closePosition = (positionId: string) => {
  if (confirm('Are you sure you want to close this position? This will freeze all calculations.')) {
    const position = positions.value.find(p => p.id === positionId);
    if (position) {
      position.status = 'closed';
      position.closingDate = new Date().toISOString();
    }
  }
};

const reopenPosition = (positionId: string) => {
  const position = positions.value.find(p => p.id === positionId);
  if (position) {
    position.status = 'active';
    position.closingDate = undefined;
  }
};

const deletePosition = (positionId: string) => {
  if (confirm('Are you sure you want to delete this position? This action cannot be undone.')) {
    positions.value = positions.value.filter(p => p.id !== positionId);
    delete newFeeEntry[positionId];
    expandedPositions.value.delete(positionId);
  }
};

const openAddForm = () => {
  showAddForm.value = true;
  // Refresh the opening date to current time when form is opened
  newPosition.openingDate = getLocalDateTimeString();
};

const cancelAddForm = () => {
  showAddForm.value = false;
  newPosition.name = '';
  newPosition.initialAmount = null;
  newPosition.pairType = 'stable';
  newPosition.externalLink = '';
  newPosition.openingDate = getLocalDateTimeString();
};

// Fee entry management
const addFeeEntry = (positionId: string) => {
  const entry = newFeeEntry[positionId];
  if (!entry?.amount) return;

  const position = positions.value.find(p => p.id === positionId);
  if (!position) return;

  position.feeEntries.push({
    amount: entry.amount,
    datetime: entry.datetime
  });

  // Reset form
  newFeeEntry[positionId] = {
    amount: null,
    datetime: getLocalDateTimeString()
  };
};

const deleteFeeEntry = (positionId: string, entryIndex: number) => {
  const position = positions.value.find(p => p.id === positionId);
  if (position) {
    position.feeEntries.splice(entryIndex, 1);
  }
};

// UI functions
const togglePosition = (positionId: string) => {
  if (expandedPositions.value.has(positionId)) {
    expandedPositions.value.delete(positionId);
  } else {
    expandedPositions.value.add(positionId);
    initializeFeeEntry(positionId);
  }
};

const openExternalLink = (url: string) => {
  window.open(url, '_blank');
};

const formatDate = formatDateTime;

const needsFeeEntryForToday = (position: Position): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const openingDate = new Date(position.openingDate);
  openingDate.setHours(0, 0, 0, 0);

  // Don't show for positions created today
  if (openingDate.getTime() >= today.getTime()) {
    return false;
  }

  if (position.feeEntries.length === 0) {
    return true; // Needs an entry if not opened today and has no entries
  }

  const lastFeeEntryDate = new Date(position.feeEntries[position.feeEntries.length - 1].datetime);
  lastFeeEntryDate.setHours(0, 0, 0, 0);

  // Return true if the last fee entry was before today
  return lastFeeEntryDate.getTime() < today.getTime();
};

const getPositionAPRNumeric = (position: Position): number => {
  if (position.feeEntries.length === 0) return 0;

  const endDate = position.status === 'closed' && position.closingDate
    ? position.closingDate
    : position.feeEntries.length > 0
      ? position.feeEntries[position.feeEntries.length - 1].datetime
      : new Date().toISOString();

  const results = calculateAPR({
    initialAmount: position.initialAmount,
    totalFees: getTotalFees(position),
    startDate: position.openingDate,
    endDate: endDate
  });

  return results.apr;
};

// Calculation functions
const getTotalFees = (position: Position): number => {
  return position.feeEntries.reduce((sum, entry) => sum + entry.amount, 0);
};

const getTotalReturnPercentage = (position: Position): number => {
  const totalFees = getTotalFees(position);
  return (totalFees / position.initialAmount) * 100;
};

const getDaysActive = (position: Position): number => {
  const endDate = position.status === 'closed' && position.closingDate
    ? position.closingDate
    : position.feeEntries.length > 0
      ? position.feeEntries[position.feeEntries.length - 1].datetime
      : new Date().toISOString();

  return calculateAPR({
    initialAmount: position.initialAmount,
    totalFees: getTotalFees(position),
    startDate: position.openingDate,
    endDate: endDate
  }).daysActive;
};

const formatDaysActive = (position: Position): string => {
  return getDaysActive(position).toFixed(2);
};

const getAverageDailyFees = (position: Position): number => {
  const totalFees = getTotalFees(position);
  const daysActive = getDaysActive(position);
  return daysActive > 0 ? totalFees / daysActive : 0;
};

const getPositionAPR = (position: Position): string => {
  if (position.feeEntries.length === 0) return '0.00';

  const endDate = position.status === 'closed' && position.closingDate
    ? position.closingDate
    : position.feeEntries.length > 0
      ? position.feeEntries[position.feeEntries.length - 1].datetime
      : new Date().toISOString();

  const results = calculateAPR({
    initialAmount: position.initialAmount,
    totalFees: getTotalFees(position),
    startDate: position.openingDate,
    endDate: endDate
  });

  return formatAPRValue(results.apr);
};

// Computed properties for sorting positions
const activePositions = computed(() => {
  return positions.value
    .filter(p => p.status === 'active')
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
});

const closedPositions = computed(() => {
  return positions.value
    .filter(p => p.status === 'closed')
    .sort((a, b) => new Date(b.closingDate || b.createdAt).getTime() - new Date(a.closingDate || a.createdAt).getTime());
});

// Computed properties for global stats
const globalStats = computed(() => {
  let allPositions = positions.value;
  
  // Apply filter based on pair type
  if (globalStatsFilter.value !== 'all') {
    allPositions = allPositions.filter(p => p.pairType === globalStatsFilter.value);
  }
  
  if (allPositions.length === 0) {
    return {
      totalFees: 0,
      totalReturn: 0,
      averageDaysActive: 0,
      currentlyInvested: 0,
      averageApr: 0,
    };
  }

  const activePositionsOnly = allPositions.filter(p => p.status === 'active');
  const closedPositionsOnly = allPositions.filter(p => p.status === 'closed');

  const currentlyInvested = activePositionsOnly.reduce((sum, p) => sum + p.initialAmount, 0);
  const totalInvestmentInClosed = closedPositionsOnly.reduce((sum, p) => sum + p.initialAmount, 0);

  const totalFees = allPositions.reduce((sum, p) => sum + getTotalFees(p), 0);
  const totalDaysActive = allPositions.reduce((sum, p) => sum + getDaysActive(p), 0);
  const totalApr = allPositions.reduce((sum, p) => sum + getPositionAPRNumeric(p), 0);

  const averageDaysActive = allPositions.length > 0 ? totalDaysActive / allPositions.length : 0;

  const returnDenominator = currentlyInvested > 0 ? currentlyInvested : totalInvestmentInClosed;
  const totalReturn = returnDenominator > 0 ? (totalFees / returnDenominator) * 100 : 0;

  const averageApr = allPositions.length > 0 ? totalApr / allPositions.length : 0;

  return {
    totalFees,
    totalReturn,
    averageDaysActive,
    currentlyInvested,
    averageApr,
  };
});

// Lifecycle
onMounted(() => {
  positions.value = loadPositions();
  
  // Migration: Add pairType to existing positions that don't have it
  positions.value.forEach(position => {
    if (!position.pairType) {
      position.pairType = 'stable'; // Default to stable for existing positions
    }
    initializeFeeEntry(position.id);
  });
  
  // Save positions after migration
  savePositions();
});

// Export/Import functions
const exportData = () => {
  try {
    const dataToExport = {
      positions: positions.value,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };

    const dataStr = JSON.stringify(dataToExport, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `lp-positions-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    alert('Backup exported successfully!');
  } catch (error) {
    alert('Failed to export backup. Please try again.');
  }
};

const triggerFileInput = () => {
  fileInput.value?.click();
};

const importData = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const importedData = JSON.parse(e.target?.result as string);

      // Validate the imported data structure
      if (!importedData.positions || !Array.isArray(importedData.positions)) {
        throw new Error('Invalid backup file format');
      }

      // Confirm import
      const confirmMessage = `This will replace your current data with ${importedData.positions.length} positions from ${new Date(importedData.exportDate).toLocaleDateString()}. Continue?`;

      if (confirm(confirmMessage)) {
        positions.value = importedData.positions;

        // Initialize fee entries for all imported positions
        positions.value.forEach(position => {
          initializeFeeEntry(position.id);
        });

        alert('Backup imported successfully!');
      }
    } catch (error) {
      alert('Failed to import backup. Please check the file format.');
    }

    // Reset file input
    (event.target as HTMLInputElement).value = '';
  };

  reader.readAsText(file);
};

// Watch for changes and save to localStorage
watch(positions, savePositions, { deep: true });
</script>

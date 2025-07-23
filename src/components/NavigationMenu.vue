<template>
  <div class="flex flex-col h-full">
    <!-- Main Content -->
    <div class="flex-1">
      <!-- Section Title -->
      <div :class="sectionTitleClass">
        <h3 class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Calculators</h3>
      </div>

      <!-- Calculator Items -->
      <template v-for="item in calculatorItems" :key="item.path">
        <router-link :to="item.path!" @click="$emit('navigate')" :class="[
          'flex items-center gap-2 transition-colors duration-200 group',
          linkClass,
          $route.path === item.path && isDesktop ? `bg-gray-700 border-r-2 ${getColorClasses(item.color).border}` : ''
        ]">
          <div :class="[
            'rounded-lg flex items-center justify-center transition-colors duration-200',
            iconContainerClass,
            getColorClasses(item.color).bg,
            getColorClasses(item.color).hover
          ]">
            <component :is="getIconComponent(item.icon)" :class="iconClass" />
          </div>

          <div>
            <div class="text-gray-100 font-medium">{{ item.name }}</div>
            <div class="text-xs text-gray-400">{{ item.description }}</div>
          </div>
        </router-link>
      </template>

      <!-- Tools Section -->
      <div :class="sectionTitleClass" style="margin-top: 1.5rem;">
        <h3 class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Tools</h3>
      </div>

      <!-- Tool Items -->
      <template v-for="item in toolItems" :key="item.name">
        <button @click="item.action?.()" :class="[
          'flex items-center gap-2 transition-colors duration-200 group text-left w-full',
          linkClass
        ]">
          <div :class="[
            'rounded-lg flex items-center justify-center transition-colors duration-200',
            iconContainerClass,
            getColorClasses(item.color).bg,
            getColorClasses(item.color).hover
          ]">
            <img v-if="item.icon.startsWith('/')" :src="item.icon" :alt="item.name" :class="iconClass">
            <component v-else :is="getIconComponent(item.icon)" :class="iconClass" />
          </div>

          <div class="flex-1">
            <div class="text-gray-100 font-medium">{{ item.name }}</div>
            <div class="text-xs text-gray-400">{{ item.description }}</div>
          </div>

          <ExternalLink v-if="item.isExternal" :class="iconClass" />
        </button>
      </template>
    </div>

    <!-- Footer -->
    <div :class="footerClass">
      <div class="text-center text-xs text-gray-400">
        &copy; {{ new Date().getFullYear() }} LP Calculator <br>
        Created by
        <a href="https://github.com/Drarox" target="_blank" rel="noopener noreferrer"
          class="text-blue-400 hover:text-blue-300">Drarox</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useNavigation } from '@/composables/useNavigation';
import { Layers3, Users, TrendingUp, ClipboardList, ExternalLink } from 'lucide-vue-next';

interface Props {
  isDesktop?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isDesktop: false
});

defineEmits<{
  navigate: []
}>();

const { calculatorItems, toolItems, getColorClasses } = useNavigation();

// Map icon names to Lucide components
const iconComponents = {
  Layers3,
  Users,
  TrendingUp,
  ClipboardList,
  ExternalLink
};

// Helper function to get the correct icon component
const getIconComponent = (iconName: string) => {
  return iconComponents[iconName as keyof typeof iconComponents];
};

// Dynamic classes based on desktop/mobile
const sectionTitleClass = computed(() =>
  props.isDesktop ? 'px-6 mb-4' : 'px-4 mb-2'
);

const linkClass = computed(() =>
  props.isDesktop ? 'px-4 py-4 hover:bg-gray-700' : 'px-4 py-3 hover:bg-gray-700'
);

const iconContainerClass = computed(() =>
  props.isDesktop ? 'w-10 h-10' : 'w-8 h-8'
);

const iconClass = computed(() =>
  props.isDesktop ? 'w-5 h-5 text-white' : 'w-4 h-4 text-white'
);





const footerClass = computed(() =>
  props.isDesktop ? 'border-t border-gray-700 p-6 pb-0' : 'border-t border-gray-700 p-4 pb-0'
);
</script>
/**
 * Composable for form data persistence using localStorage
 */

import { ref, watch, onMounted, type Ref } from 'vue';
import { loadFromStorage, saveToStorage } from '@/utils/storage';

export function useFormPersistence<T extends Record<string, any>>(
  storageKey: string,
  defaultValues: T
) {
  const formData = ref<T>({ ...defaultValues }) as Ref<T>;

  // Load saved values on mount
  onMounted(() => {
    const savedData = loadFromStorage(storageKey, defaultValues);
    Object.assign(formData.value, savedData);
  });

  // Watch for changes and save to localStorage
  watch(
    formData,
    (newData) => {
      saveToStorage(storageKey, newData);
    },
    { deep: true }
  );

  // Reset form to default values
  const resetForm = () => {
    Object.assign(formData.value, defaultValues);
  };

  return {
    formData,
    resetForm
  };
}
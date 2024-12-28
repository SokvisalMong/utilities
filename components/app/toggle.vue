<template>
  <label class="switch relative inline-block w-9 h-5">
    <input 
      type="checkbox" 
      class="opacity-0 w-0 h-0 !outline-none"
      :checked="modelValue"
      @change="handleChange"
    >
    <span class="slider absolute cursor-pointer inset-0 bg-gray-300 rounded-full" 
          :class="{ 'checked': modelValue }">
    </span>
  </label>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.checked)
}
</script>

<style scoped>
.slider {
  @apply transition-all duration-300;
}

.slider:before {
  @apply content-[''] absolute h-3 w-3 left-1 bottom-1 bg-white transition-all duration-300 rounded-full;
}

.slider.checked {
  @apply bg-frost-400;
}

.slider.checked:before {
  @apply translate-x-4;
}

input:focus + .slider {
  @apply ring-2 ring-frost-400;
}
</style>
<template>
  <div class="min-h-screen flex justify-center items-center bg-polar-night-300 text-snow-storm-100">
    <div class="flex flex-col justify-center text-center">
      <span class="text-9xl">404</span>
      <span class="text-2xl">Page not found.</span>
      <div class="px-2 py-1 border-2 rounded my-2 border-frost-200 bg-polar-night-200">
        <button @click="handleError">
          <div class="flex items-center"> 
            <Icon name="mdi:arrow-back" class="translate-y-px mr-1"/>
            <span class="text-xl">Back Home</span>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app";

defineProps({
  error: Object as () => NuxtError
})

const handleError = () => clearError({ redirect: "/" });
</script>
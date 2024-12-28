<template>
  <div class="min-h-screen flex justify-center items-center">
    <div class="relative border-2 border-frost-200 rounded-lg shadow-2xl p-8 bg-polar-night-200">
      <div class="absolute top-2 right-2">
        <RemConverterConfig
          v-model:default-px-to-rem="config.defaultPxToRem"
          v-model:auto-copy-to-clipboard="config.autoCopyToClipboard"
        />
      </div>
      Rem Converter
      <pre class="mt-4 text-sm">{{ config }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RemConverterConfig } from '~/types/remConverterConfig';

const config = ref<RemConverterConfig>({
  defaultPxToRem: 16,
  autoCopyToClipboard: true
});

watch(config, (newConfig) => {
  localStorage.setItem('remConverterConfig', JSON.stringify(newConfig));
}, { deep: true });

onMounted(() => {
  const savedConfig = localStorage.getItem('remConverterConfig');
  if (savedConfig) {
    config.value = JSON.parse(savedConfig);
  }
});
</script>
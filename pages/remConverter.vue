<template>
  <div class="min-h-screen flex justify-center items-center">
    <div class="relative border-2 border-frost-200 rounded-lg shadow-2xl p-8 bg-polar-night-200 space-y-2">
      <div class="absolute top-2 right-2">
        <RemConverterConfig
          v-model:default-px-to-rem="config.defaultPxToRem"
          v-model:auto-copy-to-clipboard="config.autoCopyToClipboard"
        />
      </div>
      <span class="font-bold">Rem Converter</span>
      <div class="flex items-center">
        <div class="flex flex-col">
          <span class="font-semibold">Pixel</span>
          <div class="flex items-center">
            <input 
              type="number" 
              inputmode="numeric" 
              :value="formattedPx"
              @input="updateFromPx(Number(($event.target as HTMLInputElement).value))"
              class="w-32 px-2 py-1 bg-polar-night-200 focus:bg-polar-night-300 rounded border border-r-0 rounded-r-none border-frost-100 !outline-none"
            />
            <button 
              @click="copyToClipboard(formattedPx)"
              class="px-2 py-2 border border-frost-100 rounded rounded-l-none flex items-center hover:bg-polar-night-300 active:bg-polar-night-400"
            >
              <Icon name="mdi:content-copy" />
            </button>
          </div>
        </div>
        <div class="flex flex-col ml-4">
          <span class="font-semibold">Rem</span>
          <div class="flex items-center">
            <input 
              type="number" 
              inputmode="numeric"
              :value="formattedRem"
              @input="updateFromRem(Number(($event.target as HTMLInputElement).value))"
              class="w-32 px-2 py-1 bg-polar-night-200 focus:bg-polar-night-300 rounded border border-r-0 rounded-r-none border-frost-100 !outline-none"
            />
            <button 
              @click="copyToClipboard(formattedRem)"
              class="px-2 py-2 border border-frost-100 rounded rounded-l-none flex items-center hover:bg-polar-night-300 active:bg-polar-night-400"
            >
              <Icon name="mdi:content-copy" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RemConverterConfig } from '~/types/remConverterConfig'
import { useLocalStorage } from '~/composables/useLocalStorage'
const { addToast } = useToast()

useHead({
  title: 'Rem Converter',
  meta: [
    { name: 'description', content: 'Convert Px to Rem or Rem to Px with configurable Px to Rem conversion and quick copy to clipboard.' },
    { name: 'keywords', content: 'px to rem, rem converter, pixel to rem, css units converter, web development tools' }
  ],
  link: [
    { rel: 'canonical', href: 'https://utilitiesvizzy.vercel.app/remConverter' }
  ]
})

const defaultConfig: RemConverterConfig = {
  defaultPxToRem: 16,
  autoCopyToClipboard: true
}

const { data: config } = useLocalStorage<RemConverterConfig>('remConverterConfig', defaultConfig)

const px = ref<number>(config.value.defaultPxToRem)
const rem = ref<number>(1)
const isUserInteraction = ref(false)

const formattedPx = computed(() => Number(px.value.toFixed(2)))
const formattedRem = computed(() => Number(rem.value.toFixed(2)))

const copyTimeout = ref<NodeJS.Timeout>()

const updateFromPx = (value: number) => {
  isUserInteraction.value = true
  if (copyTimeout.value) {
    clearTimeout(copyTimeout.value)
  }
  
  px.value = value
  rem.value = value / config.value.defaultPxToRem

  if (config.value.autoCopyToClipboard && isUserInteraction.value) {
    copyTimeout.value = setTimeout(() => {
      copyToClipboard(formattedRem.value)
    }, 100)
  }
}

const updateFromRem = (value: number) => {
  isUserInteraction.value = true
  if (copyTimeout.value) {
    clearTimeout(copyTimeout.value)
  }
  
  rem.value = value
  px.value = value * config.value.defaultPxToRem

  if (config.value.autoCopyToClipboard && isUserInteraction.value) {
    copyTimeout.value = setTimeout(() => {
      copyToClipboard(formattedPx.value)
    }, 100)
  }
}

const copyToClipboard = async (value: number) => {
  try {
    await navigator.clipboard.writeText(value.toString())
    addToast("Copied", "Copied to clipboard", "success")
  } catch (error) {
    console.error('Failed to copy:', error)
    addToast("Error", "Failed to copy to clipboard", "failed")
  }
}

watch(() => config.value.defaultPxToRem, () => {
  isUserInteraction.value = false
  updateFromPx(px.value)
})

onUnmounted(() => {
  if (copyTimeout.value) {
    clearTimeout(copyTimeout.value)
  }
  isUserInteraction.value = false
})
</script>
<template>
  <div class="min-h-screen w-screen h-full bg-polar-night-300 text-snow-storm-100">
    <div class="fixed top-4 left-4" :class="[showHomeButton ? 'block' : 'hidden']">
      <NuxtLink href="/">
        <div class="flex items-center"> 
          <Icon name="mdi:arrow-back" class="translate-y-px mr-1"/>
          <span class="text-xl">Home</span>
        </div>
      </NuxtLink>
    </div>
    <NuxtPage/>
    <AppToast/>
    <Analytics/>
  </div>
</template>

<script setup lang="ts">
import { Analytics } from '@vercel/analytics/nuxt'
const route = useRoute();

const showHomeButton = computed(() => route.path !== '/')
</script>
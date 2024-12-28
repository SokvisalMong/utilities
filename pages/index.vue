<template>
  <div>
    <div class="min-h-screen flex justify-center items-center">
      <div class="border-2 p-4 shadow-2xl rounded-lg border-frost-200 bg-polar-night-200 flex flex-col justify-center items-center">
        <div v-for="page in pages" class="p-4">
          <NuxtLink :href="page.link" class="flex items-center hover:text-snow-storm-300">
            <span>{{ page.label }}</span>
            <Icon :name="page.icon" class="ml-2" size="20"/>
          </NuxtLink>
        </div>
        <div>
          <NuxtLink href="https://github.com/SokvisalMong/utilities" target="_blank" rel="noopener noreferrer" class="flex items-center text-snow-storm-300 hover:text-snow-storm-100">
            <Icon name="mdi:github" size="24" class="mr-2"/>
            <span>Github</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const pages = [
  {
    label: "Rem Converter",
    icon: "mdi:calculator",
    link: "/remConverter"
  }
]
</script>
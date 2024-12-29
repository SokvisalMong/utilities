<template>
  <div class="min-h-screen flex justify-center items-center">
    <div class="flex flex-col space-y-1">
      <button @click="defaultToast">Default</button>
      <button @click="successToast">Success</button>
      <button @click="failedToast">Failed</button>
      <button @click="warningToast">Warning</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { addToast } = useToast()

const defaultToast = () => {
  addToast('Default', 'This the default toast', 'default')
}

const successToast = () => {
  addToast('Success', 'This is the success toast', 'default')
}

const failedToast = () => {
  addToast('Failed', 'This is the failed toast', 'default')
}

const warningToast = () => {
  addToast('Warning', 'This is the warning toast', 'warning')
}
</script>
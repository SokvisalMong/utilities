<template>
  <TransitionGroup
    name="toast"
    tag="div"
    class="fixed bottom-4 left-4 z-50 flex flex-col-reverse gap-2"
  >
    <div
      v-for="toast in toasts"
      :key="toast.id"
      class="flex w-[350px] flex-col rounded-md shadow-lg"
      :class="[getToastStyles(toast.variant)]"
      role="alert"
      aria-live="polite"
    >
      <div class="flex items-center justify-between gap-2 p-4">
        <span class="font-semibold">{{ toast.title }}</span>
        <button 
          @click="dismissToast(toast.id)"
          class="rounded-sm opacity-70 transition-opacity hover:opacity-100 !outline-none"
        >
          <Icon
            name="mdi:close"
            class="h-4 w-4"
          />
          <span class="sr-only">Close</span>
        </button>
      </div>
      <div class="px-4 pb-4">
        {{ toast.message }}
      </div>
    </div>
  </TransitionGroup>
</template>

<script setup lang="ts">
const { toasts, dismissToast } = useToast()

const getToastStyles = (variant: 'default' | 'success' | 'failed' | 'warning') => {
  const baseStyles = 'border border-opacity-50 backdrop-blur-sm'
  
  const variantStyles = {
    default: 'bg-polar-night-200/30 border-polar-night-200',
    success: 'bg-aurora-green/30 border-aurora-green',
    failed: 'bg-aurora-red/30 border-aurora-red',
    warning: 'bg-aurora-yellow/30 border-aurora-yellow'
  }

  return `${baseStyles} ${variantStyles[variant]}`
}
</script>

<style scoped>
.toast-move,
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(-100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
</style>
<template>
  <div>
    <button @click.stop="openConfig">
      <Icon name="mdi:settings" size="20" class="hover:text-snow-storm-300"/>
    </button>
    <div 
      ref="dropdownRef"
      class="absolute z-10 border-2 border-frost-100 rounded-lg p-4 shadow-2xl bg-polar-night-300 min-w-max right-0" 
      :class="[showConfigDropdown ? 'block' : 'hidden']"
    >
      <div class="flex justify-between items-center mb-4">
        <span class="font-bold">Config</span>
        <button @click="closeConfig" class="hover:text-snow-storm-300">
          <Icon name="mdi:close" size="20"/>
        </button>
      </div>
      <div class="space-y-4">
        <div class="flex items-center justify-between gap-4">
          <span>Base px. size</span>
          <div class="space-x-1">
            <input
            type="number"
            :value="defaultPxToRem"
            @input="updateDefaultPxToRem"
            class="w-16 px-2 py-1 bg-polar-night-200 rounded border border-frost-100 !outline-none focus:bg-polar-night-300"
            />
            <button class="px-2 py-1 border-frost-100 border rounded bg-polar-night-200 hover:bg-polar-night-300 transition-all active:bg-polar-night-400" @click="resetPx">Reset</button>
          </div>
        </div>
        <div class="flex items-center justify-between">
          <span>Automatically copy to clipboard</span>
          <AppToggle
            :model-value="autoCopyToClipboard"
            @update:model-value="updateAutoCopyToClipboard"
            class="ml-2"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  defaultPxToRem: number;
  autoCopyToClipboard: boolean;
}>();

const emit = defineEmits<{
  'update:defaultPxToRem': [value: number];
  'update:autoCopyToClipboard': [value: boolean];
}>();

const showConfigDropdown = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const updateDefaultPxToRem = (event: Event) => {
  const value = Number((event.target as HTMLInputElement).value);
  emit('update:defaultPxToRem', value);
};

const updateAutoCopyToClipboard = (value: boolean) => {
  emit('update:autoCopyToClipboard', value);
};

const openConfig = (event: Event) => {
  event.stopPropagation();
  showConfigDropdown.value = true;
};

const closeConfig = () => {
  showConfigDropdown.value = false;
};

const handleClickOutside = (event: MouseEvent) => {
  if (
    dropdownRef.value && 
    !dropdownRef.value.contains(event.target as Node) &&
    showConfigDropdown.value
  ) {
    closeConfig();
  }
};

const resetPx = () => {
  emit('update:defaultPxToRem', 16);
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>
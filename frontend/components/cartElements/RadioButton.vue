<template>
  <div class="flex  items-center gap-2">
    <input
        @change="$emit('change')"
        v-model="model"
        :disabled="props.disabled"
        :value="props.value"
        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-2 focus:ring-blue-500
            dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
        type="radio"
        :name="props.name"
        :id="props.id"
    />
    <label
        :for="props.id"
        class="!text-[16px] font-bold text-gray-900 dark:text-gray-300 cursor-pointer"
    >
      {{ props.label }}
    </label>
  </div>
</template>

<script setup lang="ts">
interface PropsInterface {
  label?: string;
  name: string;
  disabled?: boolean;
  required?: boolean;
  id: string;
  value: any;
}

const props = withDefaults(defineProps<PropsInterface>(), {});
const model = defineModel();
</script>

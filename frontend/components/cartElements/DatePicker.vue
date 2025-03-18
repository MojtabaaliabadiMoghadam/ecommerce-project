<template>
  <div dir="ltr" class="relative">
    <input
        type="date"
        v-model="model"
        :id="props.id"
        :name="props.name"
        :disabled="props.disabled"
        class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
            dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-600"
    />
  </div>
</template>

<script setup lang="ts">
interface PropsInterface {
  id?: string;
  name?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<PropsInterface>(), {});
const model = defineModel<string>();
</script>


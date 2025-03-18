<template>
  <div class="relative w-full border-none">
    <BaseInput
        :type="showPassword ? 'text' : 'password'"
        v-model="model"
    />
    <span  class="absolute cursor-pointer left-5 top-4 mdi mdi-24px mdi-eye-outline" @click="showPassword = !showPassword" v-if="showPassword" />
    <Icon  class="absolute cursor-pointer left-5 top-4 mdi mdi-24px mdi-eye-lock-outline" @click="showPassword = !showPassword" v-else />
  </div>
</template>
<script setup lang="ts">
import BaseInput from "~/components/forms/BaseInput.vue";

const showPassword = ref(false);

const model = defineModel()
const emit = defineEmits(['update:modelValue']);

</script>
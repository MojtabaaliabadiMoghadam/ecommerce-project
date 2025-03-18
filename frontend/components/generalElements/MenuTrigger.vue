<script setup lang="ts">
const { toggleMobileMenu } = useHelpers();
</script>

<template>
  <div>
    <span class=" cursor-pointer mdi mdi-24px mdi-menu" @click="toggleMobileMenu" />
  </div>
</template>

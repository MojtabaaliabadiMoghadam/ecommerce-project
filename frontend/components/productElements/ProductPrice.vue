<template>
  <div v-if="regularPrice" class="flex font-semibold gap-2">
    <span :class="{ 'text-gray-400 line-through font-normal': salePrice }" v-html="regularPrice" />
    <span v-if="salePrice" v-html="salePrice" />
  </div>
</template>
<script setup lang="ts">
interface ProductPriceProps {
  regularPrice?: string | null;
  salePrice?: string | null;
}

const { regularPrice, salePrice } = defineProps<ProductPriceProps>();
</script>



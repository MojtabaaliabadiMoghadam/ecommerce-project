<template>
  <div v-if="products" class="grid gap-8">
    <ProductCard
      v-for="(node, i) in products"
      :key="node.databaseId"
      class="w-full"
      :node="node"
      :index="i"/>
  </div>
</template>
<script setup>
import ProductCard from "~/components/productElements/ProductCard.vue";

const props = defineProps({
  products: { type: Array, default: null },
});
</script>
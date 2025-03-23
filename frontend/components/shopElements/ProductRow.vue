<template>
  <!-- <div v-if="products" class="grid gap-8">
    <ProductCard
      v-for="(node, i) in products"
      :key="node.databaseId"
      class="w-full"
      :node="node"
      :index="i"/>
  </div> -->
  <section v-if="products" class="py-24">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between">
        <h2 class="font-manrope font-bold text-4xl text-black mb-8 max-xl:text-center">{{
          $t('messages.shop.popularProducts') }}</h2>
        <NuxtLink class="font-manrope font-bold mb-8 max-xl:text-center text-primary" to="/products">{{
          $t('messages.general.viewAll') }}</NuxtLink>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
        <ProductCard v-for="(node, i) in products" :key="node.databaseId" class="w-full" :node="node" :index="i" />
      </div>
    </div>
  </section>
</template>
<script setup>
import ProductCard from "~/components/productElements/ProductCard.vue";

const props = defineProps({
  products: { type: Array, default: null },
});
</script>
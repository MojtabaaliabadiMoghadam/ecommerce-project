<template>
  <Transition name="fade" mode="out-in">

    <section v-if="dataStore.filteredProducts?.length" class="relative w-full">
      <TransitionGroup name="list" tag="div" mode="in-out" class="product-grid">
        <ProductCard v-for="(node, i) in dataStore.filteredProducts" :key="node" :node :index="i" />
      </TransitionGroup>
      <Pagination />
    </section>
    <NoProductsFound v-else />
  </Transition>
</template>
<script setup lang="ts">
import ProductCard from "~/components/productElements/ProductCard.vue";
import Pagination from "~/components/shopElements/Pagination.vue";
import NoProductsFound from "~/components/shopElements/NoProductsFound.vue";
import {useDataGlobal} from "~/stores/globalStore";

const dataStore = useDataGlobal()
const route = useRoute();
const page = ref(parseInt(route.params.pageNumber as string) || 1);
</script>
<style lang="postcss" scoped>
.product-grid {
  @apply my-4 min-h-[600px] grid transition-all gap-8 lg:my-8;

  grid-template-columns: repeat(2, 1fr);
}
.product-grid:empty {
  display: none;
}

@media (min-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  }
}

.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>

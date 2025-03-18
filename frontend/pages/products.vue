<template>
  <div class="container flex items-start gap-16">
    <Filters v-if="true" />
    <div class="w-full">
      <div class="flex items-center justify-between w-full gap-4 mt-8 md:gap-8">
        <ProductResultCount />
        <OrderByDropdown class="hidden md:inline-flex" v-if="true" />
        <ShowFilterTrigger class="md:hidden" v-if="true" />
      </div>
      <ProductGrid />
    </div>
  </div>
</template>
<script setup lang="ts">
import Filters from "~/components/filtering/Filters.vue";
import ProductResultCount from "~/components/shopElements/ProductResultCount.vue";
import OrderByDropdown from "~/components/shopElements/OrderByDropdown.vue";
import ShowFilterTrigger from "~/components/filtering/ShowFilterTrigger.vue";
import ProductGrid from "~/components/shopElements/ProductGrid.vue";
import NoProductsFound from "~/components/shopElements/NoProductsFound.vue";
import {useDataGlobal} from "~/stores/globalStore";

const dataGlobal = useDataGlobal()
onBeforeMount(()=>{
  // dataGlobal.generateProducts(10)
  console.log(dataGlobal.products)
})
onUnmounted(()=>{
  dataGlobal.resetFilters()
})
</script>
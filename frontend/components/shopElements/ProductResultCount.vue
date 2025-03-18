<template>
  <div class="text-sm font-light" v-if="dataStore.products.length !== 0">
    <span>{{ $t('messages.shop.productResultCount.showing') + ' ' }}</span>
    <span class="font-normal">{{ (page - 1) * productsPerPage + 1 + ' ' }}</span>
    <span>{{ $t('messages.shop.productResultCount.to') + ' ' }}</span>
    <span class="font-normal">{{ Math.min(page * productsPerPage, dataStore.products.length) + ' ' }}</span>
    (<span>{{ $t('messages.shop.productResultCount.of') }}</span> <span class="font-normal">{{ dataStore.products.length }}</span
  >)
  </div>
</template>
<script setup lang="ts">
import {useDataGlobal} from "~/stores/globalStore";

const route = useRoute();
// const { products } = useProducts();
const dataStore = useDataGlobal()

const { productsPerPage } = useHelpers();
const page = ref(parseInt(route.params.pageNumber as string) || 1);
</script>


<template>
  <form class="relative items-center flex-1 -space-x-px rounded-md shadow-sm" @submit.prevent="setSearchQuery(searchQuery)">
    <span class="absolute mdi mdi-24px mdi-magnify z-10 opacity-50 pointer-events-none right-2" />
    <input
      id="product-search-input"
      v-model="searchQuery"
      type="text"
      :placeholder="$t('messages.shop.searchProducts')"
      class="z-0 inline-flex items-center w-full p-2 ps-10 pe-24 text-sm text-gray-500 border border-gray-300 rounded-md shadow-inner outline-none bg-gray-50 shadow-gray-200" />
    <span
      v-if="searchQuery"
      class="absolute z-10 flex items-center gap-1 px-2 py-1 text-xs rounded cursor-pointer bg-primary bg-opacity-10 hover:bg-opacity-20 text-primary left-2"
      @click="reset">
      <span>{{ $t('messages.general.clear') }}</span>
      <span class="mdi mdi-close" />
    </span>
  </form>
</template>
<script setup>
const searchQuery = ref();

const reset = () => {
  clearSearchQuery();
  searchQuery.value = '';
};

// watch(getSearchQuery, (value) => {
//   if (!value) reset();
// });
</script>
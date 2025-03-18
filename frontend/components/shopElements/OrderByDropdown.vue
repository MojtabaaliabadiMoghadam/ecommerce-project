<template>
  <div class="inline-flex -space-x-px shadow-sm rounded-md isolate">
    <select
        id="orderby-dropdown"
        v-model="orderby"
        @change="updateSort"
        class="bg-white rounded-l-none ring-[0.5px] ring-gray-300"
        aria-label="Order by"
    >
      <option value="date">{{ $t('messages.general.latest') }}</option>
      <option value="alphabetically">{{ $t('messages.general.alphabetically') }}</option>
      <option value="price">{{ $t('messages.shop.price') }}</option>
      <option v-if="true" value="rating">{{ $t('messages.shop.rating') }}</option>
      <option value="discount">{{ $t('messages.shop.discount') }}</option>
    </select>
    <button
        class="relative inline-flex items-center p-2 text-sm font-medium text-gray-500 bg-white ring-[1px] ring-gray-300 rounded-l-md hover:bg-gray-50 focus:z-20"
        aria-label="Sort"
        @click="toggleSortOrder"
    >
      <span
          :class="order === 'ASC' ? 'rotate-180' : ''"
          class="transition-transform transform mdi mdi-24px mdi-filter-variant"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import { useDataGlobal } from "~/stores/globalStore";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

const dataStore = useDataGlobal();
const route = useRoute();

const orderby = ref(route.query.orderby || "date");
const order = ref(route.query.order || "DESC");

const updateSort = () => {
  dataStore.setOrderBy(orderby.value);
};

const toggleSortOrder = () => {
  dataStore.toggleOrder();
};

// همگام‌سازی مقدار مرتب‌سازی از URL در بارگذاری اولیه
watch(
    () => route.query.orderby,
    (newOrderBy) => {
      orderby.value = newOrderBy || "date";
      dataStore.setOrderBy(newOrderBy as string);
    },
    { immediate: true }
);

watch(
    () => route.query.order,
    (newOrder) => {
      order.value = newOrder || "DESC";
      dataStore.toggleOrder();
    },
    { immediate: true }
);
</script>

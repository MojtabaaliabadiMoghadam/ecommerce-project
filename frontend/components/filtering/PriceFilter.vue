<template>
  <div dir="ltr">
    <div class="cursor-pointer flex font-semibold mt-8 leading-none justify-between items-center"
         @click="isOpen = !isOpen">
      <span class="transform mdi mdi-24px mdi-chevron-down transition-all ease-in duration-150"
            :class="isOpen ? 'rotate-180' : ''"/>
      <span>قیمت</span>
    </div>
    <div v-show="isOpen" class="mt-3 grid gap-4 grid-cols-2">
      <div class="flex relative items-center">
        <input
            id="price-from"
            v-model="price[0]"
            class="bg-white border rounded-lg max-w-full border-gray-200 leading-none w-auto p-2 pl-6 md:text-sm"
            type="number"
            min="0"/>
        <label for="price-from" class="leading-none px-2 text-gray-400 absolute" v-html="currencySymbol"/>
      </div>
      <div class="flex relative items-center">
        <input
            id="price-to"
            v-model="price[1]"
            class="bg-white border rounded-lg max-w-full border-gray-200 leading-none w-auto p-2 pl-6 md:text-sm"
            type="number"
            min="1"/>
        <label for="price-to" class="leading-none px-2 text-gray-400 absolute" v-html="currencySymbol"/>
      </div>
      <div class="mx-1 mt-1 col-span-full">
        <Slider v-model="price" :tooltips="false" :min="0" :max="maxPrice"
                ariaLabelledby="price-from price-to" @update="applyPrice"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import Slider from '@vueform/slider';
import {ref, watch, onMounted} from 'vue';
import {useDataGlobal} from "~/stores/globalStore.js";

const store = useDataGlobal();
const maxPrice = 1000;
const currencySymbol = '$';
const isOpen = ref(true);

// مقدار اولیه فیلتر قیمت را از store بگیریم
const price = ref([store.priceFilter.min, store.priceFilter.max]);

// هنگام تغییر مقدار، مقدار در Pinia و Query تغییر کند
const applyPrice = () => {
  store.setPriceFilter(price.value);
};

// هنگام لود شدن مقدار را از query بگیریم
onMounted(() => {
  store.setFiltersFromQuery();
  price.value = [store.priceFilter.min, store.priceFilter.max]; // همگام‌سازی مقدار ورودی
});

watch(price, applyPrice);
</script>

<style src="@vueform/slider/themes/default.css"></style>

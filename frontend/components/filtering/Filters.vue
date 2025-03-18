<template>
  <aside id="filters">
    <OrderByDropdown class="block w-full md:hidden" />
    <div class="relative z-30 grid mb-12 space-y-8 divide-y">
      <PriceFilter />
      <CategoryFilter v-if="!hideCategories" :terms="productCategoryTerms" />
      <div v-for="attribute in attributesWithTerms" :key="attribute.slug">
        <ColorFilter v-if="attribute.slug == 'pa_color' || attribute.slug == 'pa_colour'" :attribute />
        <GlobalFilter v-else :attribute />
      </div>
      <LazyFilteringStarRatingFilter v-if="storeSettings.showReviews" />
      <LazyFilteringResetFiltersButton v-if="isFiltersActive" />
    </div>
  </aside>
  <div class="fixed inset-0 z-50 hidden bg-black opacity-25 filter-overlay" @click="removeBodyClass('show-filters')"></div>
</template>

<script setup lang="ts">
import OrderByDropdown from "~/components/shopElements/OrderByDropdown.vue";
import PriceFilter from "~/components/filtering/PriceFilter.vue";
import CategoryFilter from "~/components/filtering/CategoryFilter.vue";
import ColorFilter from "~/components/filtering/ColorFilter.vue";
import GlobalFilter from "~/components/filtering/GlobalFilter.vue";
import OnSaleFilter from "~/components/filtering/OnSaleFilter.vue";

// حذف وابستگی‌های پویا
const isFiltersActive = ref(true);
const storeSettings = ref({ showReviews: true });

// prop برای کنترل نمایش دسته‌بندی‌ها
const { hideCategories } = defineProps({ hideCategories: { type: Boolean, default: false } });

// داده‌های هاردکد شده
const productCategoryTerms = ref([
  { id: 1, name: "لباس", taxonomyName: "product_cat" },
  { id: 2, name: "کفش", taxonomyName: "product_cat" },
]);

const attributesWithTerms = ref([
  { slug: "pa_color", terms: [{ id: 1, name: "قرمز" }, { id: 2, name: "آبی" }] },
  { slug: "pa_size", terms: [{ id: 3, name: "کوچک" }, { id: 4, name: "بزرگ" }] },
]);

// حذف کلاس برای بستن فیلترها
const removeBodyClass = (className: string) => {
  document.body.classList.remove(className);
};
</script>

<style lang="postcss">
.show-filters .filter-overlay {
  @apply block;
}
.show-filters {
  overflow: hidden;
}

#filters {
  @apply w-[280px];

  & .slider-connect {
    @apply bg-primary;
  }

  &::-webkit-scrollbar {
    display: none;
  }
}

.price-input {
  @apply border rounded-xl outline-none leading-tight w-full p-2 transition-all;

  &.active {
    @apply border-gray-400 pl-6;
  }
}

@media (max-width: 768px) {
  #filters {
    @apply bg-white h-full p-8 transform pl-2 transition-all ease-in-out bottom-0 left-4 -translate-x-[110vw] duration-300 overflow-auto fixed;

    box-shadow:
        -100px 0 0 white,
        -200px 0 0 white,
        -300px 0 0 white;
    z-index: 60;
  }

  .show-filters #filters {
    @apply transform-none;
  }
}
</style>

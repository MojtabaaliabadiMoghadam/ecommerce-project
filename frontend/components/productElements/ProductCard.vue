<template>
  <div class="relative group">
    <NuxtLink v-if="node.slug" :to="`/product/${decodeURIComponent(node.slug)}`" :title="node.name">
      <SaleBadge v-if="node?.status" :node class="absolute top-2 right-2" />
      <img
          :width="imgWidth"
          :height="imgHeight"
          :src="node.src || '/images/placeholder.jpg'"
          :alt="node.image?.altText || node.name || 'Product image'"
          :title="node.name"
          :loading="index <= 3 ? 'eager' : 'lazy'"
          :sizes="`sm:${imgWidth / 2}px md:${imgWidth}px`"
          class="rounded-lg object-top object-cover w-full aspect-9/8 md:h-[280px] h-[150px]"
      />
    </NuxtLink>
    <div class="p-2">
<!--      <StarRating v-if="storeSettings.showReviews" :rating="3" :count="3" />-->
      <NuxtLink v-if="node.slug" :to="`/product/${decodeURIComponent(node.slug)}`" :title="node.name">
        <h2 class="mb-2 font-light leading-tight group-hover:text-primary">{{ node.translations[locale].title }}</h2>
      </NuxtLink>
      <ProductPrice class="text-sm" :regular-price="node.price" />
    </div>
  </div>
</template>

<script setup lang="ts">
const {locale} = useI18n()
import SaleBadge from "~/components/productElements/SaleBadge.vue";
import StarRating from "~/components/productElements/StarRating.vue";
import ProductPrice from "~/components/productElements/ProductPrice.vue";

const route = useRoute();
const { storeSettings } = useAppConfig();

const props = defineProps({
  node: { type: Object, required: true },
  index: { type: Number, default: 1 },
});

const imgWidth = 280;
const imgHeight = Math.round(imgWidth * 1.125);

const filterQuery = computed(() => route.query.filter as string);
const paColor = computed(() =>
    filterQuery.value?.match(/pa_color\[(.*?)\]/)?.[1]?.split(",") || []
);
</script>

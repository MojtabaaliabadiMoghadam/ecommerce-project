<template>
  <div>
    <a href="javascript:;"
      class="relative bg-cover group rounded-3xl !h-[280px] bg-center overflow-hidden mx-auto sm:ml-0 xl:mx-auto cursor-pointer">
      <img class="rounded-2xl object-cover h-full w-full" :src="addBackendToImageUrl(node.image_url) || '/images/placeholder.jpg'"
        :alt="node.image_url">
      <div
        class="absolute z-10 bottom-3 left-0 mx-3 p-3 bg-white w-[calc(100%-24px)] rounded-xl shadow-sm shadow-transparent transition-all duration-500 group-hover:shadow-indigo-200 group-hover:bg-indigo-50">
        <div class="flex items-center justify-between mb-2">
          <h6 class="font-semibold text-base leading-7 text-black ">{{ node.name }}</h6>
          <h6 class="font-semibold text-base leading-7 text-indigo-600 text-right">{{ node.price }}</h6>
        </div>
        <p class="text-xs leading-5 text-gray-500 truncate w-full">{{ node.description }}</p>
      </div>
    </a>
  </div>

</template>

<script setup lang="ts">
const { addBackendToImageUrl } = useHelpers()
const { locale } = useI18n()
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

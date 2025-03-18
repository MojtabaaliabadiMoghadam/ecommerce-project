<script setup lang="ts">
import SaleBadge from "~/components/productElements/SaleBadge.vue";

const { FALLBACK_IMG } = useHelpers();

const props = defineProps({
  mainImage: { type: Object, required: true },
  gallery: { type: Object, required: true },
  node: { type: Object as PropType<Product | Variation>, required: true },
  activeVariation: { type: Object, required: false },
});

// تصویر اصلی محصول
const primaryImage = computed(() => ({
  sourceUrl: props.mainImage.sourceUrl || FALLBACK_IMG,
  title: props.mainImage.title,
  altText: props.mainImage.altText,
  databaseId: props.mainImage.databaseId,
}));

const imageToShow = ref(primaryImage.value);

// تصاویر گالری بدون تکرار
const galleryImages = computed(() =>
    [primaryImage.value, ...props.gallery.nodes].filter(
        (img, index, self) =>
            img?.databaseId && index === self.findIndex((t) => t?.databaseId === img?.databaseId)
    )
);

const changeImage = (image: any) => {
  if (image) imageToShow.value = image;
};

watch(
    () => props.activeVariation,
    (newVal) => {
      if (newVal?.image) {
        imageToShow.value =
            galleryImages.value.find((img) => img.databaseId === newVal.image?.databaseId) ||
            primaryImage.value;
      }
    }
);

const imgWidth = 640;
</script>

<template>
  <div>
    <SaleBadge :node class="absolute text-base top-4 right-4" />
    <img
        class="rounded-xl object-contain w-full min-w-[350px]"
        :width="imgWidth"
        :height="imgWidth"
        :alt="imageToShow.altText || node.name"
        :title="imageToShow.title || node.name"
        :src="imageToShow.sourceUrl"
        fetchpriority="high"
        placeholder
        placeholder-class="blur-xl"
    />
    <div v-if="galleryImages.length > 1" class="my-4 gallery-images">
      <img
          v-for="galleryImg in galleryImages"
          :key="galleryImg.databaseId"
          class="cursor-pointer rounded-xl"
          :width="imgWidth"
          :height="imgWidth"
          :src="galleryImg.sourceUrl"
          :alt="galleryImg.altText || node.name"
          :title="galleryImg.title || node.name"
          placeholder
          placeholder-class="blur-xl"
          loading="lazy"
          @click="changeImage(galleryImg)"
      />
    </div>
  </div>
</template>

<style scoped>
.gallery-images {
  display: flex;
  overflow: auto;
  gap: 1rem;
}

.gallery-images::-webkit-scrollbar {
  display: none;
}

.gallery-images img {
  width: 72px;
  aspect-ratio: 5/6;
  object-fit: cover;
}

@media (min-width: 768px) {
  .gallery-images {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(72px, 1fr));
  }

  .gallery-images img {
    width: 100%;
  }
}
</style>

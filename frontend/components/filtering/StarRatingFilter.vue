<template>
  <div>
    <div @click="isOpen = !isOpen" class="cursor-pointer flex font-semibold mt-8 leading-none justify-between items-center">
      <span>{{ $t('messages.shop.rating') }}</span>
      <span class="transform mdi mdi-24px mdi-chevron-down transition-all ease-in duration-150" :class="isOpen ? 'rotate-180' : ''"/>
    </div>
    <div v-if="isOpen" class="mt-3 text-sm grid text-gray-500 gap-3">
      <div class="cursor-pointer flex gap-2 items-center">
        <input id="star-five" v-model="selectedTerms" type="radio" value="5" aria-label="5 stars" />
        <label class="flex items-center" for="star-five">
          <StarRating :rating="5" :size="16" />
        </label>
      </div>
      <div class="cursor-pointer flex gap-2 items-center">
        <input id="star-four" v-model="selectedTerms" type="radio" value="4" aria-label="4 stars" />
        <label class="flex items-center" for="star-four">
          <StarRating :rating="4" :size="16" />
          <span class="ml-1 text-xs">& {{ $t('messages.general.up') }}</span>
        </label>
      </div>
      <div class="cursor-pointer flex gap-2 items-center">
        <input id="star-three" v-model="selectedTerms" type="radio" value="3" aria-label="3 stars" />
        <label class="flex items-center" for="star-three">
          <StarRating :rating="3" :size="16" />
          <span class="ml-1 text-xs">& {{ $t('messages.general.up') }}</span>
        </label>
      </div>
      <div class="cursor-pointer flex gap-2 items-center">
        <input id="star-two" v-model="selectedTerms" type="radio" value="2" aria-label="2 stars" />
        <label class="flex items-center" for="star-two">
          <StarRating :rating="2" :size="16" />
          <span class="ml-1 text-xs">& {{ $t('messages.general.up') }}</span>
        </label>
      </div>
      <div class="cursor-pointer flex gap-2 items-center">
        <input id="star-one" v-model="selectedTerms" type="radio" value="1" aria-label="1 star" />
        <label class="flex items-center" for="star-one">
          <StarRating :rating="1" :size="16" />
          <span class="ml-1 text-xs">& {{ $t('messages.general.up') }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import StarRating from "~/components/productElements/StarRating.vue";
const selectedTerms = ref<string[]>([]);
const isOpen = ref(true);
</script>

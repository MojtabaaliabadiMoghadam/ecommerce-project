<template>
  <div v-if="terms.length">
    <div class="cursor-pointer flex font-semibold mt-8 justify-between items-center" @click="isOpen = !isOpen">
      <span>{{ label || $t('messages.shop.category', 2) }}</span>
      <span  class="transform mdi mdi-24px mdi-chevron-down transition-all ease-in duration-150" :class="isOpen ? 'rotate-180' : ''"/>
    </div>
    <div v-show="isOpen" class="mt-3 mr-1 max-h-[240px] grid gap-1.5 overflow-auto custom-scrollbar">
      <div v-for="term in terms" :key="term.slug" class="flex gap-2 items-start">
        <input :id="term.slug" v-model="selectedTerms" type="checkbox" :value="term.slug" @change="checkboxChanged" />
        <label :for="term.slug" class="cursor-pointer m-0 text-sm flex-1 leading-tight">
          <span v-html="term.name" />
          <small v-if="showCount" class="ml-1 text-gray-400 tabular-nums" aria-hidden="true">({{ term.count || 0 }})</small>
        </label>
      </div>
    </div>
  </div>
</template>
<script setup>

const props = defineProps({
  terms: { type: Array, required: true },
  label: { type: String, default: '' },
  openByDefault: { type: Boolean, default: true },
  showCount: { type: Boolean, default: false },
});

const isOpen = ref(props.openByDefault);

const route = useRoute();
const selectedTerms = ref()
</script>
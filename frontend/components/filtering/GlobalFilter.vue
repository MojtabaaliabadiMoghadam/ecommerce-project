<template>
  <div @click="isOpen = !isOpen" class="cursor-pointer flex font-semibold mt-8 leading-none justify-between items-center">
    <span>{{ filterTitle }}</span>
    <span class="transform mdi mdi-24px mdi-chevron-down transition-all ease-in duration-150" :class="isOpen ? 'rotate-180' : ''"/>
  </div>
  <div  v-show="isOpen" class=" p-2 max-h-[240px] grid gap-1 overflow-auto custom-scrollbar">
    <div v-for="term in attribute.terms" :key="term.slug" class="flex gap-2 items-center">
      <input :id="term.slug" v-model="selectedTerms" type="checkbox" :value="term.slug" />
      <label :for="term.slug" class="cursor-pointer m-0 text-sm flex items-center flex-wrap">
        <span v-html="term.name" />
        <small v-if="attribute.showCount" class="ml-1 text-gray-400 tabular-nums" aria-hidden="true">
          ({{ term.count || 0 }})
        </small>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
const attribute = ref({
  slug: "category",
  label: "دسته‌بندی",
  openByDefault: true,
  showCount: true,
  terms: [
    { slug: "electronics", name: "الکترونیک", count: 25 },
    { slug: "clothing", name: "پوشاک", count: 15 },
    { slug: "home-appliances", name: "لوازم خانگی", count: 10 },
    { slug: "books", name: "کتاب‌ها", count: 30 },
  ],
});

const selectedTerms = ref([]);
const filterTitle = ref(attribute.value.label || attribute.value.slug);
const isOpen = ref(attribute.value.openByDefault);
</script>

<template>
  <div class="bg-white">
    <div v-if="loadingProduct" class="h-[calc(100vh-500px)] flex items-center justify-center w-full">
      <LoadingIcon />
    </div>
    <div v-else class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">

      <!-- Product details -->
      <div class="lg:max-w-lg lg:self-end">
        <nav aria-label="Breadcrumb">
          <ol role="list" class="flex items-center space-x-2">
            <li v-for="(breadcrumb, breadcrumbIdx) in breadcrumbs" :key="breadcrumb.breadcrumbIdx">
              <div class="flex items-center text-sm">
                <a :href="breadcrumb.key" class="font-medium text-gray-500 hover:text-gray-900">{{
                    breadcrumb.name
                  }}</a>
                <svg v-if="breadcrumbIdx + 1 < breadcrumbs.length" viewBox="0 0 20 20" fill="currentColor"
                     aria-hidden="true" class="ml-2 size-5 shrink-0 text-gray-300">
                  <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z"/>
                </svg>
              </div>
            </li>
          </ol>
        </nav>

        <div class="mt-4">
          <h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{{ product?.translations[locale]?.title }}</h1>
        </div>

        <section aria-labelledby="information-heading" class="mt-4">
          <h2 id="information-heading" class="sr-only">Product information</h2>

          <div class="flex items-center">
            <p class="text-lg text-gray-900 sm:text-xl">{{product?.price}}</p>

            <div class="ml-4 border-l border-gray-300 pl-4 ps-4">
              <h2 class="sr-only">Tax</h2>
              <div class="flex items-center">
                <p class="ml-2 text-sm text-gray-500">{{ product?.tax }} Tax</p>
              </div>
            </div>
          </div>

          <div class="mt-4 space-y-6">
            <p v-if="product" class="text-base text-gray-500">{{ product?.translations[locale]?.description }}</p>
          </div>

          <div v-if="product?.status" class="mt-6 flex items-center">
            <CheckIcon class="size-5 shrink-0 text-green-500" aria-hidden="true"/>
            <p class="ml-2 text-sm text-gray-500"> {{$t('messages.shop.in_stock')}}</p>
          </div>
        </section>
      </div>

      <!-- Product image -->
      <div class="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
        <img :src="product?.imageSrc || '/images/place-2.png'" :alt="product?.imageAlt" class="aspect-square w-full rounded-lg object-cover"/>
      </div>

      <!-- Product form -->
      <div class="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
        <section aria-labelledby="options-heading">
          <form @submit.prevent="CreateOrder">
<!--            <div class="sm:flex sm:justify-between">-->
<!--              &lt;!&ndash; Size selector &ndash;&gt;-->
<!--              <fieldset>-->
<!--                <legend class="block text-sm font-medium text-gray-700">Size</legend>-->
<!--                <RadioGroup v-model="selectedSize" class="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">-->
<!--                  <RadioGroupOption as="template" v-for="size in product.sizes" :key="size.name" :value="size"-->
<!--                                    :aria-label="size.name" :aria-description="size.description"-->
<!--                                    v-slot="{ active, checked }">-->
<!--                    <div-->
<!--                        :class="[active ? 'ring-2 ring-indigo-500' : '', 'relative block cursor-pointer rounded-lg border border-gray-300 p-4 focus:outline-hidden']">-->
<!--                      <p class="text-base font-medium text-gray-900">{{ size.name }}</p>-->
<!--                      <p class="mt-1 text-sm text-gray-500">{{ size.description }}</p>-->
<!--                      <div-->
<!--                          :class="[active ? 'border' : 'border-2', checked ? 'border-indigo-500' : 'border-transparent', 'pointer-events-none absolute -inset-px rounded-lg']"-->
<!--                          aria-hidden="true"/>-->
<!--                    </div>-->
<!--                  </RadioGroupOption>-->
<!--                </RadioGroup>-->
<!--              </fieldset>-->
<!--            </div>-->
<!--            <div class="mt-4">-->
<!--              <a href="#" class="group inline-flex text-sm text-gray-500 hover:text-gray-700">-->
<!--                <span>What size should I buy?</span>-->
<!--                <QuestionMarkCircleIcon class="ml-2 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"-->
<!--                                        aria-hidden="true"/>-->
<!--              </a>-->
<!--            </div>-->
            <div class="mt-10 w-full flex gap-4">
              <button  type="submit"
                      class="flex items-center w-3/4 justify-center rounded-md border border-transparent bg-indigo-600
                       px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500
                       focus:ring-offset-2 focus:ring-offset-gray-50 focus:outline-hidden">
                {{$t('messages.shop.addToCart')}}
              </button>
              <input v-model="dataStore.quantity" type="number" id="number-input" aria-describedby="helper-text-explanation"
                     class="bg-gray-50 w-1/4 font-bold border border-gray-300 text-black
                     rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" placeholder="تعداد" required />

            </div>
<!--            <div class="mt-6 text-center">-->
<!--              <a href="#" class="group inline-flex text-base font-medium">-->
<!--                <ShieldCheckIcon class="mr-2 size-6 shrink-0 text-gray-400 group-hover:text-gray-500"-->
<!--                                 aria-hidden="true"/>-->
<!--                <span class="text-gray-500 hover:text-gray-700">Lifetime Guarantee</span>-->
<!--              </a>-->
<!--            </div>-->
          </form>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {CheckIcon, QuestionMarkCircleIcon, StarIcon} from '@heroicons/vue/20/solid'
import {RadioGroup, RadioGroupOption} from '@headlessui/vue'
import {ShieldCheckIcon} from '@heroicons/vue/24/outline'
import {useDataGlobal} from "~/stores/globalStore";
import LoadingIcon from "~/components/generalElements/LoadingIcon.vue";
const {formatPrice} = useHelpers()
const dataStore = useDataGlobal()
const route = useRoute()
const {locale} = useI18n()
const loadingProduct = ref<boolean>(false)
const product = ref(null)
const breadcrumbs = computed(() => {
  return route.path
      .split('/')
      .filter((route) => route) // حذف مقدار خالی اول
      .map((route, index, array) => ({
        key: '/' + array.slice(0, index + 1).join('/'), // ساخت مسیر کامل برای هر بخش
        name: route === 'product' ? 'products' : route
      }));
});

// const product = {
//   name: 'Everyday Ruck Snack',
//   href: '#',
//   price: '$220',
//   description:
//       "Don't compromise on snack-carrying capacity with this lightweight and spacious bag. The drawstring top keeps all your favorite chips, crisps, fries, biscuits, crackers, and cookies secure.",
//   imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-04-featured-product-shot.jpg',
//   imageAlt: 'Model wearing light green backpack with black canvas straps and front zipper pouch.',
//   breadcrumbs: [
//     {id: 1, name: 'Travel', href: '#'},
//     {id: 2, name: 'Bags', href: '#'},
//   ],
//   sizes: [
//     {name: '18L', description: 'Perfect for a reasonable amount of snacks.'},
//     {name: '20L', description: 'Enough room for a serious amount of snacks.'},
//   ],
// }
const reviews = {average: 4, totalCount: 1624}

// const selectedSize = ref(product.sizes[0])
async function CreateOrder(){
  await dataStore.CreateOrder()
}
onMounted(async ()=>{
  loadingProduct.value = true
  await dataStore.GetProducts()
  product.value = dataStore?.products[0]
  loadingProduct.value = false
})
</script>
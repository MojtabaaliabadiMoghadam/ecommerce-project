<template>
  <div class="bg-white">
    <div v-if="loadingOrder" class="flex items-center justify-center h-[350px]">
      <LoadingIcon size="24" stroke="2" />
    </div>
    <div v-else class="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{{ $t('messages.shop.orderSummary') }}</h1>
      <form class="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
        <section aria-labelledby="cart-heading" class="lg:col-span-7">
          <h2 id="cart-heading" class="sr-only">Items in your shopping cart</h2>

          <ul role="list" class="divide-y divide-gray-200 border-t border-b border-gray-200">
            <li v-for="(product, productIdx) in dataGlobal?.orderProduct?.orderItems" :key="product.id" class="flex py-6 sm:py-10">
              <div class="shrink-0">
                <img :src="product?.product?.imageSrc || '/images/placeholder.jpg'" :alt="product.imageAlt"
                     class="size-24 rounded-md object-cover sm:size-48"/>
              </div>
              <div class="ms-4 flex flex-1 flex-col justify-between sm:ms-6">
                <div class="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                  <div>
                    <div class="flex justify-between">
                      <h3 class="flex gap-2 text-sm">
                        <span>{{$t('name')}}:</span>
                        <span class="font-medium text-gray-700 hover:text-gray-800">{{product?.product?.translations[locale]?.title }}</span>
                      </h3>
                    </div>
                    <div class="mt-1 flex text-sm pt-2 flex gap-2">
                      <span>{{$t('messages.shop.category')}}:</span>
                      <p  class=" border-gray-200 pl-4 text-gray-500">{{product?.product?.category?.translations[locale]?.title }}</p>
                    </div>
                    <div class="mt-1 flex text-sm pt-2 items-center gap-2">
                      <span>{{$t('messages.shop.price')}}:</span>
                      <p class="mt-1 text-sm font-medium  text-gray-900">{{ product?.product?.price }}</p>
                    </div>
                    <div class="mt-1 flex text-sm pt-2 items-center gap-2">
                      <span>{{$t('messages.general.tax')}}:</span>
                      <p class="mt-1 text-sm font-medium  text-gray-900">{{ product?.product?.tax }}</p>
                    </div>
                    <div class="mt-1 flex text-sm pt-2 items-center gap-2">
                      <span>{{$t('messages.shop.quantity')}}:</span>
                      <p class="mt-1 text-sm font-medium  text-gray-900">{{ product?.quantity }}</p>
                    </div>
                  </div>

                </div>
                <div class="flex items-end justify-between w-full">
                  <p class="mt-4 flex gap-2 text-sm text-gray-700">
                    <CheckIcon v-if="product?.product.status" class="size-5 shrink-0 text-green-500" aria-hidden="true"/>
                    <ClockIcon v-else class="size-5 shrink-0 text-gray-300" aria-hidden="true"/>
                    <span>{{ product?.product.status ? $t('messages.shop.inStock') : `` }}</span>
                  </p>
                  <span>{{ priceFormat(product?.amount,locale)}}</span>
                </div>
              </div>
            </li>
          </ul>
        </section>

        <!-- Order summary -->
        <section aria-labelledby="summary-heading"
                 class="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
          <h2 id="summary-heading" class="text-lg font-medium text-gray-900">{{$t('messages.shop.Order_summary')}}</h2>

          <dl class="mt-6 space-y-4">
            <template v-for="(total,index) in dataGlobal?.orderProduct?.orderTotals" :key="index">
              <div v-if="index + 1 < dataGlobal?.orderProduct?.orderTotals?.length" class="flex items-center justify-between">
                <dt class="text-sm text-gray-600">{{total?.name}}</dt>
                <dd class="text-sm font-medium text-gray-900">{{priceFormat(total?.amount,locale)}}</dd>
              </div>
              <div v-else class="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt class="text-base font-medium text-gray-900">{{total?.name}}</dt>
                <dd class="text-base font-medium text-gray-900">{{priceFormat(total?.amount,locale)}}</dd>
              </div>
            </template>
          </dl>

          <div class="mt-6 flex w-full justify-center">
            <button type="submit"
                    class="w-full text-center rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium
                    text-white shadow-xs hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 focus:outline-hidden">
              {{$t('messages.shop.checkout')}}
            </button>
          </div>
        </section>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ChevronDownIcon} from '@heroicons/vue/16/solid'
import {CheckIcon, ClockIcon, QuestionMarkCircleIcon, XMarkIcon} from '@heroicons/vue/20/solid'
import {useDataGlobal} from "~/stores/globalStore.js";
import LoadingIcon from "~/components/generalElements/LoadingIcon.vue";
const route = useRoute()
const {locale} = useI18n()
const dataGlobal = useDataGlobal()
const loadingOrder = ref<boolean>(false)
function priceFormat(price, locale) {
  // انتخاب فرمت و علامت بر اساس زبان
  const currencySymbol = locale === 'fa' ? 'تومان' : '$';

  // فرمت کردن عدد با سه رقم سه رقم
  const formattedNumber = new Intl.NumberFormat(locale, {
    style: 'decimal',
    maximumFractionDigits: 2,
  }).format(price);

  // برای زبان فارسی، فقط "تومان" نمایش داده می‌شود.
  return `${formattedNumber} ${currencySymbol}`;
}
onMounted(async ()=>{
  loadingOrder.value = true
  await dataGlobal.GetOrder(route.params.id)
  loadingOrder.value = false
})
onUnmounted(()=>{
  dataGlobal.orderProduct = []
})
</script>
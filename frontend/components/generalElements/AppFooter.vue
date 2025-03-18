<template>
  <footer class="bg-white order-last">
    <div class="container flex flex-wrap justify-between gap-12 my-24 md:gap-24">
      <div class="mr-auto">
        <Logo />
        <WebsiteShortDescription />
<!--        <LangSwitcher class="mt-8" />-->
      </div>
      <div class="w-3/7 lg:w-auto">
        <div class="mb-1 font-semibold">Information</div>
        <div class="text-sm">
          <a class="py-1.5 block" href="https://github.com/scottyzen/woonuxt?tab=readme-ov-file#next-generation-front-end-for-woocommerce" target="_blank">About</a>
          <a href="/" class="py-1.5 block">Careers</a>
          <a href="/" class="py-1.5 block">Press</a>
          <a href="https://woonuxt.com/faq" class="py-1.5 block" rel="noreferrer" target="_blank">FAQ's</a>
        </div>
      </div>
      <div class="w-3/7 lg:w-auto">
        <div class="mb-1 font-semibold">Products</div>
        <div class="text-sm">
          <NuxtLink  class="py-1.5 block">{{ $t('messages.shop.newArrivals') }}</NuxtLink>
          <NuxtLink  class="py-1.5 block">On sale</NuxtLink>
          <NuxtLink  class="py-1.5 block">Top rated</NuxtLink>
          <a href="/" class="py-1.5 block">{{ $t('messages.shop.giftCards') }}</a>
        </div>
      </div>
      <div class="w-3/7 lg:w-auto">
        <div class="mb-1 font-semibold">{{ $t('messages.general.customerService') }}</div>
        <div class="text-sm">
          <NuxtLink to="/contact" class="py-1.5 block">Contact Us</NuxtLink>
          <a href="/" class="py-1.5 block">Shipping & Returns</a>
          <a href="/" class="py-1.5 block">Privacy Policy</a>
          <a href="/" class="py-1.5 block">Terms & Conditions</a>
        </div>
      </div>
      <div class="w-3/7 lg:w-auto">
        <div class="mb-1 font-semibold">{{ $t('messages.account.myAccount') }}</div>
        <div class="text-sm">
          <NuxtLink  class="py-1.5 block">{{ $t('messages.account.myAccount') }}</NuxtLink>
          <NuxtLink  class="py-1.5 block">{{ $t('messages.shop.orderHistory') }}</NuxtLink>
          <NuxtLink  class="py-1.5 block">{{ $t('messages.shop.wishlist') }}</NuxtLink>
          <a href="/" class="py-1.5 block">{{ $t('messages.general.newsletter') }}</a>
        </div>
      </div>
    </div>
    <div class="container border-t flex items-center justify-center mb-4">
      <div class="copywrite">
        <p class="py-4 text-xs text-center">
          - by
          <a href="https://scottyzen.com" title="Scott Kennedy - Web Developer" target="_blank">example name</a>
        </p>
      </div>
<!--      <SocialIcons class="ml-auto" />-->
    </div>
  </footer>
</template>
<script setup lang="ts">
import Logo from "~/components/generalElements/Logo.vue";
import WebsiteShortDescription from "~/components/shopElements/WebsiteShortDescription.vue";

</script>

<style scoped lang="postcss">
a {
  @apply hover:underline;
}
</style>

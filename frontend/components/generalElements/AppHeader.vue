<template>
  <header class="sticky top-0 z-40 bg-white shadow-sm shadow-light-500">
    <div class="container flex items-center justify-between py-4">
      <div class="flex items-center gap-3">
        <MenuTrigger class="lg:hidden" />
        <Logo class="md:w-[160px]" />
      </div>
      <MainMenu class="items-center hidden gap-6 text-sm text-gray-500 lg:flex lg:px-4" />
      <div class="flex justify-end items-center md:w-[160px] flex-1 ml-auto gap-4 md:gap-6">
        <ProductSearch class="hidden sm:inline-flex max-w-[320px] w-[60%]" />
        <div class="flex gap-4 items-center">
          <SignInLink />
<!--          <CartTrigger />-->
          <LangSwitcher  />
          <span class="mr-1 mdi mdi-magnify mdi-24px md:mr-0" @click="toggleSearch"/>
        </div>
      </div>
    </div>
    <Transition name="scale-y" mode="out-in">
      <div class="container mb-3 -mt-1 sm:hidden" v-if="isShowingSearch">
        <ProductSearch class="flex w-full" />
      </div>
    </Transition>
  </header>
</template>
<script setup lang="ts">
import MenuTrigger from "~/components/generalElements/MenuTrigger.vue";
import Logo from "~/components/generalElements/Logo.vue";
import MainMenu from "~/components/generalElements/MainMenu.vue";
import ProductSearch from "~/components/shopElements/ProductSearch.vue";
import SearchTrigger from "~/components/generalElements/SearchTrigger.vue";
import CartTrigger from "~/components/cartElements/CartTrigger.vue";

</script>
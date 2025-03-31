<template>
  <header class="sticky top-0 z-40 bg-white shadow-sm shadow-light-500">
    <div class="container flex items-center justify-between py-4 min-h-[80px]">
      <div class="flex items-center gap-3">
        <MenuTrigger class="lg:hidden" />
        <!-- <Logo class="md:w-[160px]" /> -->
      </div>
      <MainMenu class="items-center hidden gap-6 text-sm text-gray-500 lg:flex lg:px-4" />
      <div class="flex justify-end items-center md:w-[160px] flex-1 ml-auto gap-4 md:gap-6">
        <div class="hidden lg:flex gap-4 items-center">
          <SignInLink />
          <LangSwitcher />
        </div>
      </div>
    </div>
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
<template>
  <div class="bg-white flex flex-col max-w-lg shadow-lg top-0 bottom-0 right-0 w-11/12 z-50 fixed overflow-x-hidden">
    <CloseIcon class="bg-white rounded-xl shadow-xl p-1.5" @click="toggleMobileMenu(false)" />
    <div class="mt-8 text-center">{{ $t('messages.general.menu') }}</div>
    <MainMenu class="m-4 grid p-4 text-gray-500 gap-6" />
    <div class="mt-auto text-center p-8 text-[10px] text-gray-400">
      <!--      <a href="/" :title="wooNuxtVersionInfo">WooNuxt v{{ wooNuxtVersionInfo }}</a>-->
    </div>
  </div>
</template>

<script setup lang="ts">
import CloseIcon from "~/components/cartElements/CloseIcon.vue";
import MainMenu from "~/components/generalElements/MainMenu.vue";

const { toggleMobileMenu } = useHelpers();
</script>


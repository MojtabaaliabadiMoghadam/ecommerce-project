<template>
  <nav>
    <NuxtLink to="/" @click="closeSidebar">{{ $t('messages.general.home') }}</NuxtLink>
    <NuxtLink to="/products" @click="closeSidebar">{{ $t('messages.general.allProducts') }}</NuxtLink>
    <NuxtLink to="/categories" @click="closeSidebar">{{ $t('messages.shop.category', 2) }}</NuxtLink>
    <NuxtLink to="/contact" @click="closeSidebar">{{ $t('messages.general.contact') }}</NuxtLink>
    <button class="lg:hidden" @click="CheckAndPushToAccount">حساب کاربری</button>
  </nav>
</template>

<script setup lang="ts">
import { useLoginStore } from "~/stores/loginStore";
import { useRouter } from "vue-router";
const { toggleMobileMenu } = useHelpers();

const loginStore = useLoginStore();
const router = useRouter();

// تابع برای هدایت به حساب کاربری
function CheckAndPushToAccount() {
  console.log('run')
  if (loginStore.isAuthenticated) {
    router.push('/my-account');
  } else {
    router.push('/login');
  }
  toggleMobileMenu(false);
}

// تابع برای بستن منو
function closeSidebar() {
  toggleMobileMenu(false);  // بستن منو
}
</script>

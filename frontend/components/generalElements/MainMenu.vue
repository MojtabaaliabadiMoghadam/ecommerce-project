<template>
  <nav>
    <NuxtLink v-for="link in links" :key="link.to" :to="link.to" @click="closeSidebar"
      class="transition-all ease-in-out duration-300" 
      :class="['hover:text-gray-900 hover:font-bold text-[16px] ', route.path === link.to ? 'text-gray-900 font-bold' : 'text-gray-500']">
      {{ link.label }}
    </NuxtLink>
    <button class="lg:hidden" @click="CheckAndPushToAccount">حساب کاربری</button>
  </nav>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
import { useLoginStore } from "~/stores/loginStore";
import { useRouter } from "vue-router";
const { toggleMobileMenu } = useHelpers();

const loginStore = useLoginStore();
const router = useRouter();
const links = [
  { to: "/", label: "صفحه اصلی" },
  { to: "/products", label: "همه محصولات" },
  { to: "/categories", label: "دسته‌بندی‌ها" },
  { to: "/contact", label: "تماس با ما" }
]
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

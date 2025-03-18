<template>
  <div v-if="socialLoginProviders?.length">
    <div
        class="gap-4"
        :class="'grid gap-4 grid-cols-[repeat(auto-fit,minmax(180px,1fr))] justify-center'">
      <div v-for="(loginClient, index) in socialLoginProviders" :key="index" class="flex items-center gap-3">
        <button
            @click="ChangeStateLogin(loginClient.key)"
            :class="{'!ring-gray-500 font-bold ':loginClient.key === loginStore.loginWith}"
            class="flex items-center justify-center gap-3 p-3 bg-white ring ring-transparent hover:ring-gray-500
            hover:border-gray-500 w-full rounded-lg shadow-sm hover:shadow-md transition ease-in duration-200">
          <span>{{ loginClient.name }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useLoginStore} from "~/stores/loginStore";

const loginStore = useLoginStore()
// حذف وابستگی‌ها به API
const route = useRoute();
const router = useRouter();

// شبیه‌سازی داده‌های تستی برای نمایش المان‌ها
const socialLoginProviders = ref([
  {name: 'ورود با موبایل',key:'mobile'},
  {name: 'ورود با ایمیل',key:'email'}
]);

function ChangeStateLogin (key){
  loginStore.loginWith = key
}
</script>


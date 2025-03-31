<template>
  <button class="hidden sm:inline-flex aspect-square items-center">
    <Transition name="pop-in" mode="out-in">
      <span class="relative avatar">
        <img src="/images/language-icon.png"
          class="rounded-full transform scale-125 shadow-md overflow-hidden border border-white my-auto" width="26"
          height="26" :alt="linkTitle" />
        <div class="account-dropdown">
          <div @click="ChangeLanguage(localeI.code)" v-for="(localeI, index) in prepareLocales" :key="index"
            class="w-[150px] flex items-center justify-start hover:bg-gray-100 py-2 px-2 gap-4"
            :class="{ 'bg-gray-100': locale === localeI.code }">
            <img class="scale-125" width="26" height="26" :src="localeI.icon" :alt="localeI.icon">
            {{ localeI.name }}
          </div>
        </div>
      </span>
    </Transition>
  </button>
</template>
<script setup lang="ts">
import LoadingIcon from "~/components/generalElements/LoadingIcon.vue";
import { useLoginStore } from "~/stores/loginStore";
const loginStore = useLoginStore()
const router = useRouter()
const { locales, locale } = useI18n()

const prepareLocales = computed(() => {
  return locales.value.map((locale) => {
    return {
      name: locale.name,
      icon: ReturnIconByLocale(locale.code),
      code: locale.code
    }
  })
})
function ReturnIconByLocale(key: string) {
  if (key === 'fa') {
    return '/images/flags/iran-flag-icon.svg'
  } else if (key === 'en') {
    return '/images/flags/united-states-flag-icon.svg'
  }
}
function ChangeLanguage(code: any) {
  locale.value = code
}
</script>
<style scoped lang="postcss">
.pop-in-enter-active,
.pop-in-leave-active {
  transition: transform 0.3s;
}

.pop-in-enter-from,
.pop-in-leave-to {
  transform: scale(0);
}

.avatar {
  .account-dropdown {
    @apply absolute gap-2 top-6 -right-2 z-50 p-2 bg-white border border-gray-200 rounded-lg shadow-lg text-sm text-gray-700 hidden;

    a,
    button {
      @apply flex gap-2 items-center p-2 rounded whitespace-nowrap min-w-[200px];
    }
  }

  &:hover .account-dropdown {
    @apply grid;
  }
}
</style>

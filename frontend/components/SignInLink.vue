<template>
  <button @click="CheckAndPushToAccount" class="hidden sm:inline-flex aspect-square items-center">
    <Transition name="pop-in" mode="out-in">
      <span class="relative avatar">
        <img :src="avatar || '/images/account-placeholder.webp'"
          class="rounded-full transform scale-125 shadow-md overflow-hidden border border-white my-auto" width="26"
          height="26" :alt="linkTitle" />
        <div class="account-dropdown">
          <NuxtLink to="/my-account" class="hover:bg-gray-100">
            <span class="mdi mdi-account-outline mdi-24px text-gray-500" /><span>My Account</span>
          </NuxtLink>
          <button class="text-red-600 hover:bg-red-50" @click.prevent="logoutUser">
            <LoadingIcon v-if="isPending" size="16" />
            <span class="mdi mdi-logout mdi-24px"></span>
            <span>Logout</span>
          </button>
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

function CheckAndPushToAccount() {
  if (loginStore.isAuthenticated) {
    router.push('/my-account')
  } else {
    router.push('/login')
  }
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

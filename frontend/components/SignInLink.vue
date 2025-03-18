<template>
  <button @click="CheckAndPushToAccount" title="#" class="hidden sm:inline-flex aspect-square items-center">
    <Transition name="pop-in" mode="out-in">
      <span v-if="avatar" class="relative avatar">
        <img
          :src="avatar"
          class="rounded-full transform scale-125 shadow-md overflow-hidden border border-white my-auto"
          width="22"
          height="22"
          :alt="linkTitle" />
        <div class="account-dropdown">
          <NuxtLink :to="wishlistLink" class="hover:bg-gray-100"><Icon name="ion:heart-outline" size="16" /><span>Wishlist</span></NuxtLink>
          <NuxtLink to="/my-account" class="hover:bg-gray-100"><Icon name="ion:person-outline" size="16" /><span>My Account</span></NuxtLink>
          <button class="text-red-600 hover:bg-red-50" @click.prevent="logoutUser">
            <LoadingIcon v-if="isPending" size="16" />
            <Icon v-else name="ion:log-out-outline" size="16" />
            <span>Logout</span>
          </button>
        </div>
      </span>
      <span v-else class="border mdi mdi-account-outline mdi-24px border-transparent" />
    </Transition>
  </button>
</template>
<script setup lang="ts">
import LoadingIcon from "~/components/generalElements/LoadingIcon.vue";
import {useLoginStore} from "~/stores/loginStore";
const loginStore = useLoginStore()
const router = useRouter()

function CheckAndPushToAccount(){
  if (loginStore.isAuthenticated){
    router.push('/my-account')
  }else{
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
    @apply absolute gap-2 top-6 -right-2  z-50 p-2 bg-white border border-gray-200 rounded-lg shadow-lg text-sm text-gray-700 hidden;

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

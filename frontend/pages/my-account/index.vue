<template>
  <div class="container min-h-[600px]">
    <div v-if="showLoader" class="flex flex-col min-h-[500px]">
      <LoadingIcon class="m-auto"/>
    </div>
    <div v-if="false" class="flex flex-col min-h-[500px]">
      <LoadingIcon class="m-auto"/>
    </div>
    <template v-else>
      <div class="flex flex-col items-start justify-between w-full lg:gap-12 mb-24 lg:flex-row">
        <div class="mt-2 lg:sticky top-16 w-full lg:max-w-[260px]">
          <section class="my-8 flex gap-4 items-start justify-center w-full">
            <div v-if="loadingImage" role="status">
              <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
            <img v-else :src="dataUserStore?.dataUser?.avatar?.media || '/images/avatar_placeholder.jpg'"
                 class="rounded-full w-[48px] h-[48px] object-cover aspect-square border border-white" alt="user-image"/>
            <div class="flex-1 text-balance leading-tight w-full text-ellipsis overflow-hidden">
              <div class="text-lg font-semibold">{{$t('messages.account.welcome')}}, {{userName}}</div>
              <a @click="UploadImage" class="text-blue-500 cursor-pointer hover:text-blue-700">{{$t(titleUploadProfile)}}</a>
              <input type="file" ref="fileInput" @change="handleImageUpload" class="hidden" accept="image/*" />
            </div>
            <button
                class="flex text-gray-700 items-center flex-col p-2 px-4 rounded-lg hover:bg-white hover:text-red-700 lg:hidden"
                @click="logOutUser">
              <LoadingIcon v-if="isPending" size="22" color="#B91C1B"/>
              <Icon v-else name="ion:log-out-outline" size="22"/>
              <small>{{ $t('messages.account.logout') }}</small>
            </button>
          </section>
          <hr class="my-8"/>
          <nav class="flex text-gray-700 lg:grid flex-wrap w-full gap-1.5 my-8 min-w-[240px] lg:w-auto items-start">
            <NuxtLink to="/my-account?tab=my-details" class="flex items-center gap-4 p-2 px-4"
                      :class="{ active: activeTab == 'my-details' }">
              <span class="mdi mdi-24px mdi-information-outline" />
              {{ $t('messages.general.myDetails') }}
            </NuxtLink>
            <NuxtLink to="/my-account?tab=authentication" class="flex items-center gap-4 p-2 px-4"
                      :class="{ active: activeTab == 'authentication' }">
              <span class="mdi mdi-24px mdi-account-box-outline" />
              {{ $t('messages.account.title_auth') }}
            </NuxtLink>
            <NuxtLink to="/my-account?tab=orders" class="flex items-center gap-4 p-2 px-4"
                      :class="{ active: activeTab == 'orders' }">
              <span class="mdi mdi-24px mdi-bag-personal-outline" />
              {{ $t('messages.shop.order', 2) }}
            </NuxtLink>
            <NuxtLink to="/my-account?tab=bank-transaction" class="flex items-center gap-4 p-2 px-4"
                      :class="{ active: activeTab == 'bank-transaction' }">
              <span class="mdi mdi-24px mdi-cash-clock" />
              {{ $t('تراکنش های بانکی') }}
            </NuxtLink>
<!--            <NuxtLink to="/my-account?tab=wishlist" class="flex items-center gap-4 p-2 px-4"-->
<!--                      :class="{ active: activeTab == 'wishlist' }">-->
<!--              <span class="mdi mdi-24px mdi-heart-outline" />-->
<!--              علاقه مندی-->
<!--            </NuxtLink>-->
          </nav>
          <div class="hidden lg:block">
            <hr class="my-8"/>
            <button
                class="flex text-gray-700 items-center gap-4 p-2 px-4 w-full rounded-lg hover:bg-white hover:text-red-700"
                @click="logOutUser">
              <LoadingIcon v-if="isPending" size="22"/>
              <span v-else class="mdi mdi-24px mdi-logout" />
              {{ $t('messages.account.logout') }}
            </button>
          </div>
        </div>
        <main class="flex-1 w-full lg:my-8 rounded-lg max-w-screen-lg lg:sticky top-24">
          <AccountMyDetails v-if="activeTab === 'my-details'" />
          <Authentication v-if="activeTab === 'authentication'" />
          <CustomOrderList v-else-if="activeTab === 'orders'"/>
<!--          <CustomOrderList v-else-if="activeTab === 'bank-transaction'"/>-->
<!--          <WishList v-else-if="activeTab === 'wishlist'"/>-->
        </main>
      </div>
    </template>
  </div>
</template>
<script lang="ts" setup>
import LoadingIcon from "~/components/generalElements/LoadingIcon.vue";
import WishList from "~/components/shopElements/WishList.vue";
import {useLoginStore} from "~/stores/loginStore";
import {useAuth} from "~/composables/useAuth";
import {useDataUserStore} from "~/stores/userDataStore";
import CustomOrderList from "~/components/CustomOrderList.vue";
import Authentication from "~/components/Profile/Authentication.vue";
const loginStore = useLoginStore()
const router = useRouter();
const {isFilled,getUrl,fetchData,showErrorToast,showSuccessToast} = useHelpers()
const route = useRoute();
const userName = ref<string>('')
const isPending = ref<boolean>(false)
const dataUserStore= useDataUserStore()
const loadingImage = ref<boolean>(false)
const {isLogin} = useAuth()
const activeTab = computed(() => route.query.tab || 'my-details');
const showLoader = false
const imageProfileSelected = ref<string>('')
const logOutUser = async () => {
  isPending.value = true;
  try {
    await loginStore.logout();
  } catch (error) {
  } finally {
    isPending.value = false;
  }
};
const titleUploadProfile = computed(()=>{
  if (isFilled(dataUserStore.dataUser.avatar?.media)){
    return 'messages.account.edit_avatar'
  }else {
    return 'messages.account.upload_avatar'
  }
})
useSeoMeta({
  title: `My Account`,
});

async function UpdateAvatar(idInput:any) {
  try {
    let url = getUrl('/web/profile/add-avatar')
    const {status, data, message} = await fetchData({
      method: 'PUT',
      url,
      authorization: true,
      data:{
        avatar_id:idInput
      }
    })
    if (status == 200) {
      dataUserStore.dataUser = data?.user
      loadingImage.value = false
    } else {
      showErrorToast(message)
      imageProfileSelected.value = ''
      loadingImage.value = false
    }
  } catch (error) {
    showErrorToast(error)
  }
}

const handleImageUpload = async (event) => {
  loadingImage.value = true
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    imageProfileSelected.value = input.files[0]
    const idResult = await dataUserStore.UploadImage('avatar',imageProfileSelected.value)
    if (idResult){
      await UpdateAvatar(idResult)
    }
  }
};
const fileInput = ref(null);
const UploadImage = () => {
  fileInput.value.click();
};

onMounted(async ()=>{
  if (!loginStore.isAuthenticated){
    await router.push('/login')
  }
  await dataUserStore.getUserData()
  userName.value = dataUserStore.dataUser.name
})
</script>
<style lang="postcss" scoped>
nav a {
  @apply rounded-md;

  &.active,
  &:focus,
  &:hover {
    @apply bg-white shadow;
  }

  & svg {
    @media (max-width: 640px) {
      display: none !important;
    }
  }
}
</style>

<template>
  <div v-if="loadingGetDataAuth" class="h-[40vh] w-full flex items-center justify-center" role="status">
    <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
  </div>
  <div v-else class="grid gap-8 account-form">
    <form class="bg-white rounded-lg shadow" @submit.prevent="saveChanges">
      <div class="grid gap-6 p-8 md:grid-cols-2">
        <h3 class="text-xl font-semibold col-span-full">{{ $t('messages.account.title_auth') }}</h3>
        <template v-for="(value, key) in listOFAuth">
          <BoxAuthentication
              v-if="key === 'email' || key === 'mobile'"
              :is_valid="value?.is_verified"
              :key_custom="key"
              :label="$t(getTitle(key))"
              v-model="dataUserStore.dataUser[key]"
          />
          <BoxAuthwithFile
              v-else
              :type="key"
              :label="$t(getTitle(key))"
              v-model="dataUserStore.dataUser[key]"
              :result="value?.result"
              @fetch-again="getListAuth"
          />
        </template>
      </div>
<!--      <div class="bg-white backdrop-blur-sm bg-opacity-75 border-t col-span-full p-4 sticky bottom-0 rounded-b-lg">-->
<!--        <button-->
<!--            class="rounded-md flex font-semibold ml-auto text-white py-2 px-4 gap-4 items-center disabled:bg-gray-400 disabled:cursor-not-allowed"-->
<!--            :class="button.color"-->
<!--            :disabled="loading">-->
<!--          <LoadingIcon v-if="loading" color="#fff" size="20"/>-->
<!--          <span>{{ button.text }}</span>-->
<!--        </button>-->
<!--      </div>-->
    </form>
  </div>
</template>

<script setup lang="ts">
import LoadingIcon from "~/components/generalElements/LoadingIcon.vue";
import {useDataUserStore} from "~/stores/userDataStore";
import BoxAuthentication from "~/components/Profile/BoxAuthentication.vue";
import DateConverter from "~/helpers/DateConverter";
import {as} from "@faker-js/faker/dist/airline-BcEu2nRk";
import {awaitExpression} from "@babel/types";
import BoxAuthwithFile from "~/components/Profile/BoxAuthwithFile.vue";
const {getUrl, fetchData, showSuccessToast, showErrorToast,objectOrArrayIsNotEmpty} = useHelpers()
const {t} = useI18n();
const loadingGetDataAuth = ref<boolean>(false)
const loading = ref<boolean>(false);
const button = ref<{ text: string; color: string }>({
  text: t('messages.account.updateDetails'),
  color: 'bg-primary hover:bg-primary-dark'
});
const getTitle = (type: string): string => {
  const titles: Record<string, string> = {
    mobile: "messages.account.mobile",
    email: "messages.account.email",
    passport: "messages.account.passport",
    id_card: "messages.account.id_no",
  };

  return titles[type] || "نامشخص";
};

const prepareKey = (type: string): string => {
  const titles: Record<string, string> = {
    mobile: "mobile",
    email: "email",
    passport: "karte_melli",
    id_card: "id_card",
  };

  return titles[type] ;
};

const dataUserStore = useDataUserStore()
const listOFAuth = ref({})
async function getListAuth(){
  let url = getUrl('web/authentication')
  try {
    const {status,message,data} = await fetchData({
      url,
      method:'GET',
      authorization:true
    })
    if (status == 200){
      listOFAuth.value = data
    }else{
      showErrorToast(message)
    }
  }catch (error){

  }finally {
    loadingGetDataAuth.value = false
  }
}
onMounted(async ()=>{
  loadingGetDataAuth.value = true
  await dataUserStore.getUserData()
  await getListAuth()
})
</script>
<style scoped>
</style>

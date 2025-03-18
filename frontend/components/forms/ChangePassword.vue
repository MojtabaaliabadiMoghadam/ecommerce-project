<template>
  <form class="bg-white rounded-lg shadow mt-4" @submit.prevent="updatePassword">
    <div class="grid p-8 gap-6 md:grid-cols-2">
      <h3 class="font-semibold text-xl col-span-full">{{ $t('messages.account.changePassword') }}</h3>


      <div class="w-full">
        <label for="new-password">{{ $t('messages.account.newPassword') }}</label>
        <PasswordInput id="new-password" type="text" required  v-model="formData.password"/>
      </div>

      <div class="w-full">
        <label for="new-password-confirm">{{ $t('messages.account.confirmNewPassword') }}</label>
        <PasswordInput id="new-password-confirm" type="text" required  v-model="formData.password_confirmation"/>
      </div>

      <Transition name="scale-y" mode="out-in">
        <div v-if="errorMessage" class="w-full text-sm text-red-500" v-html="errorMessage"></div>
      </Transition>
    </div>

    <div class="bg-white backdrop-blur-sm bg-opacity-75 border-t col-span-full p-4 sticky bottom-0 rounded-b-lg">
      <button
        class="rounded-md flex font-semibold ml-auto text-white py-2 px-4 gap-4 items-center disabled:bg-gray-400 disabled:cursor-not-allowed"
        :class="button.color"
        :disabled="loading">
        <LoadingIcon v-if="loading" color="#fff" size="20" />
        <span>{{ button.text }}</span>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import PasswordInput from "~/components/forms/PasswordInput.vue";
import LoadingIcon from "~/components/generalElements/LoadingIcon.vue";
import DateConverter from "~/helpers/DateConverter";
interface IFormData {
  password?:string,
  password_confirmation?:string
}
const formData = ref<IFormData>({
  password:'',
  password_confirmation:''
})
const { t } = useI18n();
const {getUrl, fetchData, showSuccessToast, showErrorToast} = useHelpers()

const password = ref<{ new: string; confirm: string }>({ new: '', confirm: '' });
const loading = ref<boolean>(false);
const button = ref<{ text: string; color: string }>({ text: t('messages.account.updatePassword'), color: 'bg-primary hover:bg-primary-dark' });
const errorMessage = ref<string>('');


async function updatePassword(){
  loading.value = true
  let url = getUrl('web/profile/change-password')
  const {status,message,data} = await fetchData({
    url,
    method:'POST',
    data:formData.value,
    authorization:true
  })
  if (status == 200){
    showSuccessToast(message)
    loading.value = false
    formData.value = {}
  }else{
    showErrorToast(message)
    loading.value = false
  }
}
</script>

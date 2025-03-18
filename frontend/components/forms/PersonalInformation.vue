<template>
  <form  class="bg-white rounded-lg shadow" @submit.prevent="saveChanges">
    <div class="grid gap-6 p-8 md:grid-cols-2">
      <h3 class="text-xl font-semibold col-span-full">{{ $t('messages.account.personalInfo') }}</h3>
      <BaseInput :label="$t('messages.billing.name')" v-model="dataUserStore.dataUser.name"/>
      <BaseInput :label="$t('messages.account.melli_code')" v-model="dataUserStore.dataUser.code_melli"/>
      <div class="w-full">
        <label class="text-xs mb-1 text-gray-600 inline-block uppercase">{{$t('messages.account.gender')}}</label>
        <div style="height: 44px" class="flex items-center gap-5">
          <CartElementsRadioButton v-for="option in genders" v-model="dataUserStore.dataUser.gender"
                       :id="option.value"
                       :value="option.value"
                       :name="option.name"
                       :label="$t(option.name)"
          />
        </div>
      </div>
      <div class="w-full">
        <CustomDatePicker
            v-model="dataUserStore.dataUser.birthday"
            :label="$t('messages.account.birth_date')"
            id="date-picker-pricing-rate"
        />
      </div>
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
import LoadingIcon from "~/components/generalElements/LoadingIcon.vue";
import {useDataUserStore} from "~/stores/userDataStore";
import CustomDatePicker from "~/components/forms/CustomDatePicker.vue";
import DateConverter from "~/helpers/DateConverter";
import BaseInput from "~/components/forms/BaseInput.vue";
const {getUrl, fetchData, showSuccessToast, showErrorToast} = useHelpers()

const { t } = useI18n();
const loading = ref<boolean>(false);
const button = ref<{ text: string; color: string }>({ text: t('messages.account.updateDetails'), color: 'bg-primary hover:bg-primary-dark' });
const dataUserStore= useDataUserStore()

const genders = [
  {name:'messages.account.male',value:'man'},
  {name:'messages.account.female',value:'woman'},
]

async function saveChanges(){
  loading.value = true
  let url = getUrl('web/profile/change-profile')
  const {status,message,data} = await fetchData({
    url,
    method:'POST',
    data:{
      name:dataUserStore.dataUser.name,
      code_melli:dataUserStore.dataUser.code_melli,
      gender:dataUserStore.dataUser.gender,
      birthday:DateConverter.convertDateFormat(dataUserStore.dataUser.birthday, 'yyyy-MM-dd', 'gregorian'),
    },
    authorization:true
  })
  if (status == 200){
    showSuccessToast(message)
    await dataUserStore.getUserData()
    loading.value = false
  }else{
    showErrorToast(message)
    loading.value = false
  }
}
</script>

<template>
  <div
      class="w-full relative transition-all duration-300 overflow-hidden flex gap-3 flex-col py-2 bg-gray-100 rounded-xl px-4"
      :class="isExpanded ? props?.result?.status != 'pending' ? 'h-[200px]' :'h-[200px]' : 'h-[120px]'">
    <label for="first-name">{{ props.label }}</label>
    <input
        :id="props.id"
        v-model="model"
        class="border-none focus:ring-0 rounded-xl py-3"
        autocomplete="given-name"
        type="text"/>
    <div v-if="checkStatusByTypeInBadge === 'not-valid'"
         class="absolute left-6 top-[52px] flex items-center justify-center bg-red-500 rounded-full h-[30px] w-[30px]">
      <span class="mdi mdi-24px mdi-close text-white"/>
    </div>
    <div v-if="checkStatusByTypeInBadge === 'not-valid'" class="absolute cursor-pointer left-16 top-[52px] flex items-center justify-center bg-[#020617] px-3
             transition-all ease-in duration-150 rounded-md h-[30px] select-none" @click="isExpanded = !isExpanded">
            <span class="text-white">
              {{ $t("messages.account.title_auth") }}
            </span>
    </div>
    <div v-else class="absolute cursor-pointer left-16 top-[52px] flex items-center justify-center px-3
             transition-all ease-in duration-150 rounded-md h-[30px] select-none"
         :class="[getThemeResult(checkStatusByTypeInBadge)]" @click="isExpanded = !isExpanded">
            <span class="text-white">
              {{ $t(checkStatusByTypeInBadge) }}
            </span>
    </div>
    <div v-if="isExpanded" class="flex flex-col h-full items-center justify-between pt-5 gap-3">
      <div
          v-if="!objectOrArrayIsNotEmpty(props.result) || checkStatusByTypeInBadge === 'accept' || checkStatusByTypeInBadge === 'reject' || checkStatusByTypeInBadge === 'cancel'"
          class="flex items-center justify-between w-full gap-3">
        <Button @click="UploadImage" icon="mdi mdi-upload-outline" :label="$t(titleButtonUploadMellicode)"
                severity="contrast"/>
        <input type="file" ref="fileInput" @change="handleImageUpload" class="hidden" accept="image/*"/>
        <Button @click="uploadFileOnServer" :loading="loadingUploadFile" icon="mdi mdi-check" :label="$t('messages.account.confirm')"/>
      </div>
      <div v-else class="w-full flex flex-col gap-3 justify-start items-center">
        <div class="flex items-center justify-between w-full px-6">
          <span>{{ $t('status') }}</span>
          <Button class=" h-[18px]" :label="$t(checkStatusByTypeInBadge)"
                  :severity="getColorResult(checkStatusByTypeInBadge)" rounded/>
          <Button v-if="props?.result?.status === 'pending'" :loading="loadingCancel" class="h-[18px]"
                  @click="CancelSend" :label="$t('cancel_send')" severity="danger"/>
        </div>
        <div v-if="checkStatusByTypeInBadge === 'reject'" class="flex items-center justify-between w-full px-6">
          <span class="text-red-400 font-medium">{{ $t('reason_reject') }}</span>
          <span class="text-red-700 font-bold truncate w-3/4">{{ props?.result?.reject_reason }}</span>
        </div>
        <div v-if="checkStatusByTypeInBadge === 'accept'" class="flex items-center justify-between w-full px-6">
          <span class="text-green-400 font-medium">{{ $t('date') }}</span>
          <span class="text-green-700 font-bold truncate w-3/4">{{ props?.result?.accept_at }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
interface IAuthRecord {
  id: number;
  media_upload_id: string;
  type: "id_card" | "passport" | "email" | "mobile" | string; // تایپ‌های ممکن
  status: "pending" | "cancel" | "reject" | 'accept'; // وضعیت‌های ممکن
  accept_at: string | null;
  accept_by: string | null;
  cancel_at: string | null;
  created_at: string;
  updated_at: string;
  reject_at: string | null;
  reject_by: string | null;
  reject_reason: string | null;
}

import Button from "primevue/button";

const {getUrl, fetchData, showSuccessToast, showErrorToast, objectOrArrayIsNotEmpty} = useHelpers()
import {useDataUserStore} from "~/stores/userDataStore";

const dataUserStore = useDataUserStore()
const isExpanded = ref(false);
const emit = defineEmits(['fetch-again'])

interface IProps {
  label?: string;
  type?: string;
  id?: string;
  result?: IAuthRecord
}

const props = defineProps<IProps>()
const model = defineModel()
const fileInput = ref(null);
const UploadImage = () => {
  fileInput.value.click();
};
const titleButtonUploadMellicode = computed(() => {
  if (fileImage.value) {
    return 'messages.account.file_change'
  } else {
    return 'messages.account.upload_melli_code'
  }
})
const getThemeResult = (type: string): string => {
  const titles: Record<string, string> = {
    pending: "bg-yellow-500",
    cancel: "bg-red-500",
    reject: "bg-red-500",
    accept: "bg-green-500",
  };

  return titles[type] || "نامشخص";
};
const getColorResult = (type: string): string => {
  const titles: Record<string, string> = {
    pending: "warn",
    cancel: "contrast",
    reject: "danger",
    accept: "Success",
  };

  return titles[type] || "نامشخص";
};
const fileImage = ref(null)
const idFileImage = ref(null)
const handleImageUpload = async (event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    fileImage.value = input.files[0]
  }
};
const loadingCancel = ref<boolean>(false)

async function CancelSend() {
  loadingCancel.value = true
  let url = getUrl(`web/authentication/${props?.result?.id}/cancel`)
  try {
    const {status, message, data} = await fetchData({
      url,
      method: 'GET',
      authorization: true
    })
    if (status == 200) {
      isExpanded.value = false
      emit('fetch-again')
    } else {
      showErrorToast(message)
    }
  } catch (error) {

  } finally {
    loadingCancel.value = false
  }
}

async function storeFile() {
  let url = getUrl('web/authentication')
  try {
    const {status, message, data} = await fetchData({
      url,
      method: 'POST',
      authorization: true,
      data: {
        type: props.type,
        file_id: idFileImage.value
      }
    })
    if (status == 200) {
      isExpanded.value = false
      emit('fetch-again')
    } else {
      showErrorToast(message)
    }
  } catch (error) {

  } finally {
    loadingUploadFile.value = false
  }
}
const loadingUploadFile = ref<boolean>(false)
async function uploadFileOnServer() {
  loadingUploadFile.value = true
  idFileImage.value = await dataUserStore.UploadImage(props.type, fileImage.value)
  await storeFile()
}

const checkStatusByTypeInBadge = computed(() => {
  if (objectOrArrayIsNotEmpty(props.result)) {
    return props?.result?.status
  } else {
    return 'not-valid'
  }
})
</script>
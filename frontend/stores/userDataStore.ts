import {defineStore} from "pinia";
import {useCookie} from "#app";
import DateConverter from "~/helpers/DateConverter";
interface IAvatar {
    collection?:string;
    media?:string;
    id?:number;
}
interface IUser {
    id?: number;
    name?: string | null;
    email?: string | null;
    email_verified_at?: string | null;
    mobile?: string;
    mobile_prefix?: string;
    mobile_verified_at?: string | null;
    code_melli?: string | null;
    birthday?: string | null;
    gender?: string | null;
    avatar_id?: number | null;
    avatar?: IAvatar | null;
    created_at?: string;
    deleted_at?: string | null;
}

export const useDataUserStore = defineStore("user", () => {
    const {getUrl, fetchData, showSuccessToast, showErrorToast,extractDate} = useHelpers()

    const dataUser = ref<IUser>({})

    async function getUserData() {
        try {
            let url = getUrl('auth/me')
            const {status, data, message} = await fetchData({
                method: 'GET',
                url,
                authorization: true
            })

            if (status == 200) {
                dataUser.value = {
                    ...data,
                    birthday:DateConverter.convertDateFormat(extractDate(data?.birthday), 'yyyy/MM/dd', 'jalali')
                }
            } else {
                showErrorToast(message)
            }
        } catch (error) {
            showErrorToast(error)
        }
    }

    async function UploadImage(type:string,file:any) {
        try {
            let url = getUrl('upload')
            const formData = new FormData();
            formData.append('collection', type);  // داده‌ی collection
            formData.append('file', file);        // فایل
            const {status, data, message} = await fetchData({
                method: 'POST',
                url,
                headers:{
                    "Content-Type": "multipart/form-data",
                },
                authorization: true,
                data:formData
            })

            if (status == 200) {
                showSuccessToast(message)
                return data?.id
            } else {
                showErrorToast(message)
                return null
            }
        } catch (error) {
            showErrorToast(error)
        }
    }
    return {
        getUserData,
        dataUser,
        UploadImage
    }
})

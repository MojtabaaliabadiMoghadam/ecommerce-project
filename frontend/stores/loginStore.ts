import { defineStore } from "pinia";
import { useCookie } from "#app";

export const useLoginStore = defineStore("login", () => {
    const loginStatus = ref<'login' |  'login-otp' | 'login-password'>('login')
    const loginWith = ref<'mobile' | 'email'>('mobile')
    const mobile = ref<string>('')
    const email = ref<string>('')
    const { getUrl, fetchData ,showSuccessToast,showErrorToast} = useHelpers()
    const router = useRouter()
    const isAuthenticated = computed(() => !!useCookie('auth_token').value);
    // ذخیره secret در کوکی (با زمان انقضا 5 دقیقه)
    const secret = useCookie<string | null>("login_secret", { maxAge: 300 })

    // مدیریت OTP
    const otpTimer = ref<number>(0)
    const otpTryCount = ref<number>(0)
    const maxTry = ref<number>(5)
    const otp = ref(['', '', '', '', '']);
    const finalOtp = ref('');

    async function RequestForm() {
        let url = getUrl('auth/request')
        const requestData: Record<string, any> = {
            type: loginWith.value,
        }
        if (loginWith.value === 'mobile' && mobile.value) {
            requestData.mobile = mobile.value
            requestData.mobile_prefix = "+98"
        } else if (email.value) {
            requestData.email = email.value
        }
        const { status, message, data } = await fetchData({ method: 'POST', url, data: requestData })
        if (status == 200) {
            showSuccessToast(message)
            if (data.secret) {
                secret.value = data.secret // ذخیره secret در کوکی
            }

            if (data.type === 'login-otp' || data.type === 'register') {
                otpTimer.value = data?.code?.timer
                otpTryCount.value = data?.code?.try_count
                maxTry.value = data?.code?.max_try
                loginStatus.value = 'login-otp'
            } else {
                loginStatus.value = 'login-password'
            }
        } else {
            showErrorToast(message)
        }
    }

    async function resendOTP() {
        if (otpTryCount.value >= maxTry.value) {
            showErrorToast('شما بیش از حد درخواست داده اید دقایق دیگر امتحان کنید!')
            return
        }

        try {
            let url = getUrl('auth/resend')
            const {status,data,message} = await fetchData({
                method: 'POST',
                url,
                data: { secret: secret.value }
            })

            if (status == 200) {
                otpTimer.value = data.code.timer
                maxTry.value = data.code.max_try
                otpTryCount.value = data.code.try_count
                showSuccessToast(message)
            } else {
                showErrorToast(message)
            }
        } catch (error) {
            console.error('Resend OTP failed', error)
        }
    }

    async function verifyOTP() {
        try {
            let url = getUrl('auth/login-otp')
            const {status,message,data} = await fetchData({
                method: 'POST',
                url,
                data: { otp:finalOtp.value, secret: secret.value }
            })
            if (status == 200) {
                const token = useCookie<string | null>("auth_token", { maxAge: 60 * 60 * 24 * 7 }) // 7 روز ذخیره
                token.value = data?.token?.access_token
                secret.value = null
                showSuccessToast(message)
                await router.push('/my-account')
            }else{
                showErrorToast(message)
            }
        } catch (error) {
            console.error('Invalid OTP', error)
        }
    }

    async function loginWithPassword(password: string) {
        try {
            let url = getUrl('auth/login-password')
            const {status,data,message} = await fetchData({
                method: 'POST',
                url,
                data: { password, secret: secret.value }
            })

            if (status == 200 && data.token) {
                const token = useCookie<string | null>("auth_token", { maxAge: 60 * 60 * 24 * 7 })
                token.value = data?.token?.access_token
                secret.value = null
                showSuccessToast(message)
                await router.push('/my-account')
            } else {
                showErrorToast(message)
            }
        } catch (error) {
            console.error('Login failed', error)
        }
    }

    async function logout() {
        try {
            let url = getUrl('auth/logout')
            const {status,message,data} = await fetchData({
                method: 'POST',
                url,
                authorization:true
            })
            if (status == 200) {
                showSuccessToast(message)
                const token = useCookie<string | null>("auth_token");
                token.value = null;
                await router.push('/login')
            }else{
                showErrorToast(message)
            }
        } catch (error) {
            console.error('Invalid OTP', error)
        }
    }

    return {
        mobile,
        email,
        loginStatus,
        RequestForm,
        loginWith,
        resendOTP,
        otpTimer,
        otpTryCount,
        verifyOTP,
        loginWithPassword,
        otp,
        finalOtp,
        isAuthenticated,
        logout
    }
})

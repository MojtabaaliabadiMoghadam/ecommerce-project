import { defineNuxtRouteMiddleware, useCookie, useRouter } from '#app'
import { useLoginStore } from '~/stores/loginStore'

export default defineNuxtRouteMiddleware((to, from) => {
    const login_secret = useCookie('login_secret')
    const token = useCookie('auth_token')
    const loginStore = useLoginStore()
    const router = useRouter()

    // اگر در صفحه حساب کاربری هستید و توکن وجود ندارد، کاربر را به صفحه لاگین هدایت کنید
    if (to.path === '/my-account' && !token.value) {
        return router.push('/login')
    }

    // اگر secret موجود باشد، وضعیت لاگین را تغییر دهید
    if (login_secret.value) {
        loginStore.loginStatus = 'login-otp'
    }
})

import {useCookie} from "#app";

export function useAuth() {
    // ایجاد یک کوکی برای ذخیره توکن
    const token = useCookie<string | null>('auth_token', {
        maxAge: 60 * 60 * 24 * 7, // انقضای کوکی (۷ روز)
        httpOnly: false, // اگر بخواهید در کلاینت قابل دسترسی باشد، false بگذارید
        secure: process.env.NODE_ENV === 'production', // در حالت production کوکی را امن کنید
        sameSite: 'strict', // جلوگیری از ارسال کوکی به سایت‌های دیگر
        path: '/' // مسیر کوکی
    })
    const isLogin = computed(() => !!useCookie('auth_token').value);
    // ذخیره توکن در کوکی
    const setToken = (newToken: string) => {
        token.value = newToken
    }

    // دریافت مقدار توکن (در واقع از useCookie می‌خوانیم)
    const getToken = () => token.value

    // حذف توکن از کوکی
    const removeToken = () => {
        token.value = null
    }

    return { token, setToken, getToken, removeToken ,isLogin}
}

<template>
  <div ref="parent" class="max-w-lg mx-auto my-16 min-h-[600px] text-center px-8">
    <div class="flex flex-col my-2">
      <h1 class="text-xl font-semibold lg:text-3xl">{{formTitle}}</h1>
      <p class="text-gray-500 mt-2">{{formDescription}}</p>
    </div>

    <LoginProviders v-if="loginStore.loginStatus === 'login'" class="my-8"/>
    <form class="mt-6" @submit.prevent="handleFormSubmit">
      <Transition name="fade" mode="out-in">
        <div v-if="loginStore.loginStatus === 'login'">
          <input dir="ltr" class="mt-1 rounded-lg mb-4 w-full font-bold  py-3" v-model="inputValue"
                 :placeholder="inputPlaceholder[loginStore.loginWith]"
                 autocomplete="username" type="text" required />
        </div>

        <!-- ورود با OTP -->
        <div v-else-if="loginStore.loginStatus === 'login-otp'">
          <div dir="ltr" class="flex items-center md:gap-5 justify-between md:justify-center">
            <input
                v-for="(digit, index) in loginStore.otp"
                :key="index"
                type="text"
                inputmode="numeric"
                maxlength="1"
                class="max-w-[3.813rem] text-center py-3 px-3 rounded-lg text-base mb-4 leading-6 font-normal bg-asa-transparency-10
               text-asa-text-900 border-0 ring-1 ring-inset ring-asa-transparency-30 read-only:bg-asa-transparency-40
                read-only:ring-transparent read-only:focus:ring-transparent disabled:text-asa-text-500 disabled:bg-asa-black-5
                disabled:ring-transparent focus:ring-2 focus:ring-inset focus:ring-asa-primary-300 placeholder:text-asa-text-500"
                v-model="loginStore.otp[index]"
                @input="onInput(index, $event)"
                @keydown="onKeydown(index, $event)"
            />
          </div>
          <Transition name="fade" mode="out-in">
            <div v-if="isLoadedCountDown">
              <Transition name="fade" mode="out-in">
                <a v-if="countdown > 0" class="mt-2 text-gray-500 selected">
                  ارسال مجدد در {{ countdown }} ثانیه
                </a>
                <div v-else class="flex items-center justify-center gap-2">
                  <span class="font-bold text-gray-500">کد تایید را دریافت نکردید ؟ </span>
                  <a  @click="resendCode" class=" text-blue-500 cursor-pointer">
                    ارسال مجدد کد تایید
                  </a>
                </div>
              </Transition>
            </div>
          </Transition>
        </div>

        <!-- ورود با رمز عبور -->
        <div v-else-if="loginStore.loginStatus === 'login-password'">
          <PasswordInput v-model="passwordValue" :placeholder="passwordLabel" autocomplete="current-password" required />
        </div>
      </Transition>

      <!-- دکمه ورود -->
      <button class="flex items-center justify-center gap-4 my-6 text-lg h-[32px] bg-gray-700 hover:bg-gray-900 rounded-lg mb-4 w-full font-bold  py-3 text-white" type="submit">
        <LoadingIcon v-if="isPending" stroke="4" size="16" color="#fff"/>
        <span v-else>{{ buttonText }}</span>
      </button>
      <button v-if="loginStore.loginStatus === 'login-otp'"
              @click="loginStore.loginStatus = 'login'"
              type="button"
              class="flex items-center justify-center gap-4 my-6 text-lg h-[32px] bg-white text-black
               ring-2 ring-transparent hover:ring-gray-300 hover:border-gray-500 rounded-lg mb-4 font-bold w-full py-3">
        <span>{{titleButtonComputed}}</span>
      </button>

    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useLoginStore } from "~/stores/loginStore";
import LoginProviders from "~/components/forms/LoginProviders.vue";
import PasswordInput from "~/components/forms/PasswordInput.vue";
import LoadingIcon from "~/components/generalElements/LoadingIcon.vue";
import autoAnimate from "@formkit/auto-animate"
const loginStore = useLoginStore();
const route = useRoute();
const router = useRouter();
const isPending = ref(false);
const passwordValue = ref("");
const parent = ref(null);
const isLoadedCountDown = ref<boolean>(false)
const countdown = ref<number|null>(null);

const titleButtonComputed = computed(()=>{
  if (loginStore.loginWith === 'mobile'){
    return 'تغییر شماره موبایل'
  }else{
    return 'تغییر ایمیل'
  }
})

const handleFormSubmit = async () => {
  isPending.value = true;
  try {
    if (loginStore.loginStatus === "login") {
      await loginStore.RequestForm();
    } else if (loginStore.loginStatus === "login-otp") {
      await loginStore.verifyOTP();
    } else if (loginStore.loginStatus === "login-password") {
      await loginStore.loginWithPassword(passwordValue.value);
    }
  } catch (error) {
  } finally {
    isPending.value = false;
  }
};

const formTitle = computed(() => {
  switch (loginStore.loginStatus) {
    case "login":
      return "همه‌چیز از اینجا شروع می‌شود";
    case "login-otp":
      return "کد اهراز هویت";
    case "login-password":
      return "رمز عبور خود را وارد کنید";
    default:
      return "ورود به حساب کاربری";
  }
});

const formDescription = computed(() => {
  switch (loginStore.loginStatus) {
    case "login":
      return "برای دسترسی به اطلاعات لطفاً یکی از روش‌های زیر را انتخاب کنید.";
    case "login-otp":
      return "کد ارسال‌شده به موبایل خود را در باکس زیر وارد کنید.";
    case "login-password":
      return "رمز عبور مربوط به حساب خود را وارد نمایید.";
    default:
      return "به حساب خود وارد شوید و از امکانات سایت استفاده کنید.";
  }
});

const inputValue = computed({
  get: () => (loginStore.loginWith === "mobile" ? loginStore.mobile : loginStore.email),
  set: (value) => {
    if (loginStore.loginWith === "mobile") {
      loginStore.mobile = value;
    } else {
      loginStore.email = value;
    }
  },
});

const buttonText = computed(() => {
  if (loginStore.loginStatus === "login") {
    return "بعدی";
  } else if (loginStore.loginStatus === "login-otp") {
    return "تایید کد";
  } else if (loginStore.loginStatus === "login-password") {
    return "ورود";
  }
});

const inputPlaceholder = computed(() => ({
  email: "johndoe@gmail.com",
  mobile: "915 222 22 22",
}));

const passwordLabel = computed(() => "رمز عبور خود را وارد کنید");

const onInput = (index, event) => {
  const value = event.target.value.replace(/[^۰-۹0-9]/g, '');
  loginStore.otp[index] = value;

  if (value && index < loginStore.otp.length - 1) {
    event.target.nextElementSibling.focus(); // Move focus to the next input
  }
};

// Keydown handler for OTP fields
const onKeydown = (index, event) => {
  if (event.key === 'Backspace' && loginStore.otp[index] === '' && index > 0) {
    event.target.previousElementSibling.focus(); // Move focus to the previous input
  }
};
watch(loginStore.otp, async () => {
  loginStore.finalOtp = loginStore.otp.join('');
  // if (loginStore.finalOtp.length === 5) {
  //   await loginStore.verifyOTP();
  // }
}, {deep: true});

watch(() => loginStore.loginStatus, (newVal) => {
  if (newVal === "login-otp" && loginStore.otpTimer) {
    startCountdown(loginStore.otpTimer);
  }
});
let timer: ReturnType<typeof setInterval> | null = null;
const startCountdown = (time: number) => {
  const expireTime = Date.now() + time * 1000; // محاسبه زمان انقضا
  localStorage.setItem("otpExpireTime", expireTime.toString()); // ذخیره زمان انقضا

  countdown.value = time;
  if (timer) clearInterval(timer);

  timer = setInterval(() => {
    const remainingTime = Math.floor((expireTime - Date.now()) / 1000);
    if (remainingTime > 0) {
      countdown.value = remainingTime;
    } else {
      clearInterval(timer as NodeJS.Timeout);
      timer = null;
      localStorage.removeItem("otpExpireTime"); // حذف مقدار بعد از اتمام
      countdown.value = remainingTime
    }
  }, 1000);
};


// تابع ارسال مجدد کد
const resendCode = async () => {
  await loginStore.resendOTP()
  console.log(loginStore.otpTimer,'loginStore.otpTimer')
  if (loginStore.otpTimer) {
    startCountdown(loginStore.otpTimer);
  }
};

onMounted(async () => {
  if (parent.value) {
    autoAnimate(parent.value, {
      duration: 300, // مدت زمان انیمیشن بر حسب میلی‌ثانیه (ms)
      easing: 'ease-in-out', // نوع انیمیشن (linear, ease, ease-in, ease-out, ease-in-out)
    });
  }

  if (countdown.value > 0) {
    startCountdown(countdown.value);
  } else {
    localStorage.removeItem("otpExpireTime");
  }
});

onBeforeMount(() => {
  if (process.client) {
    isLoadedCountDown.value = false;
    const expireTime = localStorage.getItem("otpExpireTime");
    if (expireTime) {
      const remainingTime = Math.floor((parseInt(expireTime) - Date.now()) / 1000);
      if (remainingTime > 0) {
        countdown.value = remainingTime;
      }
    }
    isLoadedCountDown.value = true; // بعد از مقداردهی countdown، مقدار isLoaded را true کنید
  }
});
</script>

<style lang="postcss" scoped>
input[type="text"],
input[type="password"],

button {
  @apply transition-all ease-in duration-150;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

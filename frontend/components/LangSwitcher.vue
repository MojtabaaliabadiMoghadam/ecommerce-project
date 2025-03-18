<template>
  <div ref="dropdownRef" class="relative inline-block text-left">
    <!-- آیکون تغییر زبان -->
    <button
        @click="toggleDropdown"
        class="p-2 rounded-md border bg-white hover:bg-gray-100 transition"
    >
      <span class="mdi mdi-translate mdi-24px"></span>
    </button>

    <!-- لیست زبان‌ها -->
    <div v-if="isOpen" class="absolute right-0 mt-2 w-32 bg-white border rounded-md shadow-lg overflow-hidden z-50">
      <ul>
        <li
            v-for="lang in locales"
            :key="lang.code"
            @click="changeLanguage(lang.code)"
            :class="{'bg-gray-300': lang.code == locale}"
            class="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
        >
          <span v-html="lang.name" class="ml-2"></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from "vue";
import {useI18n} from "vue-i18n";

const {locales, locale, setLocale} = useI18n();
const isOpen = ref(false);
const dropdownRef = ref(null);

// تنظیم زبان از localStorage هنگام بارگذاری صفحه
onMounted(() => {
  const savedLang = localStorage.getItem("app_language") || "fa"; // زبان پیش‌فرض فارسی
  setLocale(savedLang);
  locale.value = savedLang;
});

// تغییر زبان و ذخیره آن در localStorage
const changeLanguage = (langCode) => {
  setLocale(langCode);
  localStorage.setItem("app_language", langCode); // ذخیره زبان در localStorage
  isOpen.value = false; // بستن دراپ‌داون پس از انتخاب زبان
};

// بستن دراپ‌داون هنگام کلیک بیرون
const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false;
  }
};

// اضافه کردن و حذف رویداد هنگام نصب و حذف کامپوننت
onMounted(() => {
  window.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  window.removeEventListener("click", handleClickOutside);
});

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};
</script>

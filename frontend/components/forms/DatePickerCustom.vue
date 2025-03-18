<template>
  <div>
    <input
        type="text"
        :value="formattedDate"
        @click="togglePicker"
        readonly
    />

    <div v-if="showPicker" class="calendar-picker">
      <!-- تاریخ‌چین -->
      <input type="date" v-model="selectedDate" @change="handleDateChange" />

      <button @click="toggleDateFormat">
        {{ isGregorian ? 'شمسی' : 'میلادی' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import {ref, computed} from 'vue';

// متغیرهای وضعیت
const selectedDate = ref('');
const showPicker = ref(false);
const isGregorian = ref(true); // وضعیت تاریخ میلادی یا شمسی

// الگوریتم ساده برای تبدیل تاریخ میلادی به شمسی
const gregorianToJalali = (date) => {
  const g_date = new Date(date);
  const gy = g_date.getFullYear();
  const gm = g_date.getMonth() + 1;
  const gd = g_date.getDate();

  const g_days_in_month = [
    31, (gy % 4 === 0 && (gy % 100 !== 0 || gy % 400 === 0)) ? 29 : 28, 31, 30, 31, 30,
    31, 31, 30, 31, 30, 31
  ];

  const jd = Math.floor((367 * gy) - Math.floor((7 * (gy + Math.floor((gm + 9) / 12))) / 4) +
      Math.floor((275 * gm) / 9) + gd - 730530);

  let j = jd - 1948440;
  let jy = 979 + Math.floor(j / 365);
  j = j % 365;

  let jm = Math.floor((j / 30));
  let jd1 = j % 30;

  return `${jy}/${jm + 1}/${jd1 + 1}`;
};

// فرمت تاریخ به میلادی و شمسی
const formattedDate = computed(() => {
  if (selectedDate.value) {
    if (isGregorian.value) {
      return new Date(selectedDate.value).toISOString().split('T')[0]; // تاریخ میلادی
    } else {
      return gregorianToJalali(selectedDate.value); // تاریخ شمسی
    }
  }
  return '';
});

// تغییر تاریخ
const handleDateChange = (event) => {
  selectedDate.value = event.target.value;
};

// تغییر فرمت تاریخ
const toggleDateFormat = () => {
  isGregorian.value = !isGregorian.value;
};

// نمایش و پنهان کردن تاریخ‌چین
const togglePicker = () => {
  showPicker.value = !showPicker.value;
};

</script>

<style scoped>
.datepicker-container {
  position: relative;
}

.calendar-picker {
  position: absolute;
  top: 40px;
  background: #fff;
  border: 1px solid #ccc;
  padding: 10px;
}

button {
  margin-top: 10px;
  padding: 5px;
  cursor: pointer;
}
</style>

<template>
  <div class="flex flex-col gap-1 justify-between">
    <div class="flex flex-wrap py-2 relative justify-between">
      <!-- انتخاب محلی -->
      <div class="grid gap-2">
        <div class="text-sm">ویژگی محصول: <span class="text-gray-400">قرمز</span></div>
        <div class="flex gap-2">
          <label for="option1">
            <input id="option1" class="hidden" type="radio" name="attribute" checked />
            <span class="radio-button">قرمز</span>
          </label>
          <label for="option2">
            <input id="option2" class="hidden" type="radio" name="attribute" />
            <span class="radio-button">آبی</span>
          </label>
        </div>
      </div>

      <!-- انتخاب رنگ -->
      <div class="grid gap-2">
        <div class="text-sm">رنگ: <span class="text-gray-400">سبز</span></div>
        <div class="flex gap-2">
          <label for="green">
            <input id="green" class="hidden" type="radio" name="color" checked />
            <span class="color-button color-green"></span>
          </label>
          <label for="blue">
            <input id="blue" class="hidden" type="radio" name="color" />
            <span class="color-button color-blue"></span>
          </label>
        </div>
      </div>

      <!-- انتخاب از لیست کشویی -->
      <div class="grid gap-2">
        <div class="text-sm">اندازه:</div>
        <select class="border-white shadow">
          <option disabled hidden>یک گزینه را انتخاب کنید</option>
          <option selected>کوچک</option>
          <option>متوسط</option>
          <option>بزرگ</option>
        </select>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.radio-button {
  @apply border-transparent border-white rounded-lg cursor-pointer outline bg-gray-50 border-2 text-sm text-center outline-2 outline-gray-100 py-1.5 px-3 transition-all text-gray-800 inline-block hover:outline-gray-500;
}

.color-button {
  @apply border-transparent border-white cursor-pointer outline bg-gray-50 border-2 rounded-2xl text-sm text-center outline-2 outline-gray-100 transition-all text-gray-800 inline-block hover:outline-gray-500;
  width: 2rem;
  height: 2rem;
}

.color-green {
  @apply bg-green-500;
}

.color-blue {
  @apply bg-blue-500;
}

input[type='radio']:checked ~ span {
  @apply outline outline-2 outline-gray-500;
}
</style>

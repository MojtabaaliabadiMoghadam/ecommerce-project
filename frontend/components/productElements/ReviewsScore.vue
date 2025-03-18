<template>
  <div>
    <h4 class="font-semibold text-2xl text-gray-900">نظرات مشتریان</h4>
    <div class="my-2">
      <span class="text-sm">بر اساس 5 نظر</span>
    </div>
    <div class="my-4 bars">
      <div class="flex gap-4 items-center">
        <div class="flex text-sm gap-1 items-center">
          5
          <Icon class="text-yellow-400" name="ion:star" />
        </div>
        <div class="flex-1 relative">
          <div class="rounded-full bg-gray-200 h-2.5 w-full"></div>
          <div class="rounded-full bg-yellow-400 h-2.5 top-0 left-0 absolute" style="width: 80%"></div>
        </div>
      </div>
    </div>
    <div class="mt-10 text-xl mb-2 text-gray-900">نظر خود را به اشتراک بگذارید</div>
    <div class="text-sm mb-4">اگر از این محصول استفاده کرده‌اید، لطفاً تجربه خود را با ما در میان بگذارید.</div>
    <button class="border rounded-lg text-center w-full p-2">نوشتن نظر</button>
  </div>
</template>

<style lang="postcss" scoped>
.disable-star {
  @apply bg-white shadow-sm text-gray-300 border border-gray-300;
  transition: 0.15s ease-in-out;
}
.checked-star {
  @apply text-amber-400 bg-amber-50 border border-amber-400;
  transition: 0.15s ease-in-out;
  box-shadow: 0 0px 4px 0 rgb(249 191 59 / 21%);
}
</style>

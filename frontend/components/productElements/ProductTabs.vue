<template>
  <div>
    <nav class="border-b flex gap-8 tabs">
      <button type="button" class="active">توضیحات محصول</button>
      <button type="button">نظرات (5)</button>
    </nav>
    <div class="tab-contents">
      <div class="font-light mt-8 prose">
        <p>اینجا توضیحات محصول نمایش داده می‌شود...</p>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.tabs button {
  @apply border-transparent border-b-2 text-lg pb-8;
  margin-bottom: -1px;
}

.tabs button.active {
  @apply border-primary text-primary;
}
</style>

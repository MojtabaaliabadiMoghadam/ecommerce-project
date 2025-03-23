<template>
  <div class="w-full h-[50svh] px-3 pt-2">
    <swiper :spaceBetween="30" :effect="'fade'" :navigation="true" :pagination="{ clickable: true }" :loop="true"
      :modules="modules" class="mySwiper" :autoplay="{ delay: 7000, disableOnInteraction: false }">
      <swiper-slide>
        <div class="bg-[url('/images/hero-bg.svg')] overflow-hidden relative bg-no-repeat bg-cover bg-center h-full w-full flex items-center justify-center
           md:justify-between">
          <div class="w-1/2 hidden md:flex flex-col items-start justify-center ps-32 gap-12 h-full">
            <div class="text-white font-medium text-[24px]">جدیدترین موبایل‌ها و لوازم جانبی با بهترین قیمت</div>
            <div class="text-white font-bold text-[30px]">همین حالا خرید کنید و تخفیف ویژه بگیرید!</div>
            <div class="text-white/70 font-medium text-[16px]">تنوع بی‌نظیر گوشی‌های هوشمند</div>
          </div>
          <div class="w-1/2 flex items-center justify-center">
            <img class="z-20 !w-[270px] h-[270px]" src="/images/watch-apple.png" alt="">
          </div>
          <div class="border-2 border-[#53619b] rounded-full p-5 absolute -top-[90%] left-[12%] hidden md:block">
            <div class="bg-[#2C3454] rounded-full h-[500px] w-[500px]">
            </div>
          </div>
          <div class="border-2 border-[#53619b] rounded-full p-5 absolute top-[70%] left-[16%] hidden md:block">
            <div class="bg-[#2C3454] rounded-full h-[150px] w-[150px]">
            </div>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="bg-[#FFF3CC] overflow-hidden relative bg-no-repeat bg-cover bg-center h-full w-full flex items-center justify-center
           md:justify-between">
          <div class="w-1/2 hidden md:flex flex-col items-start justify-center ps-32 gap-12 h-full">
            <div class="text-black font-medium text-[24px]">جدیدترین موبایل‌ها و لوازم جانبی با بهترین قیمت</div>
            <div class="text-black font-bold text-[30px]">همین حالا خرید کنید و تخفیف ویژه بگیرید!</div>
            <div class="text-black/70 font-medium text-[16px]">تنوع بی‌نظیر گوشی‌های هوشمند</div>
          </div>
          <div class="w-1/2 flex items-center justify-center">
            <img class="z-20 !w-[270px] h-[270px]" src="/images/watch-apple.png" alt="">
          </div>
          <div class="border-2 border-[#F6DE8D] rounded-full p-5 absolute -top-[90%] left-[12%] hidden md:block">
            <div class="bg-[#F6DE8D] rounded-full h-[500px] w-[500px]">
            </div>
          </div>
          <div class="border-2 border-[#F6DE8D] rounded-full p-5 absolute top-[70%] left-[16%] hidden md:block">
            <div class="bg-[#F6DE8D] rounded-full h-[150px] w-[150px]">
            </div>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="bg-[#313131] overflow-hidden relative bg-no-repeat bg-cover bg-center h-full w-full flex items-center justify-center
           md:justify-between">
          <div class="w-1/2 hidden md:flex flex-col items-start justify-center ps-32 gap-12 h-full">
            <div class="text-white font-medium text-[24px]">جدیدترین موبایل‌ها و لوازم جانبی با بهترین قیمت</div>
            <div class="text-white font-bold text-[30px]">همین حالا خرید کنید و تخفیف ویژه بگیرید!</div>
            <div class="text-white/70 font-medium text-[16px]">تنوع بی‌نظیر گوشی‌های هوشمند</div>
          </div>
          <div class="w-1/2 flex items-center justify-center">
            <img class="z-20 !w-[270px] h-[270px]" src="/images/watch-apple.png" alt="">
          </div>
          <div class="border-2 border-[#404040] rounded-full p-5 absolute -top-[90%] left-[12%] hidden md:block">
            <div class="bg-[#404040] rounded-full h-[500px] w-[500px]">
            </div>
          </div>
          <div class="border-2 border-[#404040] rounded-full p-5 absolute top-[70%] left-[16%] hidden md:block">
            <div class="bg-[#404040] rounded-full h-[150px] w-[150px]">
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules';

const modules = ref([EffectFade, Navigation, Pagination, Autoplay]);
</script>
<style>
.swiper {
  border-radius: 25px;
  width: 100%;
  height: 100%;
}

.swiper-slide {
  background-position: center;
  background-size: cover;
}

.swiper-slide img {
  display: block;
  width: 100%;
}

.swiper-button-next,
.swiper-rtl .swiper-button-prev {
  color: white;
}

.swiper-pagination-bullet-active {
  background: #ffffff;
}
</style>

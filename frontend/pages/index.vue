<template>
  <main>
    <HeroBanner />
    <div class="scroll imgBox  py-7" style="--time: 30s">
      <div>
        <img v-for="(img, i) in images" :key="i" :src="img.img" width="132" height="35" alt="" />
      </div>
    </div>
    <!-- <div
      class="container flex flex-wrap items-center justify-center my-16 text-center gap-x-8 gap-y-4 brand lg:justify-between">
      <img src="" alt="Brand 1" width="132" height="35" />
      <img src="/images/logoipsum-221.svg" alt="Brand 2" width="119" height="30" />
      <img src="/images/logoipsum-225.svg" alt="Brand 3" width="49" height="48" />
      <img src="/images/logoipsum-280.svg" alt="Brand 4" width="78" height="30" />
      <img src="/images/logoipsum-284.svg" alt="Brand 5" width="70" height="44" />
      <img src="/images/logoipsum-215.svg" alt="Brand 6" width="132" height="40" />
    </div> -->
    <section class="container my-16">
      <div class="flex items-end justify-between">
        <h2 class="text-lg font-semibold md:text-2xl">{{ $t('messages.shop.shopByCategory') }}</h2>
        <NuxtLink class="text-primary" to="/categories">{{ $t('messages.general.viewAll') }}</NuxtLink>
      </div>
      <div class="grid justify-center grid-cols-2 gap-4 mt-8 md:grid-cols-3 lg:grid-cols-6">
        <CategoryCard v-for="(category, i) in dataStore.categories" :key="i" class="w-full" :node="category" />
      </div>
    </section>
    <section class="container grid gap-4 my-24 md:grid-cols-2 lg:grid-cols-4">
      <div class="flex items-center gap-8 p-8 bg-white rounded-lg">
        <img src="/icons/box.svg" width="60" height="60" alt="Free Shipping" loading="lazy" />
        <div>
          <h3 class="text-xl font-semibold">Free Shipping</h3>
          <p class="text-sm">Free shipping on order over €50</p>
        </div>
      </div>
      <div class="flex items-center gap-8 p-8 bg-white rounded-lg">
        <img src="/icons/moneyback.svg" width="60" height="60" alt="Money Back" loading="lazy" />
        <div>
          <h3 class="text-xl font-semibold">Peace of Mind</h3>
          <p class="text-sm">30 days money back guarantee</p>
        </div>
      </div>
      <div class="flex items-center gap-8 p-8 bg-white rounded-lg">
        <img src="/icons/secure.svg" width="60" height="60" alt="Secure Payment" loading="lazy" />
        <div>
          <h3 class="text-xl font-semibold">100% Payment Secure</h3>
          <p class="text-sm">Your payment are safe with us.</p>
        </div>
      </div>
      <div class="flex items-center gap-8 p-8 bg-white rounded-lg">
        <img src="/icons/support.svg" width="60" height="60" alt="Support 24/7" loading="lazy" />
        <div>
          <h3 class="text-xl font-semibold">Support 24/7</h3>
          <p class="text-sm">24/7 Online support</p>
        </div>
      </div>
    </section>
    <section class="container my-16" v-if="popularProducts">
      <ShopElementsProductRow :products="dataStore.products" class="grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mt-8" />
    </section>
  </main>
</template>
<script lang="ts" setup>
import HeroBanner from "~/components/generalElements/HeroBanner.vue";
import { useDataGlobal } from "~/stores/globalStore";

const dataStore = useDataGlobal()
const { siteName, description, shortDescription, siteImage } = useAppConfig();

const popularProducts = [];

useSeoMeta({
  title: `Home`,
  ogTitle: siteName,
  description: description,
  ogDescription: shortDescription,
  ogImage: siteImage,
  twitterCard: `summary_large_image`,
});

const images = [
  {
    img: '/images/logoipsum-211.svg'
  },
  {
    img: '/images/logoipsum-225.svg'
  },
  {
    img: '/images/logoipsum-280.svg'
  },
  {
    img: '/images/logoipsum-284.svg'
  },
  {
    img: '/images/logoipsum-215.svg'
  },
  {
    img: '/images/logoipsum-211.svg'
  },
  {
    img: '/images/logoipsum-225.svg'
  },
  {
    img: '/images/logoipsum-280.svg'
  },
  {
    img: '/images/logoipsum-284.svg'
  },
  {
    img: '/images/logoipsum-215.svg'
  },
  {
    img: '/images/logoipsum-211.svg'
  },
  {
    img: '/images/logoipsum-225.svg'
  },
  {
    img: '/images/logoipsum-280.svg'
  },
  {
    img: '/images/logoipsum-284.svg'
  },
  {
    img: '/images/logoipsum-215.svg'
  },
  {
    img: '/images/logoipsum-211.svg'
  },
  {
    img: '/images/logoipsum-225.svg'
  },
  {
    img: '/images/logoipsum-280.svg'
  },
  {
    img: '/images/logoipsum-284.svg'
  },
  {
    img: '/images/logoipsum-215.svg'
  },
]
onMounted(async () => {
  await dataStore.GetProducts()
})
</script>
<style scoped>
.brand img {
  max-height: min(8vw, 120px);
  object-fit: contain;
  object-position: center;
}
.scroll {
  position: relative;
  display: flex;
  overflow: hidden;
}

.scroll div {
  white-space: nowrap;
  animation: scroll var(--time) linear infinite;
  animation-delay: calc(var(--time) * -1);
}

.scroll div:nth-child(2) {
  animation: scroll2 var(--time) linear infinite;
  animation-delay: calc(var(--time) / -2);
}

@keyframes scroll {
  0% {
    transform: translateX(100%);
  }

  100% {
    transform: translateX(-100%);
  }
}

@keyframes scroll2 {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-200%);
  }
}
.imgBox div {
  display: flex;
  align-items: center;
  justify-content: center;
}

.imgBox img {
  scale: 0.8;
}


.scroll div:hover {
  -webkit-animation-play-state: paused;
  -moz-animation-play-state: paused;
  -o-animation-play-state: paused;
  animation-play-state: paused;
}
</style>

// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primeuix/themes/aura';
export default defineNuxtConfig({
  components: true,
  ssr: true,
  devtools: { enabled: true },
  css: [
    '~/assets/css/main.css',
    '@mdi/font/css/materialdesignicons.min.css',
  ],
  modules: [
    '@pinia/nuxt',
    '@primevue/nuxt-module',
    '@nuxtjs/i18n',
    '@nuxt/image'
  ],
  plugins: [
    // jQuery plugin
    {src: '@/plugins/jquery.js', mode: 'client'},
    {src: '@/plugins/vue-toastify.client.ts', mode: 'client'}
  ],
  image: {
    dir: 'public', // مشخص کردن مسیر تصاویر در پوشه `public`
  },
  primevue: {
    options: {
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: 'light',
        }
      }
    }
  },
  runtimeConfig: {
    public: {
      BACK_END_URL: process.env.BACK_END_URL,
      TABLES_PER_PAGE: process.env.TABLES_PER_PAGE
    },
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  app: {
    head: {
      meta: [
        // <meta name="viewport" content="width=device-width, initial-scale=1">
        {name: 'viewport', content: 'width=device-width, initial-scale=1'}
      ],
      script: [
        { src: '/js/jquery.min.js' },
        { src: '/js/persian-date.min.js' },
        { src: '/js/persian-datepicker.min.js' },
        { src: '/js/jquery.mask.min.js' }
      ],
      link: [
        {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@400;700&display=swap'},
        { rel: 'stylesheet', href: '/css/persian-datepicker.min.css' }
      ],
      style: [],
      noscript: []
    },
    pageTransition: { name: 'page', mode: 'default' }
  },
  experimental: {
    sharedPrerenderData: true,
    buildCache: true,
    defaults: {
      nuxtLink: {
        prefetch: true,
        prefetchOn: { visibility: false },
      },
    },
  },
  i18n: {
    globalInjection: true,
    detectBrowserLanguage: false,
    lazy: true,
    locales: [
      { code: 'fa', file: 'fa.json', name: 'فارسی' },
      { code: 'en', file: 'en.json', name: 'English' },
    ],
    langDir: 'locales',
    defaultLocale: 'fa', // مقدار پیش‌فرض
    strategy: 'no_prefix',
  },
  compatibilityDate: '2024-09-27'
})
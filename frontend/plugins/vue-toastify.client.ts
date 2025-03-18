// plugins/vue-toastify.client.ts
import { defineNuxtPlugin } from '#app'
import 'vue3-toastify/dist/index.css'
import { toast } from 'vue3-toastify'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.provide('toast', toast)
})

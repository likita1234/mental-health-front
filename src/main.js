import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'

import AppWrapper from './AppWrapper.vue'
import router from './router'

import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

const app = createApp(AppWrapper)

app.use(PrimeVue, { ripple: true })
app.use(createPinia())
app.use(router)

app.mount('#app')

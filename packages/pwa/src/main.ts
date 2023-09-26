import { createApp } from 'vue'

import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'

import App from './App.vue'
import router from './router'

import useFirebase from './composables/useFirebase'

const app = createApp(App)
const { restoreUser } = useFirebase()

;(async () => {
  await restoreUser()

  app.use(router)
  app.mount('#app')
})()

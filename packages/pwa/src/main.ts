import { createApp } from 'vue'

import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'

import App from './App.vue'
import router from './bootstrap/router'

import useFirebase from './composables/useFirebase'
import { i18n } from './bootstrap/i18n'
import useCustomUser from './composables/useCustomUser'

const app = createApp(App)
const { restoreUser } = useFirebase()
const { restoreCustomUser } = useCustomUser()

app.use(i18n) // ALTIJD VOOR DE ROUTER!
;(async () => {
  await restoreUser()
  await restoreCustomUser()

  app.use(router)
  app.mount('#app')
})()

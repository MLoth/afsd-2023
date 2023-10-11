import { createApp } from 'vue'

import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'

import App from './App.vue'
import router from './bootstrap/router'

import useFirebase from './composables/useFirebase'
import useCustomUser from './composables/useCustomUser'
import { i18n } from './bootstrap/i18n'

const app = createApp(App)
const { restoreUser, firebaseUser } = useFirebase()
const { restoreCustomUser } = useCustomUser()

app.use(i18n) // ALTIJD VOOR DE ROUTER!
;(async () => {
  await restoreUser()
  if (firebaseUser.value) await restoreCustomUser()

  app.use(router)
  app.mount('#app')
})()

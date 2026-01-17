import { createApp } from 'nativescript-vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import { useUserStore } from '~/store/user'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)

// Initialize app to restore user session from storage. For persistent login state
function init() {
  const userStore = useUserStore()
  userStore.loadFromStorage()
}

init()
app.start()

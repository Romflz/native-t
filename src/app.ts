import { createApp } from 'nativescript-vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import { useUserStore } from '~/store/user'
import { useCartStore } from '~/store/cart'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)

// Initialize app to restore user session and fetch cart if logged in
async function init() {
  const userStore = useUserStore()
  const cartStore = useCartStore()

  userStore.loadFromStorage()

  // If user is logged in, fetch their cart from API
  if (userStore.isLoggedIn) {
    await cartStore.fetchCart()
  }
}

init()
app.start()

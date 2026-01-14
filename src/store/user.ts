import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  const username = ref('')

  const isLoggedIn = computed(() => username.value.length > 0)

  function setUsername(payload: string) {
    username.value = payload
  }

  return { username, isLoggedIn, setUsername }
})

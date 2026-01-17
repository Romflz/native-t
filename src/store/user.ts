import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  const username = ref('')
  const token = ref('')
  const userId = ref<number | null>(null)

  const isLoggedIn = computed(() => username.value.length > 0)

  function setUsername(payload: string) {
    username.value = payload
  }

  function setToken(jwt: string) {
    token.value = jwt
  }

  function setUserId(id: number) {
    userId.value = id
  }

  function logout() {
    username.value = ''
    token.value = ''
    userId.value = null
  }

  return { username, token, userId, isLoggedIn, setUsername, setToken, setUserId, logout }
})

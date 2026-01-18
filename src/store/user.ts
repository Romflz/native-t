import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { ApplicationSettings } from '@nativescript/core'

export const useUserStore = defineStore('user', () => {
  const username = ref('')
  const token = ref('')
  const userId = ref<number | null>(null)

  const isLoggedIn = computed(() => username.value.length > 0)

  function setUsername(payload: string) {
    username.value = payload
    ApplicationSettings.setString('username', payload)
  }

  function setToken(jwt: string) {
    token.value = jwt
    ApplicationSettings.setString('token', jwt)
  }

  function setUserId(id: number) {
    userId.value = id
    ApplicationSettings.setNumber('userId', id)
  }

  function loadFromStorage() {
    const storedUsername = ApplicationSettings.getString('username', '')
    const storedToken = ApplicationSettings.getString('token', '')
    const storedUserId = ApplicationSettings.getNumber('userId', 0)

    if (storedUsername && storedToken) {
      username.value = storedUsername
      token.value = storedToken
      userId.value = storedUserId || null
    }
  }

  function logout() {
    username.value = ''
    token.value = ''
    userId.value = null
    ApplicationSettings.remove('username')
    ApplicationSettings.remove('token')
    ApplicationSettings.remove('userId')
  }

  return { username, token, userId, isLoggedIn, setUsername, setToken, setUserId, loadFromStorage, logout }
})

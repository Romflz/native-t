import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNavStore = defineStore('nav', () => {
  const active = ref('home')

  function setActive(page: string) {
    active.value = page
  }

  return { active, setActive }
})

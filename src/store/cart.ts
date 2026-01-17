import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface CartItem {
  id: number
  title: string
  price: number
  image: string
  quantity: number
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])

  const totalItems = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))
  const totalPrice = computed(() => items.value.reduce((sum, item) => sum + item.price * item.quantity, 0))

  function addToCart(product: { id: number; title: string; price: number; image: string }) {
    const existing = items.value.find(item => item.id === product.id)
    existing ? existing.quantity++ : items.value.push({ ...product, quantity: 1 })
  }

  function removeFromCart(productId: number) {
    const index = items.value.findIndex(item => item.id === productId)
    if (index > -1) items.value.splice(index, 1)
  }

  function clearCart() {
    items.value = []
  }

  return { items, totalItems, totalPrice, addToCart, removeFromCart, clearCart }
})

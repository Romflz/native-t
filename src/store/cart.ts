import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useUserStore } from './user'

interface CartItem {
  id: number
  title: string
  price: number
  image: string
  quantity: number
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])
  const loading = ref(false)
  const cartId = ref<number | null>(null)

  const itemCount = computed(() => items.value.length)
  const totalItems = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))
  const totalPrice = computed(() => items.value.reduce((sum, item) => sum + item.price * item.quantity, 0))

  // Api based, fetches on init app if loggedin or on visit to cart page
  async function fetchCart() {
    const userStore = useUserStore()
    if (!userStore.userId) return

    loading.value = true
    try {
      const cartResponse = await fetch(`https://fakestoreapi.com/carts/user/${userStore.userId}`)
      const carts = await cartResponse.json()

      if (carts && carts.length > 0) {
        // We just get the first cart from fakeapistore since it returns an array, since we are not implement historical carts in this case
        const cart = carts[0]
        cartId.value = cart.id
        const cartItems: CartItem[] = []
        for (const item of cart.products) {
          const productResponse = await fetch(`https://fakestoreapi.com/products/${item.productId}`)
          const product = await productResponse.json()
          cartItems.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: item.quantity,
          })
        }
        items.value = cartItems
      }
    } catch (err) {
      // Add logging here like sentry for example
      console.error('Failed to fetch cart:', err)
    } finally {
      loading.value = false
    }
  }

  // This function is called from the ProductDetailsView.vue mainly, via add to cart button. It passes the props
  async function addToCart(product: { id: number; title: string; price: number; image: string }) {
    const existing = items.value.find(item => item.id === product.id)
    existing ? existing.quantity++ : items.value.push({ ...product, quantity: 1 })

    // Sync with API. It seems fakestore api for cart is not persistent, so for now this is just to simulate how a real API would be like.
    // As much as I would liked to keep it js store only, using local store or similar method, to keep states synchronized with cloud
    // It's best to not have local store for cart
    const userStore = useUserStore()
    if (userStore.userId) {
      try {
        await fetch('https://fakestoreapi.com/carts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: userStore.userId,
            products: items.value.map(item => ({
              productId: item.id,
              quantity: item.quantity,
            })),
          }),
        })
      } catch (err) {
        console.error('Failed to sync cart:', err)
      }
    }
  }

  // These are just actions to update the store instance, updateCart() will actually update it via API call
  function removeFromCart(productId: number) {
    const index = items.value.findIndex(item => item.id === productId)
    if (index > -1) items.value.splice(index, 1)
  }

  function increaseQuantity(productId: number) {
    const item = items.value.find(item => item.id === productId)
    if (item) item.quantity++
  }

  function decreaseQuantity(productId: number) {
    const item = items.value.find(item => item.id === productId)
    if (item && item.quantity > 1) item.quantity--
  }

  async function updateCart() {
    const userStore = useUserStore()
    if (!userStore.userId || !cartId.value) return

    try {
      const response = await fetch(`https://fakestoreapi.com/carts/${cartId.value}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userStore.userId,
          products: items.value.map(item => ({
            productId: item.id,
            quantity: item.quantity,
          })),
        }),
      })
      await response.json()
      return true
    } catch (err) {
      console.error('Failed to update cart:', err)
      return false
    }
  }

  return {
    items,
    loading,
    itemCount,
    totalItems,
    totalPrice,
    fetchCart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    updateCart,
  }
})

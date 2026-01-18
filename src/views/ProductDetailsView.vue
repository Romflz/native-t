<template>
  <AppLayout>
    <ScrollView>
      <StackLayout padding="16">
        <GridLayout columns="auto, *" marginBottom="16">
          <Label text="Back" col="0" @tap="goBack" class="text-blue-500" />
        </GridLayout>
        <ActivityIndicator v-if="loading" busy="true" />
        <StackLayout v-else-if="product">
          <Image :src="product.image" height="250" stretch="aspectFit" marginBottom="16" />
          <Label :text="product.title" textWrap="true" class="text-xl font-bold" marginBottom="8" />
          <Label :text="`$${product.price}`" class="text-2xl text-green-600" marginBottom="16" />
          <Label :text="product.category" class="text-gray-500" marginBottom="8" />
          <Label :text="product.description" textWrap="true" marginBottom="16" />

          <Button v-if="userStore.isLoggedIn && !isInCart" text="Add to Cart" class="bg-black text-white p-4 rounded-xl" @tap="addToCart" />
          <Button
            v-else-if="userStore.isLoggedIn && isInCart"
            text="Already in Cart"
            class="bg-gray-400 text-white p-4 rounded-xl"
            isEnabled="false"
          />
          <Button v-else text="Login to Add to Cart" class="bg-gray-400 text-white p-4 rounded" @tap="goToLogin" />
        </StackLayout>
      </StackLayout>
    </ScrollView>
  </AppLayout>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, $navigateBack, $navigateTo } from 'nativescript-vue'
import { Dialogs } from '@nativescript/core'
import AppLayout from '~/components/layouts/AppLayout.vue'
import { useUserStore } from '~/store/user'
import { useCartStore } from '~/store/cart'
import { useNavStore } from '~/store/nav'
import LoginView from '~/views/LoginView.vue'

interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
}

const props = defineProps<{
  productId: number
}>()

const userStore = useUserStore()
const cartStore = useCartStore()
const navStore = useNavStore()
const product = ref<Product | null>(null)
const loading = ref(true)

const isInCart = computed(() => {
  return cartStore.items.some(item => item.id === props.productId)
})

const goBack = () => {
  $navigateBack()
}

const goToLogin = () => {
  navStore.setActive('login')
  $navigateTo(LoginView, { clearHistory: true })
}

const addToCart = () => {
  if (product.value) {
    cartStore.addToCart({
      id: product.value.id,
      title: product.value.title,
      price: product.value.price,
      image: product.value.image,
    })
    Dialogs.alert('Added to cart!')
  }
}

onMounted(async () => {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${props.productId}`)
    const data: Product = await response.json()
    product.value = data
    loading.value = false
  } catch (error) {
    console.error('Error fetching product:', error)
    loading.value = false
  }
})
</script>

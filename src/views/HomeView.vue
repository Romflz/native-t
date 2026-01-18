<template>
  <AppLayout>
    <ScrollView>
      <StackLayout padding="16">
        <Label text="Home Page" class="text-xl font-bold" marginBottom="16" />
        <GridLayout
          v-for="product in products"
          :key="product.id"
          columns="80, *"
          rows="auto"
          marginBottom="12"
          @tap="goToProduct(product.id)"
        >
          <Image :src="product.image" width="80" height="80" stretch="aspectFit" col="0" />
          <StackLayout col="1" marginLeft="12" verticalAlignment="center">
            <Label :text="product.title" textWrap="true" class="font-bold" />
            <Label :text="`$${product.price}`" class="text-green-600" marginTop="4" />
          </StackLayout>
        </GridLayout>
      </StackLayout>
    </ScrollView>
  </AppLayout>
</template>

<script setup lang="ts">
import { onMounted, ref, $navigateTo } from 'nativescript-vue'
import AppLayout from '~/components/layouts/AppLayout.vue'
import ProductDetailsView from '~/views/ProductDetailsView.vue'

interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
}

const products = ref<Product[]>([])

const goToProduct = (productId: number) => {
  $navigateTo(ProductDetailsView, { props: { productId } })
}

onMounted(async () => {
  try {
    const response = await fetch('https://fakestoreapi.com/products')
    const data: Product[] = await response.json()
    products.value = data
  } catch (error) {
    console.error('Error fetching products:', error)
  }
})
</script>

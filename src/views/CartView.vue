<template>
  <AppLayout>
    <!-- Not logged in -->
    <GridLayout v-if="!userStore.isLoggedIn" rows="*" columns="*">
      <StackLayout verticalAlignment="center" horizontalAlignment="center" marginLeft="25" marginRight="25">
        <StackLayout class="bg-gray-100 rounded-2xl p-8" horizontalAlignment="center" width="100%">
          <Image src="~/assets/icons/lock.png" width="48" height="48" class="mb-4" horizontalAlignment="center" />
          <Label text="Login Required" class="text-xl font-bold text-center mb-2" />
          <Label text="Please sign in to view your cart and checkout" class="text-gray-500 text-center mb-6" textWrap="true" />
          <Button text="Sign In" @tap="goToLogin" class="bg-black text-white p-4 rounded-xl" width="100%" />
        </StackLayout>
      </StackLayout>
    </GridLayout>

    <!-- Logged in -->
    <GridLayout v-else rows="*, auto" columns="*">
      <ScrollView row="0">
        <StackLayout class="p-4">
          <Label text="Your Cart" class="text-2xl font-bold mb-4" />

          <ActivityIndicator v-if="cartStore.loading" busy="true" />

          <Label v-else-if="cartStore.items.length === 0" text="Your cart is empty" class="text-gray-500" />

          <StackLayout v-else>
            <GridLayout
              v-for="item in cartStore.items"
              :key="item.id"
              columns="70, *, auto"
              rows="auto"
              class="mb-4 bg-gray-50 rounded-xl p-3"
            >
              <Image :src="item.image" col="0" width="60" height="60" stretch="aspectFit" />

              <StackLayout col="1" marginLeft="12" verticalAlignment="center">
                <Label :text="item.title" textWrap="true" class="font-bold text-sm" />
                <Label :text="`$${item.price}`" class="text-green-600" />

                <GridLayout columns="auto, auto, auto" rows="auto" marginTop="8">
                  <Button col="0" text="-" @tap="cartStore.decreaseQuantity(item.id)" class="bg-gray-200 w-8 h-8 rounded" />
                  <Label col="1" :text="item.quantity.toString()" class="mx-3" verticalAlignment="center" />
                  <Button col="2" text="+" @tap="cartStore.increaseQuantity(item.id)" class="bg-gray-200 w-8 h-8 rounded" />
                </GridLayout>
              </StackLayout>

              <Label col="2" text="Delete" @tap="cartStore.removeFromCart(item.id)" class="text-red-500" verticalAlignment="top" />
            </GridLayout>

            <StackLayout class="mt-4 p-4 bg-gray-100 rounded-xl">
              <GridLayout columns="*, auto" rows="auto, auto">
                <Label col="0" row="0" text="Total Items:" class="text-gray-500" />
                <Label col="1" row="0" :text="cartStore.totalItems.toString()" class="font-bold" />
                <Label col="0" row="1" text="Total Price:" class="text-gray-500 mt-2" />
                <Label col="1" row="1" :text="`$${cartStore.totalPrice.toFixed(2)}`" class="font-bold text-green-600 mt-2" />
              </GridLayout>
            </StackLayout>
          </StackLayout>
        </StackLayout>
      </ScrollView>

      <StackLayout row="1" class="p-4" v-if="cartStore.items.length > 0">
        <Button
          :text="updating ? 'Updating...' : 'Update Cart'"
          @tap="handleUpdateCart"
          :isEnabled="!updating"
          class="bg-black text-white p-4 rounded-xl"
        />
      </StackLayout>
    </GridLayout>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onMounted, $navigateTo } from 'nativescript-vue'
import { Dialogs } from '@nativescript/core'
import { useUserStore } from '~/store/user'
import { useCartStore } from '~/store/cart'
import { useNavStore } from '~/store/nav'
import AppLayout from '~/components/layouts/AppLayout.vue'
import LoginView from '~/views/LoginView.vue'

const userStore = useUserStore()
const cartStore = useCartStore()
const navStore = useNavStore()
const updating = ref(false)

function goToLogin() {
  navStore.setActive('login')
  $navigateTo(LoginView)
}

async function handleUpdateCart() {
  updating.value = true
  await cartStore.updateCart()
  updating.value = false
  Dialogs.alert('Cart updated')
}

onMounted(() => {
  if (userStore.isLoggedIn) {
    cartStore.fetchCart()
  }
})
</script>

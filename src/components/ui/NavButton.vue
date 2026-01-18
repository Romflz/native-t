<template>
  <StackLayout @tap="navigate" horizontalAlignment="center" verticalAlignment="center">
    <GridLayout width="50" height="50">
      <StackLayout
        width="50"
        height="50"
        class="rounded-full"
        :class="isActive ? 'bg-black' : 'bg-gray-200'"
        horizontalAlignment="center"
        verticalAlignment="center"
      >
        <Image :src="icon" width="24" height="24" :tintColor="isActive ? '#fff' : '#000'" />
      </StackLayout>
      <Label
        v-if="page === 'cart' && userStore.isLoggedIn && cartStore.itemCount > 0"
        :text="cartStore.itemCount.toString()"
        class="bg-red-500 text-white text-xs font-bold rounded-full"
        width="20"
        height="20"
        horizontalAlignment="right"
        verticalAlignment="top"
        textAlignment="center"
      />
    </GridLayout>
  </StackLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { $navigateTo } from 'nativescript-vue'
import { useNavStore } from '~/store/nav'
import { useUserStore } from '~/store/user'
import { useCartStore } from '~/store/cart'
import HomeView from '~/views/HomeView.vue'
import CartView from '~/views/CartView.vue'
import LoginView from '~/views/LoginView.vue'

const props = defineProps<{
  page: string
  icon: string
}>()

const navStore = useNavStore()
const userStore = useUserStore()
const cartStore = useCartStore()

const views: Record<string, any> = {
  home: HomeView,
  login: LoginView,
  cart: CartView,
}

const isActive = computed(() => navStore.active === props.page)

function navigate() {
  navStore.setActive(props.page)
  if (views[props.page]) {
    $navigateTo(views[props.page], { clearHistory: true })
  }
}
</script>

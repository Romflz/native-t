<template>
  <StackLayout @tap="navigate" horizontalAlignment="center" verticalAlignment="center">
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
  </StackLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { $navigateTo } from 'nativescript-vue'
import { useNavStore } from '~/store/nav'
import HomeView from '~/views/HomeView.vue'
import CartView from '~/views/CartView.vue'
import LoginView from '~/views/LoginView.vue'

const props = defineProps<{
  page: string
  icon: string
}>()

const navStore = useNavStore()

const views: Record<string, any> = {
  home: HomeView,
  login: LoginView,
  cart: CartView,
}

const isActive = computed(() => navStore.active === props.page)

function navigate() {
  if (navStore.active === props.page) return
  navStore.setActive(props.page)
  if (views[props.page]) {
    $navigateTo(views[props.page])
  }
}
</script>

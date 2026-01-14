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
    <ScrollView v-else>
      <StackLayout class="p-4">
        <Label text="Your Cart" class="text-2xl font-bold mb-4" />
        <Label text="Your cart items will appear here..." class="text-gray-500" />
      </StackLayout>
    </ScrollView>
  </AppLayout>
</template>

<script setup lang="ts">
import { $navigateTo } from 'nativescript-vue'
import { useUserStore } from '~/store/user'
import { useNavStore } from '~/store/nav'
import AppLayout from '~/components/layouts/AppLayout.vue'
import LoginView from '~/views/LoginView.vue'

const userStore = useUserStore()
const navStore = useNavStore()

function goToLogin() {
  navStore.setActive('login')
  $navigateTo(LoginView)
}
</script>

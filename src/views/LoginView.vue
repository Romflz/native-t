<template>
  <AppLayout>
    <!-- Logged in -->
    <GridLayout v-if="userStore.isLoggedIn" rows="*" columns="*">
      <StackLayout verticalAlignment="center" horizontalAlignment="center" marginLeft="40" marginRight="40">
        <Image src="~/assets/icons/user.png" width="80" height="80" class="mb-6" horizontalAlignment="center" />
        <Label text="Welcome back," class="text-gray-400 text-center text-lg" />
        <Label :text="userStore.username" class="text-3xl font-bold text-center mb-10" />
        <Button text="Sign Out" @tap="logout" class="bg-black text-white p-4 rounded-full" width="100%" />
      </StackLayout>
    </GridLayout>

    <!-- Not logged in -->
    <GridLayout v-else rows="*" columns="*">
      <StackLayout verticalAlignment="center" horizontalAlignment="center" marginLeft="40" marginRight="40">
        <Image src="~/assets/icons/user.png" width="80" height="80" class="mb-6" horizontalAlignment="center" />
        <Label text="Welcome" class="text-3xl font-bold text-center mb-2" />
        <Label text="Sign in to continue" class="text-gray-400 text-center mb-10" />

        <TextField
          v-model="username"
          hint="Username"
          class="bg-gray-100 p-4 rounded-xl mb-4"
          width="100%"
          autocapitalizationType="none"
          autocorrect="false"
        />

        <TextField v-model="password" hint="Password" class="bg-gray-100 p-4 rounded-xl mb-8" width="100%" secure="true" />

        <Button text="Sign In" @tap="login" class="bg-black text-white p-4 rounded-xl mb-4" width="100%" />
      </StackLayout>
    </GridLayout>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '~/store/user'
import AppLayout from '~/components/layouts/AppLayout.vue'

const userStore = useUserStore()
const username = ref('')
const password = ref('')

function login() {
  if (username.value.trim() && password.value.trim()) {
    userStore.setUsername(username.value.trim())
  }
}

function logout() {
  userStore.setUsername('')
  username.value = ''
  password.value = ''
}
</script>

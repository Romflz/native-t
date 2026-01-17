<template>
  <AppLayout>
    <!-- Logged in -->
    <GridLayout v-if="userStore.isLoggedIn" rows="*" columns="*">
      <StackLayout verticalAlignment="center" horizontalAlignment="center" marginLeft="40" marginRight="40">
        <Image src="~/assets/icons/user.png" width="80" height="80" class="mb-6" horizontalAlignment="center" />
        <Label text="Welcome back," class="text-gray-400 text-center text-lg" />
        <Label :text="userStore.username" class="text-3xl font-bold text-center mb-10" />
        <Button text="Sign Out" @tap="logout" class="bg-black text-white p-4 rounded-xl" width="100%" />
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

        <TextField v-model="password" hint="Password" class="bg-gray-100 p-4 rounded-xl mb-4" width="100%" secure="true" />

        <Label v-if="error" :text="error" class="text-red-500 text-center mb-4" textWrap="true" />

        <Button
          :text="loading ? 'Signing In...' : 'Sign In'"
          @tap="login"
          :isEnabled="!loading"
          class="bg-black text-white p-4 rounded-xl mb-4"
          width="100%"
        />
      </StackLayout>
    </GridLayout>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { decode } from 'base-64'
import { useUserStore } from '~/store/user'
import AppLayout from '~/components/layouts/AppLayout.vue'

const userStore = useUserStore()
const username = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

function decodeJwt(token: string) {
  // JWT has 3 parts. So we split it between fullstops. header.payload.signature
  const parts = token.split('.')
  if (parts.length !== 3) {
    throw new Error('Invalid JWT')
  }

  // Decode the payload (middle part)
  const payload = decode(parts[1])
  return JSON.parse(payload)
}

async function login() {
  if (!username.value.trim() || !password.value.trim()) {
    error.value = 'Please enter username and password'
    return
  }

  loading.value = true
  error.value = ''

  try {
    const response = await fetch('https://fakestoreapi.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value.trim(),
        password: password.value.trim(),
      }),
    })

    if (!response.ok) {
      throw new Error('Invalid credentials')
    }

    const data = await response.json()
    console.log('Login token:', data.token)

    // Decode JWT to get user ID
    const decoded = decodeJwt(data.token)
    console.log('Decoded JWT:', decoded)

    userStore.setUsername(username.value.trim())
    userStore.setToken(data.token)
    userStore.setUserId(decoded.sub)
  } catch (err) {
    error.value = 'Login failed. Please check your credentials.'
    console.error('Login error:', err)
  } finally {
    loading.value = false
  }
}

function logout() {
  userStore.logout()
  username.value = ''
  password.value = ''
}
</script>

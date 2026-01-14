<template>
  <Page actionBarHidden="true">
    <GridLayout rows="25, *, 85">
      <!-- Status bar spacer (For contrast) -->
      <StackLayout row="0" class="bg-black" />

      <!-- Content -->
      <StackLayout row="1" class="bg-white">
        <slot />
      </StackLayout>

      <!-- Bottom Navigation -->
      <GridLayout row="2" columns="*, *, *" class="bg-white" verticalAlignment="top" marginTop="10" marginBottom="20">
        <NavButton col="0" page="home" icon="~/assets/icons/home.png" />
        <NavButton col="1" page="cart" icon="~/assets/icons/cart.png" />
        <NavButton col="2" page="login" icon="~/assets/icons/user.png" />
      </GridLayout>
    </GridLayout>
  </Page>
</template>
<script setup lang="ts">
import NavButton from '~/components/ui/NavButton.vue'
</script>

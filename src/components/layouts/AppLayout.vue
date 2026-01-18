<template>
  <Page actionBarHidden="true">
    <GridLayout rows="25, *, 85">
      <!-- Content -->
      <GridLayout row="1" class="bg-white">
        <slot />
      </GridLayout>

      <!-- Bottom Navigation -->
      <GridLayout row="2" columns="*, *, *" class="bg-white" verticalAlignment="top" marginTop="10" marginBottom="20">
        <NavButton col="0" page="home" icon="https://cdn-icons-png.flaticon.com/512/1946/1946488.png" />
        <NavButton col="1" page="cart" icon="https://cdn-icons-png.flaticon.com/512/3144/3144456.png" />
        <NavButton col="2" page="login" icon="https://cdn-icons-png.flaticon.com/512/1946/1946429.png" />
      </GridLayout>
    </GridLayout>
  </Page>
</template>
<script setup lang="ts">
import NavButton from '~/components/ui/NavButton.vue'
</script>

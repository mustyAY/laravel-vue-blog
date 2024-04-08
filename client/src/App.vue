<script setup>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<template>
  <section class="px-6 py-8">
    <AppHeader />

    <RouterView />

    <AppFooter />
  </section>
</template>

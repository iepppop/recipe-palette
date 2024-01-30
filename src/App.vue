<template>
  <Header />
  <div class="main">
    <RouterView />
  </div>
  <Footer />
</template>
<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
</script>
<style lang="scss">
@import '@/assets/main.scss';

.main {
  min-height: calc(100vh - 144px);
}

@include iphone {
  .main {
    min-height: calc(100vh - 63px);
  }
}
</style>
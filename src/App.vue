<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
</script>
<template>
  <Header />
  헤더
  <div class="main">
    메인안
    <RouterView />
  </div>
  <Footer />
</template>
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
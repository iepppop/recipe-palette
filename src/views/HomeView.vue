<script setup>
import MainBanner from '@/components/MainBanner.vue'
import RecentPost from '@/components/RecentPost.vue'
import SubBanner from '@/components/SubBanner.vue'
import CategoryMenu from '@/components/CategoryMenu.vue'
</script>
<template>
  <div class="contain">
    <div class="mainbanner-wrap">
      <MainBanner />
    </div>
    <RecentPost />
    <SubBanner />
    <CategoryMenu />
  </div>
</template>
<style lang="scss">
.contain {
  background-image: url('@/assets/images/bg.png'), linear-gradient(to bottom, #f8f8f8, transparent);
  width: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: top center;

  .mainbanner-wrap {
    height: 95vh;
  }
}
</style>

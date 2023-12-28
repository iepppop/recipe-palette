
<template>
  <div class="contain">
    <div class="mainbanner-wrap-left">
    </div>
    <div class="mainbanner-wrap-right">
    </div>
      <MainBanner />
    <RecentPost />
  </div>
  <SubBanner />
    <CategoryMenu />
</template>
<script setup>
import MainBanner from '@/components/MainBanner.vue'
import RecentPost from '@/components/RecentPost.vue'
import SubBanner from '@/components/SubBanner.vue'
import CategoryMenu from '@/components/CategoryMenu.vue'
import { onMounted } from 'vue';
import gsap from 'gsap';

const enterAnimation = () => {
  gsap.from('.mainbanner-wrap-left ',1,{
    x:-1000,
  })
  gsap.from('.mainbanner-wrap-right ',1,{
    x:1100,
  })
}

onMounted(()=>{
  enterAnimation()
})
</script>
<style lang="scss">
@import '@/assets/_mixin.scss';
.contain {
  background-image:linear-gradient(to bottom, #f8f8f8, transparent);
  // background-image: url('@/assets/images/bg.png'), linear-gradient(to bottom, #f8f8f8, transparent);
  width: 100%;
  overflow: hidden;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: top center;
  position: relative;

  .mainbanner-wrap-left {
    background-image: url('@/assets/images/left.png'); 
    background-repeat: no-repeat;
    background-position: left top; 
    background-size: 30% auto; 
    height: 100vh;
    position: absolute;
    width:100%;
    top:0;
  }

  .mainbanner-wrap-right {
    background-image: url('@/assets/images/right.png'); 
    background-repeat: no-repeat;
    background-position: right top; 
    background-size: 30% auto, 30% auto; 
    height: 100vh;
    position: absolute;
    width:100%;
    top:0;
  }
  
@include iphone{
  .mainbanner-wrap-left {height:50vh}
  .mainbanner-wrap-right {height:50vh}
}
}
</style>

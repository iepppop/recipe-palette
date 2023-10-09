<script setup>
import MainBanner from '@/components/MainBanner.vue';
import RecentPost from '@/components/RecentPost.vue';
</script>
<template>
<div class="contain">
<div class="mainbanner-wrap">
<MainBanner />
</div>
<RecentPost/>
</div>
</template>
<style lang="scss">
.contain{
    background-image:url('@/assets/images/bg.png'), linear-gradient(to bottom, #f8f8f8, transparent);
    width: 100%;
    height: 140vh;
    background-size: contain; 
    background-repeat: no-repeat;
    background-position:top center;

    .mainbanner-wrap{
        height: 99vh;
    }
}
</style>

<template>
    <div class="category-menu">
    <h1>카테고리 별로 다양한 요리를 만나보세요</h1>
    <div class="category-wrap">
        <button v-for="cate in cateList" :key="cate">
        <div class="image">
            <img :src="cate.imgUrl" :alt="cate.name"/>
        </div>
        {{ cate.name }}
        </button>
    </div>
</div>
</template>
<script setup>
import { ref } from "vue";
import banchan from '@/assets/images/1.png';
import gook from '@/assets/images/2.png';

const cateList = ref([{name:'반찬', imgUrl: banchan},{name:'국&찌개', imgUrl: gook}]);
</script>
<style lang="scss">
.category-menu{
    width:1400px;
    margin:0 auto;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    h1{
        font-size:30px;
        font-weight: 700;
        text-align: center;
    }

    .category-btn-wrap{
        display: flex;
        margin:10px 0 0 0;
        gap:10px;
        width: 100%;

        button{
            padding:5px 10px;
            border-radius: 10px;
            border:1px solid #eee;
            width: 100%;
        }
    }

    .category-wrap{
        width: 100%;
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap:20px;

        button{
            width:100%;
            height:200px;

            border-radius: 50%;
            background:#f8f8f8;

            .image{
                width:50%;
                margin:0 auto;
            }
        }
    }
}
</style>

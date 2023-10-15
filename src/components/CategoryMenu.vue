<template>
  <div class="category-menu">
    <h1>레시피 카테고리</h1>
    <div class="sub-ex">카테고리 별로 다양한 요리를 만나보세요</div>
    <div class="category-wrap">
      <button
        v-for="cate in cateList"
        @click="router.push({ path: '/list', query: { category: cate.name , page:1}})"
        :key="cate.name"
        :class="[cate.name === '국' ? 'soup' : cate.name === '후식' ? 'dessert' : cate.name === '밥' ? 'rice' : '']"
      >
        <div class="image">
          <img :src="cate.imgUrl" :alt="cate.name" />
        </div>
        <div class="cate-name">
          <span> {{ cate.name  === '국' ? '국&찌개' : `${cate.name}` }}</span>
          <span> {{ cate.gname }}</span>
        </div>
      </button>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import bab from '@/assets/images/1.png'
import gook from '@/assets/images/2.png'
import dessert from '@/assets/images/3.png'
import banchan from '@/assets/images/4.png'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute();
const router = useRouter();

const cateList = ref([
  { name: '반찬', imgUrl: banchan, gname: 'side dish' },
  { name: '국', imgUrl: gook, gname: 'soup' },
  { name: '밥', imgUrl: bab, gname: 'rice' },
  { name: '후식', imgUrl: dessert, gname: 'dessert' }
])
</script>
<style lang="scss">
.category-menu {
  width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 0 0 100px 0;

  h1 {
    font-size: 30px;
    font-weight: 700;
    text-align: center;
  }

  .sub-ex {
    margin: 7px 0 80px 0;
    color: #474747;
    font-weight: 600;
    font-size: 16px;
    opacity: 0.7;
  }

  .category-wrap {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;

    button {
      width: 100%;
      height: 200px;
      position: relative;
      display: flex;
      justify-content: space-between;
      border-radius: 15px;
      background: #f8f8f8;
      overflow: hidden;
      padding: 50px;
      cursor: pointer;
      transition: 0.1s ease-in;

      &:hover {
        overflow: visible;
        transform: scale(1.05);
        background: #e7f7e7;
        transition: overflow 4s;

        &.soup {
          background: #fef0db;
        }

        &.dessert {
          background: #ffe6fa;
        }

        .image {
          animation: rotate 1s infinite linear;animation-delay: 250ms;
          bottom: 0;
        }
      }

      .cate-name {
        font-size: 15px;
        text-align: left;
        display: flex;
        flex-direction: column;
        gap: 2px;

        span {
          font-weight: 700;

          &:last-child {
            text-transform: uppercase;
            font-size: 13px;
            color: gray;
          }
        }
      }

      .image {
        width: 50%;
        margin: 0 auto;
        position: absolute;
        right: 30px;
        bottom: -40px;
        transition: 0.3s ease-in-out;
      }
    }
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(10deg); /* 원하는 각도로 변경하세요 */
    }
    100% {
      transform: rotate(0deg);
    }
  }
}
</style>

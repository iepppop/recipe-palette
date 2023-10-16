<template>
  <div class="category-menu">
    <h1>레시피 카테고리</h1>
    <div class="sub-ex">카테고리 별로 다양한 요리를 만나보세요</div>
    <div class="category-wrap">
      <button
        v-for="cate in cateList"
        @click="router.push({ path: '/list', query: { category: cate.name, page: 1 } })"
        :key="cate.name"
        :class="[
          cate.name === '국'
            ? 'soup'
            : cate.name === '후식'
            ? 'dessert'
            : cate.name === '밥'
            ? 'rice'
            : cate.name === '일품'
            ? 'best'
            : ''
        ]"
      >
        <div class="image">
          <img :src="cate.imgUrl" :alt="cate.name" />
        </div>
        <div class="cate-name">
          <div class="name">
            <span> {{ cate.name === '국' ? '국&찌개' : `${cate.name}` }}</span>
            <span> {{ cate.gname }}</span>
          </div>
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
import best from '@/assets/images/5.png'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const cateList = ref([
  { name: '밥', imgUrl: bab, gname: 'rice' },
  { name: '국', imgUrl: gook, gname: 'soup' },
  { name: '반찬', imgUrl: banchan, gname: 'side dish' },
  { name: '후식', imgUrl: dessert, gname: 'dessert' },
  { name: '일품', imgUrl: best, gname: 'best' }
])
</script>
<style lang="scss">
@import '@/assets/_mixin.scss';

.category-menu {
  width: 1400px;
  margin: 150px auto 50px auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 0 0 40px 0;

  h1 {
    font-size: 26px;
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
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;

    button {
      width: 100%;
      height: 300px;
      position: relative;
      display: flex;
      justify-content: space-between;
      border-radius: 15px;
      background: #f8f8f8;
      overflow: hidden;
      padding: 50px;
      cursor: pointer;
      transition: overflow 0.2s ease-in;
      box-shadow: 5px 5px 20px rgb(238, 238, 238, 0.2);

      &:hover {
        // overflow: visible;
        background: #e7f7e7;
        transition: overflow 4s;

        &.soup {
          background: #fef0db;

          .image {
            bottom: -20px;
          }
        }

        &.dessert {
          background: #ffe6fa;

          .image {
            bottom: -20px;
          }
        }

        &.rice {
          background: #eeeeee;
        }

        &.best {
          background: #ffeaea;
        }

        .image {
          animation: rotate 1s infinite linear;
          animation-delay: 250ms;
          bottom: 0;
        }
      }

      .cate-name {
        font-size: 15px;
        text-align: left;
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        gap: 2px;

        .arrow {
          color: #b0b0b0;
        }

        span {
          font-weight: 700;
          color:var(--black);

          &:last-child {
            text-transform: uppercase;
            font-size: 13px;
            color: #b0b0b0;
          }
        }
      }

      .image {
        width: 60%;
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

  /* 반응형 */
  @include laptop {
    width: 100%;

    .category-wrap {
      padding:0 30px;
    }
  }

  @include laptopToTablet {
    h1 {
      font-size: 25px;
    }
    .sub-ex {
      font-size: 14px;
      margin: 7px 0 50px 0;
    }

    .category-wrap {
      button{
        height:230px;
      }
    }
  }

  @include tabletToMobile {
    .category-wrap {
      grid-template-columns: repeat(2, 1fr);
      button{
        height:200px;
      }
    }
  }

  @include iphone {
    margin:80px 0 0 0;

    .category-wrap {
      padding:0 10px;
      gap:10px;
      button{
        height:200px;
      }
    }
  }

  @include mobile {
    .category-wrap {
      grid-template-columns: repeat(1, 1fr);
    }
  }
}
</style>

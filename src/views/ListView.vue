<template>
  <div class="list-page">
    <div class="list-wrap">
      <ListItem :dataLength="20"/>
      <div class="pagination" v-show="store.dataList.length > 0">
        <button @click="changePage(route.query.page,0)" :disabled="isPrevPageDisabled" class="prev">
          <svg
            width="13"
            fill="#737373"
            style="transform: rotate(180deg)"
            xmlns="http://www.w3.org/2000/svg"
            class="ionicon"
            viewBox="0 0 512 512"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="48"
              d="M184 112l144 144-144 144"
            />
          </svg>
        </button>
        <ul>
          <li
            v-for="page in pageNumbers()"
            :key="page"
            @click="changePage(page,2)"
            :style="[
              page === store.currentPage
                ? { fontWeight: 700, color: 'var(--black)' }
                : { fontWeight: 400, color: '#787878' }
            ]"
          >
            {{ page }}
          </li>
        </ul>
        <button @click="changePage(route.query.page,1)" :disabled="isNextPageDisabled">
          <svg
            width="13"
            fill="#737373"
            xmlns="http://www.w3.org/2000/svg"
            class="ionicon"
            viewBox="0 0 512 512"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="48"
              d="M184 112l144 144-144 144"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import ListItem from '@/components/ListItem.vue'
import { computed, inject, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCommonStore } from '../stores/common.js'

const store = useCommonStore();
const route = useRoute()
const router = useRouter()

const currentPageStart = () => {
  return Math.max(store.currentPage - 2, 1)
}

const currentPageEnd = () => {
  return Math.min(currentPageStart() + 4, store.totalPage)
}

const pageNumbers = () => {
  const start = currentPageStart()
  const end = currentPageEnd()
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

const changePage = (page,num) => {
    const queryKey  = Object.keys(route.query)[0];
    let pagenNm;
    if(num === 2) pagenNm = page;
    else pagenNm = num === 1 ? parseInt(page) + 1 : parseInt(page) - 1;
    router.push({
     query: { [queryKey] : Object.values(route.query)[0] , page: pagenNm}
    })
}

const isNextPageDisabled = computed(() => {
  return store.currentPage >= store.totalPage
})

const isPrevPageDisabled = computed(() => {
  return  store.currentPage  <= 1
})

onMounted(() => {
if(!route.query.page){
    router.push({
      query: { page: 1 }
   })
  }
  store.totalCount = 0;
  store.getDataList()
})

watch(route,(nv,ov)=>{
  store.totalCount = 0;
  store.getDataList()
},)
</script>
<style lang="scss">
@import '@/assets/_mixin.scss';

.list-page {
  width: 100%;

  .list-wrap {
    width: 1400px;
    margin: 20px auto 100px auto;
  }

  button {
    display: flex;
    align-items: center;
    cursor: pointer;
    border: 1px solid #eee;
    border-radius: 10px;
    padding: 10px 10px 10px 12px;
  }

  .prev{
    padding: 10px;
  }

  .pagination {
    display: flex;
    width: max-content;
    margin: 50px auto;
    gap: 30px;
    align-items: center;

    ul {
      display: flex;
      gap: 10px;

      li {
        position: relative;
        z-index: 2;
        cursor: pointer;
        color: #787878;
        font-size: 14px;
      }
    }
  }
    /* 반응형 */
    @include laptop {
    .list-wrap {
      width: 100%;
    }
  }

  @include iphone{
    .list-wrap{
      margin: 0 auto 10px auto;
      .list-item{
        .srh-view {
          margin:0 0 15px 0;
        }
      }

      .pagination {
        margin:30px auto 50px auto;
      }
    }
  }

}
</style>

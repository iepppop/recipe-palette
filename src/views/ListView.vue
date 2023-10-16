<template>
  <div class="list-page">
    <div class="list-wrap">
      <ListItem :isLoading="isLoading" :data="recentList" :dataLength="20" :totalCount="totalCount ? totalCount : ''"/>
      <div class="pagination" v-show="recentList">
        <button @click="prevPage(route.query.page)" :disabled="isPrevPageDisabled" class="prev">
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
            @click="changePage(page)"
            :style="[
              page === currentPage
                ? { fontWeight: 700, color: 'var(--black)' }
                : { fontWeight: 400, color: '#787878' }
            ]"
          >
            {{ page }}
          </li>
        </ul>
        <button @click="nextPage(route.query.page)" :disabled="isNextPageDisabled">
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

const route = useRoute()
const router = useRouter()
const axios = inject('$axios')

const recentList = ref([])
const isLoading = ref(false)
const totalPage = ref(1)
const currentPage = ref(1)
const totalCount = ref(0);

const getDataList = async (currentPage) => {
  try {
    const total = parseInt(window.sessionStorage.getItem('total'))
    if (currentPage <= total) {
      isLoading.value = true
    }

    const perPage = 20
    const start = (currentPage - 1) * perPage + 1
    const end = currentPage * perPage
    const response = await axios.get(`COOKRCP01/json/${start}/${end}`)
    totalPage.value = Math.ceil(response.data.COOKRCP01.total_count / 20)
    window.sessionStorage.setItem('total', totalPage.value)
    recentList.value = response.data.COOKRCP01.row
    isLoading.value = false
  } catch (err) {
    console.log(err)
    isLoading.value = false
  }
}

const getSearchData = async(currentPage) => {
  try{
    const total = parseInt(window.sessionStorage.getItem('total'))
    if (currentPage <= total) {
      isLoading.value = true
    }

    const perPage = 20
    const start = (currentPage - 1) * perPage + 1
    const end = currentPage * perPage

    const response = await axios.get(`COOKRCP01/json/${start}/${end}/RCP_NM=${route.query.search}`);
    totalCount.value = response.data.COOKRCP01.total_count;
    totalPage.value = Math.ceil(response.data.COOKRCP01.total_count / 20)
    window.sessionStorage.setItem('total', totalPage.value)
    recentList.value = response.data.COOKRCP01.row
    isLoading.value = false
  }catch(err){
    console.log(err)
  }
}

const getCategoryData = async(currentPage)=>{
  try{
    const total = parseInt(window.sessionStorage.getItem('total'))
    if (currentPage <= total) {
      isLoading.value = true
    }

    const perPage = 20
    const start = (currentPage - 1) * perPage + 1
    const end = currentPage * perPage

    const response = await axios.get(`COOKRCP01/json/${start}/${end}/RCP_PAT2=${route.query.category}`);
    totalCount.value = response.data.COOKRCP01.total_count;
    totalPage.value = Math.ceil(response.data.COOKRCP01.total_count / 20)
    window.sessionStorage.setItem('total', totalPage.value)
    recentList.value = response.data.COOKRCP01.row
    isLoading.value = false
  }catch(err){
    console.log(err)
  }
}

const prevPage = (page) => {
  currentPage.value = parseInt(page) - 1
  if(route.query.search){
    router.push({
    query: { search: route.query.search , page: currentPage.value}
  })
  getSearchData(currentPage.value)
  }else{
    router.push({
    query: { page: currentPage.value }
  })
  getDataList(currentPage.value)
  }
}

const nextPage = (page) => {
  currentPage.value = parseInt(page) + 1
  if(route.query.search){
    router.push({
    query: { search: route.query.search , page: currentPage.value}
  })
  getSearchData(currentPage.value)
  }else if(route.query.category){
    router.push({
    query: { category: route.query.category , page: currentPage.value}
  })
  getCategoryData(currentPage.value)
  }else{
    router.push({
    query: { page: currentPage.value }
  })
  getDataList(currentPage.value)
  }
}

const currentPageStart = () => {
  return Math.max(currentPage.value - 2, 1)
}

const currentPageEnd = () => {
  const total = parseInt(window.sessionStorage.getItem('total'))
  return Math.min(currentPageStart() + 4, total)
}

const pageNumbers = () => {
  const start = currentPageStart()
  const end = currentPageEnd()
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

const changePage = (page) => {
  currentPage.value = page
  if(route.query.search){
    router.push({
    query: { search: route.query.search , page}
  })
  getSearchData(currentPage.value)
  }else if(route.query.category){
    router.push({
    query: { category: route.query.category , page}
  })
  getCategoryData(currentPage.value)
  }else{
    router.push({
    query: { page }
  })
  getDataList(currentPage.value)
  }
}

const isNextPageDisabled = computed(() => {
  return currentPage.value >= totalPage.value
})

const isPrevPageDisabled = computed(() => {
  return currentPage.value <= 1
})

onMounted(() => {
  if(route.query.search && !route.query.page){
    router.push({
      query: { search: route.query.category , page: 1 }
    })
  }else if(route.query.category && !route.query.page){
    router.push({
      query: { category: route.query.category , page: 1 }
    })
  }else if(!route.query.page){
    router.push({
      query: { page: 1 }
   })
  }

  currentPage.value = parseInt(route.query.page)

  if(route.query.search){
    getSearchData(currentPage.value)
  }else if(route.query.category){
    getCategoryData(currentPage.value)
  }else{
    getDataList(currentPage.value)
  }
})
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
      margin: 0 auto 100px auto;
      .list-item{
        .srh-view {
          margin:0 0 15px 0;
        }
      }
    }
  }

}
</style>

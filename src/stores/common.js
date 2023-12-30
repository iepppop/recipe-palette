import { ref, computed, inject, reactive } from 'vue'
import { defineStore } from 'pinia'
import { useRoute } from 'vue-router';

export const useCommonStore = defineStore('common', () => {
  const axios = inject('$axios');
  const route = useRoute();
  const dataList = ref([]);
  const recipeArr = ref(JSON.parse(window.localStorage.getItem('my-recipe')) || []);
  const isLoading = ref(false);
  const totalPage = ref(1);
  const totalCount = ref(0);
  const perPage = 20;
  const currentPage = ref(1);
  const start = ref(1);
  const end = ref(10);

  const getDataList = async () => {
    try {
      isLoading.value = true;
      currentPage.value = parseInt(route.query.page);
      start.value = currentPage.value ? (currentPage.value - 1) * perPage + 1 : 1
      end.value = currentPage.value ? currentPage.value * perPage : 10

      let url;

      if (route.query.search) {
        url = `COOKRCP01/json/${start.value}/${end.value}/RCP_NM=${route.query.search}`;
      }else if(route.query.category){
        url =  `COOKRCP01/json/${start.value}/${end.value}/RCP_PAT2=${route.query.category}`;
      }else if(route.query.keyword){
        url =  `COOKRCP01/json/${start.value}/${end.value}/RCP_PARTS_DTLS=${route.query.keyword}`;
      }else {
        url = `COOKRCP01/json/${start.value}/${end.value}`;
      }

      const response = await axios.get(url);
      totalCount.value = response.data.COOKRCP01.total_count
      totalPage.value = Math.ceil(totalCount.value / 20)
      dataList.value = response.data.COOKRCP01.row ? response.data.COOKRCP01.row.map((ele) => {
        return {
          ...ele,
          isDuplicate: recipeArr.value.map((nm) => nm.RCP_NM).includes(ele.RCP_NM)
        };
      }) : response.data.COOKRCP01.RESULT

      isLoading.value = false;
    } catch (err) {
      console.log(err);
    }
  }

  const saveRecipe = (item) => {
    item.isDuplicate = true
    recipeArr.value.push(item)
    window.localStorage.setItem('my-recipe', JSON.stringify(recipeArr.value))
  }

  const removeRecipe = (item) => {
    item.isDuplicate = false
    recipeArr.value = recipeArr.value.filter((ele) => !item.RCP_NM.includes(ele.RCP_NM))
    window.localStorage.setItem('my-recipe', JSON.stringify(recipeArr.value))
  }


  return { dataList, isLoading, currentPage, totalPage, totalCount,recipeArr, getDataList, saveRecipe, removeRecipe }
})

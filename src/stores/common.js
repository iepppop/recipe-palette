import { ref, computed, inject, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useCommonStore = defineStore('common', () => {
  const axios = inject('$axios');
  const dataList = ref([])

  const getDataList = async () => {
    try{
      const response = await axios.get('COOKRCP01/json/1/5');
      dataList.value = response.data;
    } catch(err) {
      console.log(err);
    }
  }

  return { dataList, getDataList }
})

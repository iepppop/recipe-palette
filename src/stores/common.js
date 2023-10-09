import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('common', () => {
  const axios = inject('$axios');
  const dataList = ref([])

  const getDataList = async () => {
    try{
      const response = await axios.get('/COOKRCP01/json/xml/1/5');
      dataList.value = response;
    } catch(err) {
      console.log(err);
    }
  }

  return { dataList, getDataList }
})

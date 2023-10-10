<template>
  <div class="list-page">
    <div class="list-wrap">
        <ListItem :data="recentList"/>
    </div>
  </div>
</template>
<script setup>
import ListItem from "@/components/ListItem.vue";
import { inject, onMounted, ref } from "vue";

const axios = inject('$axios');
const recentList = ref([]);

const getDataList = async () => {
    try{
      const response = await axios.get('COOKRCP01/json/1/20');
      recentList.value = response.data.COOKRCP01.row;
    } catch(err) {
      console.log(err);
    }
}

onMounted(()=>{
    getDataList();
})

</script>
<style lang="scss">
.list-page{
  width:100%;

  .list-wrap{
    width:1400px;
    margin:0 auto;
  }
}
</style>

<template>
    <div class="recent-posts">
        <div class="title">
        <h1>최근 등록된 레시피</h1>
        <p>매일 업데이트 되는 다양한 레시피</p>
    </div>
    <div class="content">
        <ul>
            <li v-for="(item,index) in recentList" :key="index">
                <div class="image">
                    <img :src="item.ATT_FILE_NO_MK" :alt="item.RCP_NM"/>
                </div>
                <div class="explain">

                </div>
            </li>
        </ul>
    </div>
    </div>
</template>

<script setup>
import { inject, onMounted, ref } from "vue";

const axios = inject('$axios');
const recentList = ref([]);

const getDataList = async () => {
    try{
      const response = await axios.get('COOKRCP01/json/1/10');
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
.recent-posts{
    width:100%;

    .title{
        text-align: center;
        h1{
        font-size:30px;
        font-weight: 700;
        }

        p{
            font-size:16px;
            margin:10px 0 0 0 ;
            font-weight: 600;
            color:#474747;
        }
    }

    .content{
        max-width:1920px;
        margin:0 auto;
        padding:0 30px;
        margin:100px 0 0 0;

        ul{
            width: 100%;
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap:10px;

            li{
                border:1px solid #f3f3f3;
                border-radius: 10px;
            }
        }
    }
}
</style>
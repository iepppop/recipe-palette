<template>
    <div class="recent-posts">
        <div class="title">
            <div class="all-view" @click="router.push('/list?page=1')">
                <button><span>전체보기</span><svg width="13" fill="#737373" xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M184 112l144 144-144 144"/></svg></button>
            </div>
        <h1>최근 등록된 레시피</h1>
        <p>매일 업데이트 되는 다양한 레시피</p>
    </div>
    <ListItem :isLoading="isLoading" :data="recentList" :dataLength="10"/>
    <div class="pagination">
        <button @click="nextPage"></button>
    </div>
    </div>
</template>

<script setup>
import ListItem from "@/components/ListItem.vue";
import { inject, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const axios = inject('$axios');
const recentList = ref([]);
const isLoading = ref(false);
const router = useRouter();

const getDataList = async () => {
    try{
    isLoading.value = true;
      const response = await axios.get('COOKRCP01/json/1/10');
      recentList.value = response.data.COOKRCP01.row;
      isLoading.value = false;
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
        width:1400px;
        position: relative;
        margin: 0 auto;

        .all-view{
            cursor: pointer;
            position:absolute;
            top:50%;
            right:0;
            transform: translate(0,-50%);
            border:1px solid #eee;
            border-radius: 50%;
            border:1px solid #eee;
            width:40px;
            height:40px;
            transition: 0.3s ease-in-out;

            button{
                cursor: pointer;
                padding:0 12px;
                display: flex;
                position: absolute;
                width: max-content;
                right:0;
                top:50%;
                transform: translate(0,-50%);
                align-items: center;
                gap:5px;        

                svg{
                    padding:1px 0 0 0;
                    color:#3e3e3e;
                    opacity: 0.7;
                }

                span{
                    opacity: 0;
                    color:#3e3e3e;
                    font-weight: 600;
                }
            }

            &:hover{
                width:100px;
                display: flex;    
                border-radius: 20px;
                box-shadow: 5px 5px 20px #f8f8f8;
                background:#fff;

                button{

                span{
                    opacity: 0.9;
                    display: block;  
                    transition-timing-function: ease-in-out;
                    transition-duration: 0.3s;
                    transition-property: opacity;
                    transition-delay: 250ms;
                }
            }
            }
        }

        h1{
        font-size:30px;
        font-weight: 700;
        }

        p{
            font-size:16px;
            margin:7px 0 80px 0 ;
            font-weight: 600;
            color:#474747;
            opacity: 0.7;
        }
    }
}
</style>
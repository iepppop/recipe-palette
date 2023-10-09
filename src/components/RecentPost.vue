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
                    <div class="text">
                    <div class="tag" :class="item.RCP_PAT2 === '반찬' && 'side-dish'">{{ item.RCP_PAT2 }}</div>
                    <h2>{{ item.RCP_NM }}</h2>
                    <p>{{ item.RCP_NA_TIP }}</p>
                </div>
                    <div class="sub">
                       칼로리 <span>{{  item.INFO_ENG }}kcal </span>
                       <div class="dot"></div>
                        {{  item.RCP_WAY2 }}
                    </div>
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
            gap:20px;

            li{
                border:1px solid #f3f3f3;
                border-radius: 10px;
                width:100%;
                overflow: hidden;
                cursor: pointer;

                &:hover{
                    box-shadow: 5px 5px 20px #eee;
                    transition: 0.3s ease-in-out;

                    .image{
                        img{
                            scale:1.1;
                            transition: 0.3s ease-in-out;
                        }
                    }
                }

                .image{
                    height:60%;
                    overflow: hidden;
                    height: 175px;
                    display: flex;
                    align-items: center
                }
                
                .explain{
                    width:100%;

                    .text{
                        padding:20px;
                    }

                    .sub{
                        font-size:13px;
                        font-weight: 600;
                        display: flex;
                        color:#777471; 
                        border-top:1px solid #f3f3f3;
                        padding:15px 20px;
                        align-items: center;

                        .dot{
                            width:3px;
                            height:3px;
                            background:#777471;
                            border-radius: 50%;
                            opacity:0.2;
                            margin:0 10px 0 0;
                        }

                        span{
                            color:var(--black);
                            font-weight: 600;
                            margin:0 10px;
                        }
                    }

                    .tag{
                        font-size:12px;
                        font-weight: 600;
                        color:#f89606;
                        margin:0 0 10px 0;
                        background:#fef0db;
                        width:max-content;
                        padding:4px 7px 3px 7px;
                        border-radius: 5px;
                    }

                    .side-dish{
                        color:var(--green);
                        background:#e7f7e7;
                    }

                    h2{
                        font-weight: 700;
                        font-size:15px;
                    }

                    p{
                        width: 100%;
                        height: 40px;
                        display: block;
                        margin:10px 0 0 0;
                        font-size:14px;
                        font-weight: 500;
                        display: -webkit-box;
                        -webkit-line-clamp: 2; /* 라인수 */
                        -webkit-box-orient: vertical;
                        word-wrap:break-word; 
                        line-height: 1.2em;
                        height: 2.4em;
                        overflow: hidden;
                    }
                }
            }
        }
    }
}
</style>
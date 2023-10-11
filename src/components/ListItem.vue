<template>
    <div class="list-item">
        <div class="content">
        <ul v-if="!isLoading">
            <li v-for="(item,index) in props.data" :key="index" @click="movePage(item)">
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
        <ul v-else class="skeleton">
            <li v-for="index in dataLength" :key="index">
                <div class="image"></div>
                <div class="explain">
                    <div class="text">
                    <div class="tag"></div>
                    <h2></h2>
                    <p>
                        <span></span>
                        <span></span>
                    </p>
                </div>
                    <div class="sub">
                       <span> </span>
                       <div class="dot"></div>
                      
                    </div>
                </div>
            </li>
        </ul>
    </div>
    </div>
</template>
<script setup>
const props = defineProps({
  data: Array,
  isLoading: Boolean,
  dataLength: Number
});

import { useRouter } from "vue-router";
const router = useRouter();

const movePage = (data) => {
    window.sessionStorage.setItem('info', JSON.stringify(data));
    router.push(`/food/${data.RCP_SEQ}`);
}
</script>
<style lang="scss">
.list-item{
    .content{
        width:1400px;
        margin:0 auto;

        .skeleton{
            .image{
                background-color: #f2f2f2;
            }

            .explain{
                .tag{
                    width:50px;
                    height: 12px;
                    border-radius: 5px;
                    animation: skeleton-gradient 1.5s infinite ease-in-out;
                }

                h2{
                    width:100px;
                    height: 12px;
                    border-radius: 5px;
                    animation: skeleton-gradient 1.5s infinite ease-in-out;
                }

                p{
                    display: flex;
                    flex-direction: column;
                    gap:10px;
                    margin:20px 0 0 0;

                    span{
                    width:100%;
                    height: 12px;
                    border-radius: 5px;
                    animation: skeleton-gradient 1.5s infinite ease-in-out;
                    }
                }

                .sub{
                    span{
                    width:40px;
                    height: 12px;
                    border-radius: 5px;
                    animation: skeleton-gradient 1.5s infinite ease-in-out;
                    margin:0;
                    }

                    .dot{
                    width:70px;
                    height: 12px;
                    border-radius: 5px;
                    animation: skeleton-gradient 1.5s infinite ease-in-out;
                    margin:0 0 0 10px;
                    opacity: 1;
                    }
                }
            }

            @keyframes skeleton-gradient {
            0% {
            background-color: rgba(165, 165, 165, 0.1);
            }
            50% {
            background-color: rgba(165, 165, 165, 0.3);
            }
            100% {
            background-color: rgba(165, 165, 165, 0.1);
            }
        }
        }

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
                transition: 0.3s ease-in-out;

                &:hover{
                    box-shadow: 5px 5px 20px #eee;
                }

                .image{
                    overflow: hidden;
                    height: 175px;
                    display: flex;
                    align-items: center;
                    width:100%;

                    img{
                        width:100%;
                        object-fit: cover;
                    }
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
                        display: -webkit-box;
                        -webkit-line-clamp: 1; 
                        -webkit-box-orient: vertical;
                        word-wrap:break-word; 
                        overflow: hidden;
                    }

                    p{
                        width: 100%;
                        height: 40px;
                        display: block;
                        margin:10px 0 0 0;
                        font-size:14px;
                        font-weight: 500;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
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
<template>
    <div class="recent-posts">
        <div class="title">
            <div class="all-view" @click="router.push('/list?page=1')">
                <button><span>전체보기</span><svg width="13" fill="#737373" xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M184 112l144 144-144 144"/></svg></button>
            </div>
        <h1>최근 등록된 레시피</h1>
        <p>매일 업데이트 되는 다양한 레시피</p>
    </div>
    <ListItem :dataLength="10"/>
    <div class="pagination">
        <button @click="nextPage"></button>
    </div>
    <div class="all-view-mobile">
        <button @click="router.push('/list?page=1')"><span>전체보기 <svg width="13" fill="#737373" xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M184 112l144 144-144 144"/></svg></span></button>
    </div>
    </div>
</template>

<script setup>
import ListItem from "@/components/ListItem.vue";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useCommonStore } from '../stores/common.js'


const router = useRouter();
const store = useCommonStore();

onMounted(()=>{
    store.getDataList();
})
</script>

<style lang="scss">
@import '@/assets/_mixin.scss';

.recent-posts{
    width:100%;

    .all-view-mobile{
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding:10px;
        display: none;
        margin: 0 auto;
        border-top:1px solid #eee;

        button{
            border:1px solid #eee;
            width: 100%;
            height: 100%;
            border-radius: 5px;
            font-size: 14px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content:center;

            span{
                font-weight: 700;
                transition: 0.4s ease-in-out;
            }

            svg{
                margin:0 0 0 5px;
            }
        }

        :hover{
            span{
                opacity: 0.8;
            }
        }
    }

    .title{
        text-align: center;
        position: relative;
        margin: 0 auto;
        width:1400px;

        .all-view{
            right:0;
            cursor: pointer;
            position:absolute;
            top:50%;
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

/* 반응형 */
@include laptop {
  .recent-posts {
    .title{
        width:100%;
        padding:0 30px;
        
        .all-view{
            right:30px;
        }
    }
    ul{
        li{
            &:nth-child(n+9) {
                display: none;
            }
        }
    }
  }
}

@include laptopToTablet {
    .recent-posts {
    .title{
        h1{
            font-size:25px;
        }

        p{
            font-size:14px;
            margin:7px 0 50px 0;
        }
    }

    ul{
        li{
            &:nth-child(n+7) {
                display: none;
            }
        }
    }
  }
}

@include iphone {
    .recent-posts {
    .all-view{
            display: none;
    }

    .all-view-mobile{
        display: block;
    }
     .pagination{
            display:none
        }
    .title{
        h1{
            font-size:20px;
        }

        p{
            font-size:12px;
        }
    }

    ul{
        li{
            &:nth-child(n+4) {
                display: none;
            }
        }
    }
  }
}

</style>
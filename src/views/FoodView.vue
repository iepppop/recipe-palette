<template>
  <div class="food-view">
    <div class="food-info">
      <div class="image">
        <img :src="data.ATT_FILE_NO_MAIN" />
      </div>
      <div class="title">
        <div class="tag" :class="data.RCP_PAT2 === '반찬' && 'side-dish'">{{ data.RCP_PAT2 }}</div>
        <div class="name">{{ data.RCP_NM }}</div>
      </div>
      <div class="content">
        {{ data.RCP_NA_TIP }}
      </div>
      <ul class="nutrient">
        <li><span>열량</span><span>{{ data.INFO_ENG }}kcal</span></li>
        <li><span>탄수화물</span><span>{{ data.INFO_CAR }}g</span></li>
        <li><span>단백질</span><span>{{ data.INFO_PRO }}g</span></li>
        <li><span>지방</span><span>{{ data.INFO_FAT }}g</span></li>
        <li><span>나트륨</span><span>{{ data.INFO_NA }}g</span></li>
      </ul>
      <div class="ingredient">
        <div class="icon">
            <svg width="14" xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M416.07 272a160 160 0 10-160 160 160 160 0 00160-160zM142.12 91.21A46.67 46.67 0 00112 80l-2.79.08C83.66 81.62 64 104 64.07 131c0 13.21 4.66 19.37 10.88 27.23a4.55 4.55 0 003.24 1.77h.88a3.23 3.23 0 002.54-1.31L142.38 99a5.38 5.38 0 001.55-4 5.26 5.26 0 00-1.81-3.79zM369.88 91.21A46.67 46.67 0 01400 80l2.79.08C428.34 81.62 448 104 447.93 131c0 13.21-4.66 19.37-10.88 27.23a4.55 4.55 0 01-3.24 1.76h-.88a3.23 3.23 0 01-2.54-1.31L369.62 99a5.38 5.38 0 01-1.55-4 5.26 5.26 0 011.81-3.79z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256.07 160v112h-80M416.07 432l-40-40M96.07 432l40-40"/></svg>
        </div>
        <div class="box">
            {{  data.RCP_PARTS_DTLS }}
        </div>
      </div>
    </div>
    <div class="food-recipe"></div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'

const data = ref({})

onMounted(() => {
  data.value = JSON.parse(window.sessionStorage.getItem('info'))
})
</script>
<style lang="scss">
.food-view {
  width: 1400px;
  margin: 30px auto 0 auto;
  display: flex;

  .food-info {
    width: 30%;

    .image {
      border-radius: 15px;
      overflow: hidden;
      height: 300px;
    }

    .title {
      display: flex;
      align-items: center;
      gap:10px;
      margin:20px 0 20px 0;

      .tag {
        font-size: 12px;
        font-weight: 600;
        color: #f89606;
        background: #fef0db;
        width: max-content;
        padding: 4px 7px 3px 7px;
        border-radius: 5px;
      }

      .name {
        font-weight: 700;
        font-size: 15px;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        word-wrap: break-word;
        overflow: hidden;
      }
    }

    .content{
        font-size:14px;
        margin:10px 0 0 0;
        line-height: 140%;
    }

    .nutrient{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        margin:10px 0 0 0;

        li{
            display: flex;
            gap:5px;
            margin:6px 0 0 0;

            span{
                font-size:13px;
                font-weight: 600;   

                &:first-child{
                    color:#84817e;
                }
            }
        }
    }

    .ingredient{
        width: 100%;
        background:#fafafa;
        display: flex;
        border:1px solid #e8e8e8;
        border-radius:10px;
        padding:20px;
        margin:25px 0 0 0;
        
        .icon{
            padding:0 20px 0 0;
        }

        .box{
            font-size:13px;
            line-height: 140%;
            font-weight: 500;
        }
    }
    
  }

  .food-recipe {
    width: 70%;
  }
}
</style>
<template>
  <div class="scrap-wrap">
    <div class="nolist" v-show="store.recipeArr.length === 0">
      스크랩에 저장된 레시피가 없습니다.
    </div>
    <div class="scrap-title">{{ store.recipeArr.length }}개의 스크랩</div>
    <ul class="scrap-list">
      <li v-for="item in store.recipeArr" :key="item.RCP_NM">
        <div class="image">
          <span><img :src="item.ATT_FILE_NO_MK" :alt="item.RCP_NM" /></span>
        </div>
        <div class="explain">
          <div class="scrap" @click.stop="store.saveRecipe(item)" v-if="!item.isDuplicate">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="#eee"
              viewBox="0 0 256 256"
            >
              <path
                d="M184,34H72A14,14,0,0,0,58,48V224a6,6,0,0,0,9.18,5.09l60.81-38,60.83,38A6,6,0,0,0,198,224V48A14,14,0,0,0,184,34Zm2,179.17-54.83-34.26a6,6,0,0,0-6.36,0L70,213.17V48a2,2,0,0,1,2-2H184a2,2,0,0,1,2,2Z"
              ></path>
            </svg>
          </div>
          <div class="scrap" @click.stop="store.removeRecipe(item)" v-else>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="#f89606"
              viewBox="0 0 256 256"
            >
              <path
                d="M184,32H72A16,16,0,0,0,56,48V224a8,8,0,0,0,12.24,6.78L128,193.43l59.77,37.35A8,8,0,0,0,200,224V48A16,16,0,0,0,184,32Z"
              ></path>
            </svg>
          </div>
          <div class="text">
            <div
              class="tag"
              :class="
                item.RCP_PAT2 === '반찬'
                  ? 'side-dish'
                  : item.RCP_PAT2 === '후식'
                  ? 'dessert'
                  : item.RCP_PAT2 === '일품'
                  ? 'special'
                  : item.RCP_PAT2 === '밥'
                  ? 'rice'
                  : ''
              "
            >
              {{ item.RCP_PAT2 }}
            </div>
            <h2>{{ item.RCP_NM }}</h2>
            <p>{{ item.RCP_NA_TIP }}</p>
          </div>
          <div class="sub">
            칼로리 <span>{{ item.INFO_ENG }}kcal </span>
            <div class="dot"></div>
            분류 <span>{{ item.RCP_WAY2 }}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { useCommonStore } from '../stores/common.js'

const store = useCommonStore()
</script>
<style lang="scss">
@import '@/assets/_mixin.scss';

.scrap-wrap {
  width: 1400px;
  display: flex;
  margin: 0 auto;
  flex-direction: column;

  .scrap-title {
    font-weight: 700;
    font-size: 17px;
    margin: 0 0 20px 0;
  }

  ul {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;

    li {
      display: flex;
      gap: 20px;
      padding: 25px;
      border: 1px solid #eee;
      border-radius: 15px;
      position: relative;
      overflow: hidden;

      .image {
        width: 32%;
        aspect-ratio: 1/1;
        overflow: hidden;
        position: relative;
        border-radius: 15px;

        img {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .explain {
        width: 68%;
        padding: 5px 0;

        .sub {
          font-size: 13px;
          font-weight: 600;
          display: flex;
          color: #777471;
          margin: 10px 0 0 0;
          align-items: center;

          .dot {
            width: 3px;
            height: 3px;
            background: #777471;
            border-radius: 50%;
            opacity: 0.2;
            margin: 0 10px 0 0;
          }

          span {
            color: var(--black);
            font-weight: 600;
            margin: 0 10px;
          }
        }

        .scrap {
          position: absolute;
          right: 13px;
          top: -5px;
          z-index: 1;
        }

        h2 {
          font-weight: 700;
          font-size: 15px;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          word-wrap: break-word;
          overflow: hidden;
        }

        p {
          width: 100%;
          height: 40px;
          display: block;
          margin: 10px 0 0 0;
          font-size: 14px;
          font-weight: 500;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          word-wrap: break-word;
          line-height: 1.2em;
          height: 2.4em;
          overflow: hidden;
        }

        .side-dish {
          color: var(--green);
          background: #e7f7e7;
        }

        .dessert {
          color: #d576c2;
          background: #ffe6fa;
        }

        .special {
          background: #ffeaea;
          color: #ff3338;
        }

        .rice {
          background: #eeeeee;
          color: #7a7874;
        }

        .tag {
          font-size: 12px;
          font-weight: 600;
          color: #f89606;
          margin: 0 0 10px 0;
          background: #fef0db;
          width: max-content;
          padding: 4px 7px 3px 7px;
          border-radius: 5px;
        }
      }
    }
  }
}

/* 반응형 */
@include laptop {
  .scrap-wrap {
    width: 100%;
    padding: 0 20px;
    ul {
      grid-template-columns: 1fr;
      gap: 5px;
    }
  }
}

@include iphone {
  .scrap-wrap {
    .scrap-title {
        font-size: 15px;
    }
  }
}
</style>
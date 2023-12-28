<template>
  <div class="list-item">
    <div class="srh-view" v-show="$route.query.search && props.totalCount">
      <span>'{{ $route.query.search }}' 검색 결과 </span>
      <span>총 {{ props?.totalCount }}개 </span>
    </div>
    <div class="srh-view" v-show="$route.query.category && props.totalCount">
      <span
        >'{{ $route.query.category === '국' ? '국&찌개' : `${$route.query.category}` }}' 카테고리
        결과
      </span>
      <span>총 {{ props?.totalCount }}개 </span>
    </div>
    <div class="srh-view" v-show="$route.query.keyword && props.totalCount">
      <span
        >'{{ $route.query.category === '국' ? '국&찌개' : `${$route.query.keyword}` }}' 키워드 결과
      </span>
      <span>총 {{ props?.totalCount }}개 </span>
    </div>
    <div class="content" v-if="!props.data">
      <NoDataMessage />
    </div>
    <div class="content" v-else>
      <ul v-if="!isLoading">
        <li v-for="(item, index) in props.data" :key="index" @click="movePage(item)">
          <div class="image">
            <span><img :src="item.ATT_FILE_NO_MK" :alt="item.RCP_NM" /></span>
          </div>
          <div class="explain">
            <div class="scrap">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#eee" viewBox="0 0 256 256"><path d="M184,34H72A14,14,0,0,0,58,48V224a6,6,0,0,0,9.18,5.09l60.81-38,60.83,38A6,6,0,0,0,198,224V48A14,14,0,0,0,184,34Zm2,179.17-54.83-34.26a6,6,0,0,0-6.36,0L70,213.17V48a2,2,0,0,1,2-2H184a2,2,0,0,1,2,2Z"></path></svg>
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
      <ul v-else class="skeleton">
        <li v-for="index in dataLength" :key="index">
          <div class="image"><span></span></div>
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
import NoDataMessage from '@/components/NoDataMessage.vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  data: Array,
  isLoading: Boolean,
  dataLength: Number,
  totalCount: String
})

const router = useRouter()

const movePage = (data) => {
  window.sessionStorage.setItem('info', JSON.stringify(data))
  router.push(`/food/${data.RCP_SEQ}`)
}
</script>
<style lang="scss">
@import '@/assets/_mixin.scss';

.list-item {
  .srh-view {
    margin: 0 0 20px 0;
    font-weight: 700;
    font-size: 17px;
    display: flex;
    align-items: flex-end;

    span {
      font-weight: 700;

      &:last-child {
        margin: 0 0 0 20px;
        font-size: 14px;
        font-weight: 500;
        color: gray;
      }
    }
  }
  .content {
    width: 1400px;
    margin: 0 auto;

    .skeleton {
       .image {
        span{
        background: #f2f2f2;
        display: block;
        width:100%;
        height: 100%;
        }
      }
      

      .explain {
        position: relative;

        .tag {
          width: 50px;
          height: 12px;
          border-radius: 5px;
          animation: skeleton-gradient 1.5s infinite ease-in-out;
        }

        h2 {
          width: 100px;
          height: 12px;
          border-radius: 5px;
          animation: skeleton-gradient 1.5s infinite ease-in-out;
        }

        p {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin: 20px 0 0 0;

          span {
            width: 100%;
            height: 12px;
            border-radius: 5px;
            animation: skeleton-gradient 1.5s infinite ease-in-out;
          }
        }

        .sub {
          span {
            width: 40px;
            height: 12px;
            border-radius: 5px;
            animation: skeleton-gradient 1.5s infinite ease-in-out;
            margin: 0;
          }

          .dot {
            width: 70px;
            height: 12px;
            border-radius: 5px;
            animation: skeleton-gradient 1.5s infinite ease-in-out;
            margin: 0 0 0 10px;
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

    ul {
      width: 100%;
      display: grid;
      gap: 20px;
      grid-template-columns: repeat(5, 1fr);

      li {
        border: 1px solid #f3f3f3;
        border-radius: 10px;
        width: 100%;
        overflow: hidden;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        background: #fff;

        &:hover {
          box-shadow: 5px 5px 20px #eee;
        }

        .image {
          overflow: hidden;
          height: 175px;
          display: flex;
          align-items: center;
          width: 100%;
          position: relative;
          z-index: 1;

          img {
            width: 100%;
            object-fit: cover;
          }
        }

        .explain {
          width: 100%;
          position: relative;

          .scrap{
          position: absolute;
          right:13px;
          top:-5px;
        }

          .text {
            padding: 20px;
          }

          .sub {
            font-size: 13px;
            font-weight: 600;
            display: flex;
            color: #777471;
            border-top: 1px solid #f3f3f3;
            padding: 15px 20px;
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
        }
      }
    }
  }

  /* 반응형 */
  @include laptop {
    .content {
      width: 100%;
      padding: 0 30px;

      ul {
        grid-template-columns: repeat(4, 1fr);
      }
    }

    .srh-view {
      width: 100%;
      padding: 0 30px;
    }
  }

  @include laptopToTablet {
    .content {
      ul {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  }

  @include tablet {
    .content {
      ul {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  }

  @include iphone {
    .content {
      padding: 0px;
      
    .skeleton {
       .image {
        span{
        width:80%;
        height: 80%;
        }
      }
    }
      ul {
        grid-template-columns: repeat(1, 1fr);
        gap: 0;

        li {
          border: none;
          border-top: 1px solid #eee;
          border-radius: 0;
          display: grid;
          grid-template-columns: 1.4fr 2fr;
          height:100%;

          &:last-child {
            border-bottom: 1px solid #eee;
          }

          .explain {
            .sub {
              border: none;
              padding: 0 20px 0 20px;
              font-size: 12px;
            }
          }

          .image {
            overflow: hidden;
            display: flex;
            width: 100%;
            align-items: center;

            span {
              margin: 0 auto;
              width: 80%;
              border-radius: 5px;
              height: 80% !important;
              margin: 0 auto 5px auto;
              overflow: hidden;

              img{
                object-fit: cover;
              }
            }
          }

          .explain {
            padding:0 20px 0 0px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            .text {
              padding: 0;
            }
            .sub {
              padding: 0;
              margin:10px 0 0 0;
            }
          }
        }
      }
    }

    .srh-view {
      padding: 15px 15px 0 15px;
      span {
        font-size: 15px;
        &:last-child {
          margin: 0 0 0 20px;
          font-size: 12px;
        }
      }
    }
  }

  @include mobile {
    .content {
      ul {
        li {
          grid-template-columns: 1.2fr 1.5fr;
          height: 165px;
          .image{
            height: 100%;
          }

          .explain {
            .sub {
              font-size: 11px;

              span {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                word-break: break-all;
                margin: 0 5px;
              }
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 357px) {
    .content {
      ul {
        li {
          grid-template-columns: 1fr 1.5fr;
          height: 135px;

          .explain {
            .sub {
              display: none;
            }
          }
        }
      }
    }
  }
}
</style>
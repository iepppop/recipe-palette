<template>
  <div
    class="header-wrap"
    :style="[route.path === '/' ? { background: '#f8f8f8' } : { background: 'transparent' }]"
  >
  <div class="header-bg" v-show="isOpen" @click="isOpen = false"></div>
    <div
      class="header"
      :style="[route.path === '/' ? { background: '#f8f8f8' } : { background: 'transparent' }]"
    >
      <div class="logo" @click="router.push('/')">
        <img src="/logo.png" />
        recipe palette
      </div>
      <div class="menu">
        <div class="scrap" @click="movePage()">
          <div class="count" v-show="store.recipeArr.length > 0">{{  store.recipeArr.length }}</div>
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" fill="#000000" viewBox="0 0 256 256"><path d="M192,24H96A16,16,0,0,0,80,40V56H64A16,16,0,0,0,48,72V224a8,8,0,0,0,12.65,6.51L112,193.83l51.36,36.68A8,8,0,0,0,176,224V184.69l19.35,13.82A8,8,0,0,0,208,192V40A16,16,0,0,0,192,24ZM160,208.46l-43.36-31a8,8,0,0,0-9.3,0L64,208.45V72h96Zm32-32L176,165V72a16,16,0,0,0-16-16H96V40h96Z"></path></svg>
        </div>
        <div class="icon" :class="isOpen ? 'isOpen' : ''" @click="toggleMenu()">
          <span></span><span></span><span></span>
        </div>
        <div class="menu-wrap" :class="isOpen ? 'isOpen' : ''">
          <div class="category">
            <span class="name">전체 카테고리</span>
            <ul>
              <li
                v-for="cate in categoryList"
                :key="cate.name"
                @click="router.push({ path: 'list', query: { category: cate.link, page: 1 } })"
                :style="
                  route.query.category === cate.link
                    ? { color: 'var(--green)', border: '1px solid var(--green)' }
                    : ''
                "
              >
                {{ cate.name }}
              </li>
            </ul>
            <span class="keyword">인기 재료 키워드</span>
            <ul>
              <li
                v-for="keyword in keywordList"
                :key="keyword"
                @click="router.push({ path: 'list', query: { keyword: keyword, page: 1 } })"
                :style="
                  route.query.keyword === keyword
                    ? { color: 'var(--green)', border: '1px solid var(--green)' }
                    : ''
                "
              >
                {{ keyword }}
              </li>
            </ul>
          </div>
          <div class="search-wrap">
            <div class="icon">
              <svg
                width="18"
                fill="var(--green)"
                xmlns="http://www.w3.org/2000/svg"
                class="ionicon"
                viewBox="0 0 512 512"
              >
                <path
                  d="M456.69 421.39L362.6 327.3a173.81 173.81 0 0034.84-104.58C397.44 126.38 319.06 48 222.72 48S48 126.38 48 222.72s78.38 174.72 174.72 174.72A173.81 173.81 0 00327.3 362.6l94.09 94.09a25 25 0 0035.3-35.3zM97.92 222.72a124.8 124.8 0 11124.8 124.8 124.95 124.95 0 01-124.8-124.8z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="레시피 검색하기"
              v-model="searchTxt"
              @keyup.enter="router.push({ path: 'list', query: { search: searchTxt, page: 1 } })"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCommonStore } from '../stores/common.js'

const store = useCommonStore();
const isOpen = ref(false)
const categoryList = ref([
  { name: '밥', link: '밥' },
  { name: '국&찌개', link: '국' },
  { name: '반찬', link: '반찬' },
  { name: '후식', link: '후식' },
  { name: '일품', link: '일품' }
])
const keywordList = ref(['순두부', '고기', '오징어', '버섯', '샐러드', '딸기'])
const router = useRouter()
const route = useRoute()
const searchTxt = ref('')

const toggleMenu = () => {
  isOpen.value = !isOpen.value
  document.body.style.overflow = isOpen.value ? 'hidden'  : 'auto'
}

const movePage = () => {
  router.push({ name: 'scrap', query: { orderBy:'최신순' }})
}

watch(route, () => {
  isOpen.value = false;
  document.body.style.overflow = isOpen.value ? 'hidden'  : 'auto'
})

</script>
<style lang="scss">
@import '@/assets/_mixin.scss';

.header-wrap {
  width: 100%;
  background: #f8f8f8;  
  .header-bg{
    display: none;
  }

  .header {
    width: 1400px;
    display: flex;
    margin: 0 auto;
    height: 70px;
    align-items: center;
    justify-content: space-between;
    background-color: #f8f8f8;
    position: relative;

    .menu {
       display: flex;
       width: max-content;
       display: flex;
       align-items: center;
      
      .menu-wrap {
        position: absolute;
        width: 300px;
        background: #fff;
        opacity: 0;
        right: -15px;
        z-index: -1;
        border-radius: 15px;
        border: 1px solid #eee;
        overflow: hidden;
        transition: 0.1s ease-in-out;
        top: 10px;
        padding: 20px 0 0 0;

        &.isOpen {
          z-index: 9999;
          opacity: 1;
        }

        .category {
          padding: 25px 25px;

          ul {
            display: flex;
            margin: 20px 0 0 0;
            gap: 10px;
            flex-wrap: wrap;

            li {
              border: 1px solid #eee;
              border-radius: 20px;
              padding: 9px 18px;
              font-size: 13px;
              font-weight: 500;
              cursor: pointer;
              transition: 0.3s ease-in-out;

              &:hover {
                border: 1px solid var(--green);
                color: var(--green);
              }
            }
          }

          span {
            font-weight: 600;
            font-size: 15px;
          }

          .keyword {
            margin: 35px 0 0 0;
          }
        }

        .search-wrap {
          width: 100%;
          border-top: 1px solid #eee;
          height: 50px;
          display: flex;
          align-items: center;
          padding: 0 30px;

          .icon {
            width: 30px;
          }

          input {
            width: calc(100% - 30px);
          }
        }
      }

      .scrap{
        height: 20px;
        width: 22px;
        position: relative;
        margin:0 10px 0 0;
        cursor: pointer;

        .count{
          position: absolute;
          top:-6px;
          right:-4px;
          font-size: 10px;
          width:14px;
          height:14px;
          border-radius: 50%;
          background: #f89606;
          display: flex;
          align-items: center;
          color:#fff;
          z-index: 1;
          justify-content: center;
        }

        svg{
          position: absolute;
          right:0;
          top:0;
        }
      }
      

      .icon {
        position: relative;
        display: flex;
        align-items: center;
        cursor: pointer;
        width: 15px;
        height: 12px;
        z-index: 99999;

        &.isOpen {
          span {
            &:first-child {
              top: 50%;
              transform: translate(0, -50%) rotate(45deg);
            }
            &:nth-child(2) {
              display: none;
            }
            &:last-child {
              top: 50%;
              transform: translate(0, -50%) rotate(-45deg);
            }
          }
        }

        span {
          transition: 0.3s ease-in-out;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          border-radius: 15px;
          overflow: hidden;
          background: var(--black);

          &:nth-child(2) {
            top: 5px;
          }

          &:nth-child(3) {
            bottom: 0;
            top: auto;
          }
        }
      }
    }

    .logo {
      font-size: 16px;
      font-weight: 900;
      display: flex;
      align-items: center;
      cursor: pointer;

      img {
        width: 13px;
        margin: 0 10px 0 0;
      }
    }
  }
}

/* 반응형 */
@include laptop {
  .header-wrap {
    overflow: hidden;
    .header-bg{
      position: fixed;
      left:0;
      top:0;
      width:100%;
      height: 100vh;
      background:rgba(0,0,0,0.5);
      display: block;
      z-index: 5;
    }

    .header {
      width: 100%;
      padding: 0 30px;

      .icon {
        position: static;
      }

      .menu {

        .menu-wrap {
          position: fixed;
          height: 100vh;
          border-radius: 0;
          top: 0;
          right:-80vw;
          border-top: none;
          transition: 0.3s ease-in;
          opacity: 0;

          &.isOpen{
            right:0;
            opacity: 1;
          }

          .search-wrap{
            border:0;
            background:#f8f8f8;
            border-radius: 30px;
            width:85%;
            margin:10px auto 0 auto;
            height:45px;
            padding:0 20px;
          }
        }
      }
    }
  }
}

@include tabletToMobile {
  .header-wrap {
    .header {
      .logo {
        font-size: 14px;

        img {
          width: 10px;
        }
      }
    }
  }
}

@include tabletToMobile {
  .header-wrap {
    .header {
      padding: 0 15px;
      height: 50px;
    }
  }
}
</style>
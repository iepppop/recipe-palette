<template>
  <div class="scrap-wrap">
    <span class="scrap-name">보관함</span>
    <div class="scrap-title">
      <div class="scrap-title-rel">
      <div class="scrap-cate-search-wrap">
        <div class="scrap-cate-wrap" :style="{ height: `${menuHeight}`}">
          <ul class="scrap-cate" ref="cateList" >
        <li @click="toggleMenu">{{ activeButton }}<span><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="#2e2e2e" viewBox="0 0 256 256"><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path></svg></span></li>
        <li v-for="item in updatedCategoryList" :key="item" @click="clickMenu(item)" v-show="activeButton !== item.name">
          {{ item.name }}
        </li>
      </ul>
        </div>
      <div class="scrap-search">
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="#000000" viewBox="0 0 256 256"><path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path></svg>
      <input type="text" placeholder="보관함 내 검색" :value="inputValue" @keyup.enter="handleInputChange"/>
    </div>
  </div>
</div>
<div class="no"></div>
  <div class="order" v-show="!isEmptyResult">
      <button @click="reverseArray('최신순')" :class="arrayTypeBtn === '최신순' && 'active'">최신순</button>
      <span></span>
      <button @click="reverseArray('오래된순')" :class="arrayTypeBtn === '오래된순' && 'active'">오래된순</button>
    </div>
    </div>
    <!-- <div class="nolist" v-show="store.recipeArr.length === 0">
      스크랩에 저장된 레시피가 없습니다.
    </div> -->
    <div class="nolist" v-show="isEmptyResult">
      검색 결과가 없습니다.
    </div>
    <div class="nolist" v-show="updatedList.length === 0">
      스크랩한 레시피가 없습니다.
    </div>
    <div class="scrap-list-wrap">
    <ul class="scrap-list">
      <li v-for="item in updatedList" :key="item.RCP_NM" @click="movePage(item)">
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
  </div>
</template>
<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCommonStore } from '../stores/common.js'

const store = useCommonStore()

const categoryList = ref([
  { name: '전체', link: '전체' },
  { name: '밥', link: '밥' },
  { name: '국&찌개', link: '국' },
  { name: '반찬', link: '반찬' },
  { name: '후식', link: '후식' },
  { name: '일품', link: '일품' }
])
const router = useRouter();
const route = useRoute()

const updatedCategoryList = ref([]);
const cateList = ref(null)
const isOPenMenu  = ref(false)
const menuHeight = ref(40);
const activeButton = ref(route.query.category || '전체');
const updatedList = ref([])
const arrayTypeBtn =  ref(route.query.orderBy || '최신순');
const inputValue = ref('');
const isEmptyResult = ref(false)

const movePage = (item) => {
    window.sessionStorage.setItem('info', JSON.stringify(item))
    router.push({ name: 'food', params: { idx: item.RCP_SEQ } });
}

const toggleMenu = () => {
  isOPenMenu.value = !isOPenMenu.value;
  if(isOPenMenu.value) menuHeight.value = `${cateList.value.clientHeight}px`;
  else menuHeight.value = '40px'
}

const clickMenu = (item) => {
  activeButton.value = item.name
  if(activeButton.value === '전체') router.push({ name: 'scrap', query:{ orderBy: '최신순'}})
  else router.push({ name: 'scrap', query: { orderBy: '최신순', category: item.name}})
  toggleMenu()
  updateList()
  inputValue.value = ''
  isEmptyResult.value = false
}

const changeName = () => {
  if(activeButton.value !== '전체') updatedCategoryList.value = categoryList.value.filter((x)=> x.name !== route.query.category)
  else updatedCategoryList.value = categoryList.value.filter((x)=> x.name !== '전체')
}

const updateList = () =>{
  if(activeButton.value !== '전체'){
    activeButton.value =  route.query.category;
    updatedList.value = store.recipeArr.filter((x)=> x.RCP_PAT2 === route.query.category);
  }
  else {
    updatedList.value = store.recipeArr
  };
  changeName()
}

const reverseArray = (name) => {
  if(!route.query.search) updateList()
  arrayTypeBtn.value = name;

  if (name === '오래된순') {
    updatedList.value.sort((a, b) => new Date(a.date) - new Date(b.date));
  } else {
    updatedList.value.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  const query = {
  orderBy: route.query.orderBy,
  ...(route.query.category && { category: route.query.category }),
  ...(route.query.search && { search: route.query.search }),
};
  router.push({ name: 'scrap', query });
};

const handleInputChange = (e) => {
  inputValue.value = e.target.value
  addSearch()
}

const addSearch = () => {
  updatedList.value = route.query.category ?
  store.recipeArr.filter((item)=> item.RCP_NM.includes(inputValue.value) && item.RCP_PAT2.includes(route.query.category))
  :
  store.recipeArr.filter((item)=> item.RCP_NM.includes(inputValue.value))
  console.log('aa')
  if(router.query.search){
    console.log('dd')
    isEmptyResult.value = updatedList.value.length < 1 ? true : false;
  }
  const query = {
  ...(route.query.orderBy && { orderBy: route.query.orderBy }),
  ...(route.query.category && { category: route.query.category }),
  search: inputValue.value,
};
  router.push({ name: 'scrap', query });
}


onMounted(()=>{
  const query = {
  ...(route.query.orderBy && { orderBy: route.query.orderBy }),
  ...(route.query.category && { category: route.query.category }),
  ...(route.query.search && { search: route.query.search })
};

  router.push({ name: 'scrap', query });
  if(!route.query.search){
    reverseArray(arrayTypeBtn.value)
  }
  else {
    inputValue.value = route.query.search;
    addSearch()
    changeName()
  }
})

watch(route,()=>{
  if(!route.query.search) reverseArray(route.query.orderBy)
})

watch(() => store.recipeArr.length, () => {
  reverseArray(route.query.orderBy);
}, { deep: true });

</script>
<style lang="scss">
@import '@/assets/_mixin.scss';

.scrap-wrap {
  display: flex;
  flex-direction: column;
  width: 1400px;
  margin: 0 auto 50px auto;

  .nolist{
    height: 40vh;
    min-height: 160px;
    max-height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .scrap-name{
    font-size: 16px;
    font-weight: 700;
    margin:0 0 10px 0;
  }

  .scrap-title {
    font-weight: 700;
    font-size: 17px;
    display:flex;
    justify-content: flex-end;
    position: relative;
    margin:20px 0 25px 0;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: 100%;

    .order{
      display: flex;
      gap:10px;
      justify-content: flex-end;
      align-items: center;

      button{
        color:#5b5b5b;
        cursor: pointer;

        &.active{
          font-weight: 600;
        }
      }

      span{
          height:10px;
          background:#abaaaa;
          width:1px;
          display: block;
        }
    }
    .scrap-title-rel{
    position: relative;
    width: 100%;

    .scrap-cate-search-wrap{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap:15px;
    position: absolute;
    top:-12px;
    left:0;
    width: 100%;
    padding:0 10px 0 0;

    .scrap-cate-wrap{
      height: 40px;
      width: 100%;
      overflow: hidden;
      border:1px solid #eee;
      border-radius: 5px;
      transition: 0.3s ease-in-out;
      z-index: 99;
      background: #fff;

      .scrap-cate{
        width: 100%;

        li{
          line-height: 39px;
          padding:0 20px;
          display: flex;
          justify-content:space-between;
          font-size: 14px;
          font-weight: 600;
          position: relative;
          cursor: pointer;
          transition: 0.3s ease-in-out;

          &:hover{
            background:#f8f8f8
          }

          svg{
            position: absolute;
            right:20px;
            top:50%;
            transform: translate(0,-50%);
          }
        }
      }
      }
    }
  
  .scrap-search {
    margin: 0 auto;
    border: 1px solid #eee;
    background: #f8f8f8;
    height: 40px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    padding:0 20px;
    width: 100%;

    input {
      width: 100%;
      height: 100%;
      margin:0 0 0 10px;

      &::placeholder {
        font-size: 14px;
        font-weight: 600;
      }
    }
  }
  }
  }

  .scrap-list {
    width: 100%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;

    li {
      display: flex;
      gap: 20px;
      padding: 25px;
      border: 1px solid #eee;
      border-radius: 15px;
      position: relative;
      overflow: hidden;

      .image {
        width: 130px;
        aspect-ratio: 1/1;
        overflow: hidden;
        position: relative;
        border-radius: 15px;

        img {
          position: absolute;
          width: 100%;
          height: 100%;
          top:50%;
          box-sizing: border-box;
          left:50%;
          transform: translate(-50%,-50%);
          object-fit: cover;
        }
      }

      .explain {
        flex: 1;
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

        .tag {
          font-size: 12px;
          font-weight: 600;
          margin: 0 0 10px 0;
          color: rgb(162, 78, 0);
          background: rgb(243, 222, 202);
          width: max-content;
          padding: 4px 7px 3px 7px;
          border-radius: 5px;

          &.dessert {
          color: #d576c2;
          background: #ffe6fa;
        }

        &.side-dish {
          color: var(--green);
          background: #e7f7e7;
        }

        &.special {
          background: #ffeaea;
          color: #ff3338;
        }

        &.rice {
          background: #eeeeee;
          color: #7a7874;
        }
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
    .scrap-title {
      grid-template-columns: 1fr 1fr;

      .no {
        display: none;
      }
    }

    .scrap-list{
      grid-template-columns: 1fr 1fr;

      li{
        .explain{
          display:flex;
          flex-direction:column;
          justify-content: space-between;

          .sub{
            display:flex;
            justify-content:flex-start;
            width: 100%;
          }
        }
      }
    }
  }
}

@include laptopToTablet {
  .scrap-wrap {
    .scrap-title {
      grid-template-columns: 1fr 1fr;
    }

    .scrap-list{
      grid-template-columns: 1fr;
    }
  }
  }

  @include tabletToMobile {
    .scrap-wrap {
      padding: 0 15px;
    .scrap-title {
      grid-template-columns: 1fr;
      .scrap-title-rel{
      .scrap-cate-search-wrap{
        grid-template-columns: 1fr;
        gap:5px;
        padding:0;
      }
      }

      
      .scrap-cate-wrap{
          order:2
        }

        .scrap-search{
          
          input{
            margin: 0 !important;;
          }
          svg{
            order:2;
          }
        }

      .order{
        display:none;
      }
    }
    
    .scrap-list{
      grid-template-columns: 1fr;
      margin:60px 0 0 0;
    }
  }
  }

@include liphone {
  .scrap-wrap {
    .scrap-list{
      li{
        .image{
          width:125px;
        }
        .explain{
      .sub{font-size:11px;}
    }
      }
    }
  }
}  

@include iphone {
  .scrap-wrap {
    padding:0;
    .scrap-name{
      padding:0 15px;
    }
    .scrap-title {
      font-size: 15px;
      padding:0 15px;
    }
    .scrap-list-wrap{
      padding:0 15px;
    .scrap-list {
      border:1px solid #eee;
      border-radius: 5px;
    li {
      border:none;
      border-top:1px solid #eee;
      border-radius: 0px;
      padding:15px;

      &:first-child{
        border:none;
      }

      .image {
        width:140px;
      }
    }
    
    } 
    }
  }
}

@include iphone {
  .scrap-wrap {
    .scrap-list-wrap{
      .scrap-lis{
        li{
    .image {
      width: 100px;
      }

    }
    }
    }
  }
}
</style>
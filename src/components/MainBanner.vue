<template>
  <div class="main-banner">
    <h1>
      총
      <div class="recipe-text">
        <div v-for="ele in recipeName" :key="ele" class="recipe-ele"><span></span>{{ ele }}</div>
      </div>
      개수
    </h1>
    <div class="number">
      <span class="num-text">1,421,342,324</span>
    </div>
    <div class="search-bar">
      <input type="text" placeholder="지금 먹고 싶은 요리 이름을 검색해주세요." v-model="srhRecipeName" @keyup.enter="sendSrhData()"/>
      <button @click="sendSrhData()">
        <svg
          width="20px"
          fill="#fff"
          xmlns="http://www.w3.org/2000/svg"
          class="ionicon"
          viewBox="0 0 512 512"
        >
          <path
            d="M456.69 421.39L362.6 327.3a173.81 173.81 0 0034.84-104.58C397.44 126.38 319.06 48 222.72 48S48 126.38 48 222.72s78.38 174.72 174.72 174.72A173.81 173.81 0 00327.3 362.6l94.09 94.09a25 25 0 0035.3-35.3zM97.92 222.72a124.8 124.8 0 11124.8 124.8 124.95 124.95 0 01-124.8-124.8z"
          />
        </svg>
      </button>
    </div>
    <div class="sub-content">
      <p>매일 업데이트 되는 다양한 레시피</p>
      <p>레시피 팔레트에서 지금 바로 만나보세요.</p>
    </div>
    <div class="plate">
            <img src="@/assets/images/plate.png" alt="plate"/>
        </div>  
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router';
import baffle from 'baffle';
import gsap from 'gsap';

const recipeName = ref(['레', '시', '피'])
const srhRecipeName = ref('');
const router = useRouter();

const enterAnimation = () => {
  const tl = gsap.timeline({paused: false});
  tl.from('.main-banner h1',0.7,{
    y:30,
    opacity:0,
    delay:1.3,
  })
  gsap.from('.plate',1,{
    y:300,
    opacity:0,
    delay:0.5
  })
  gsap.from('.main-banner .number',1.2,{
    y:30,
    delay:1.3,
    opacity:0,
    onStart:()=>{
      shuffle()
    }
  })
  gsap.from('.search-bar',1,{
    y:30,
    opacity:0,
    delay:1.3,
  })
  gsap.from('.sub-content p',1,{
    y:30,
    opacity:0,
    delay:1.5,
  })
}


const sendSrhData = () => {
  router.push({
    path: '/list',
    query: { search: `${srhRecipeName.value}` , page: 1}
  })
}

const shuffle = () =>{
  const text = baffle('.num-text');
  text.set({
    characters: '1234567890',
    exclude:',',
    speed:100
  });
  text.start();
  text.reveal(9000)
}

onMounted(()=>{
  enterAnimation()
  // shuffle()
})
</script>
<style lang="scss">
.main-banner {
  width: max-content;
  margin: 0 auto;
  padding: 100px 0 0 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow: hidden;

  .plate{
    padding:0 10px 0 0;
    margin:20px 0 140px 0;
    width:90%;
    height: 300px;
    overflow: hidden;
  }

  .sub-content {
    text-align: center;
    margin: 40px 0 0 0;
    font-size: 14px;
    color: #454545;
    font-weight: 600;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .search-bar {
    display: flex;
    width: 500px;
    margin: 40px 0 0 0;
    box-shadow: 3px 3px 60px rgba(83, 83, 83, 0.1);
    border-radius: 15px;
    overflow: hidden;

    button {
      width: 60px;
      background: var(--green);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    input {
      width: calc(100% - 60px);
      height: 50px;
      background: #fff;
      padding: 0 30px;

      &::placeholder {
        font-weight: 800;
        opacity: 0.7;
      }
    }
  }

  .number {
    font-size: 4rem;
    color: var(--green);
    display: flex;
    width: 100%;
    justify-content: center;

    span {
      font-weight: 900;
    }
  }

  h1 {
    font-size: clamp(1rem, 10vw, 3.5rem);
    font-weight: 500;
    display: flex;

    .recipe-text {
      display: flex;
      padding: 0 15px;

      .recipe-ele {
        position: relative;

        span {
          position: absolute;
          top: -18px;
          left: 50%;
          transform: translate(-50%, 0);
          width: 0.4vw;
          height: 0.4vw;
          background: var(--orange);
          border-radius: 50%;
        }
      }
    }
  }
}
</style>
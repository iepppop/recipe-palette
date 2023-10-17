<template>
  <div
    class="header-wrap"
    :style="[this.$route.path === '/' ? { background: '#f8f8f8' } : { background: 'transparent' }]"
  >
    <div
      class="header"
      :style="[
        this.$route.path === '/' ? { background: '#f8f8f8' } : { background: 'transparent' }
      ]"
    >
      <div class="logo" @click="this.$router.push('/')">
        <img src="/logo.png" />
        recipe palette
      </div>
      <div class="menu">
        <div class="icon"><span></span><span></span><span></span></div>
        <div class="menu-wrap">
          <div class="category">
          <span class="name">전체 카테고리</span>
          <ul>
            <li>밥</li><li>국&찌개</li><li>반찬</li><li>후식</li><li>일품</li>
          </ul>
          <span class="keyword">인기 재료 키워드</span>
          <ul>
            <li>순두부</li><li>고기</li><li>오징어</li><li>김밥</li><li>샐러드</li><li>딸기</li>
          </ul>
        <div class=""></div>  
        </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>

</script>
  <style lang="scss">
@import '@/assets/_mixin.scss';

.header-wrap {
  width: 100%;
  background: #f8f8f8;

  .header {
    width: 1400px;
    display: flex;
    margin: 0 auto;
    height: 70px;
    align-items: center;
    justify-content: space-between;
    background-color: #f8f8f8;
    position: relative;

    .menu{
      width:20px;
      height: 14px;

      .menu-wrap{
        position: absolute;
        width:300px;
        background:#fff;
        top:60px;
        right:0;
        z-index: 1;
        border-radius: 15px;

        .category{
          padding:25px 25px ;

          ul{
            display: flex;
            margin:20px 0 0 0;
            gap:10px;
            flex-wrap: wrap;

            li{
              border:1px solid #eee;
              border-radius: 20px;
              padding:9px 18px;
              font-size: 13px;
              font-weight: 500;
            }
          }

          span{
            font-weight: 600;
            font-size:15px;
          }

          .keyword{
            margin:35px 0 0 0;
          }
        }
      }

      .icon{
        width:100%;
        height: 100%;
        position: relative;
        display: flex;
        align-items: center;
        cursor: pointer;

       span{
        position: absolute;
        top:0;
        left:0;
        width:100%;
        height: 2px;
        border-radius: 15px;
        overflow: hidden;
        background:var(--black);

        &:nth-child(2){
          top:6px;
        }

        &:nth-child(3){
          bottom:0;
          top:auto;
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
  .header-wrap{
    .header{
      width:100%;
      padding:0 30px;
    }
  }
}

@include tabletToMobile{
  .header-wrap{
    .header{
      .logo {
      font-size: 14px;

      img {
        width: 10px;
      }
    }
    }
  }
}

@include tabletToMobile{
  .header-wrap{
    .header{
      padding:0 15px;
      height: 50px;
    }
  }
}
</style>
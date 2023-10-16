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
      <div class="menu"></div>
    </div>
  </div>
</template>
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
<template>
  <div class="header-wrap" :style="[this.$route.path === '/' ? {background:'#f8f8f8'}: {  background:'transparent'}]">
    <div class="header" :style="[this.$route.path === '/' ? {background:'#f8f8f8'}: {  background:'transparent'}]">
      <div class="logo" @click="this.$router.push('/')">
          <img src="/logo.png" />
          recipe palette
      </div>
      <div class="menu"></div>
    </div>
  </div>
  </template>
  <style lang="scss">
  .header-wrap{
    width:100%;
    background:#f8f8f8;
    
  .header {
    display: flex;
    max-width:1400px;
    margin:0 auto;
    height:70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color:#f8f8f8;
  
    .logo{
      font-size:16px;
      font-weight: 900;
      display: flex;
      align-items: center;
      cursor: pointer;
  
      img{
          width:13px;
          margin:0 10px 0 0;
      }
    }
  }
}
  </style>
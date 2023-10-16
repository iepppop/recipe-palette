<template>
  <div class="footer">
    <div class="footer-wrap">
      <div class="logo-wrap">
        <div class="logo">
          recipe palette
        </div>
        <span>© 2023 recipe palette All Rights Reserved.</span>
      </div>
      <div class="address">
        <ul>
            <li></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
@import '@/assets/_mixin.scss';

.footer {
  width: 100%; 
  border-top:1px solid #f8f8f8;

  .footer-wrap {
    width: 1400px;
    margin: 30px auto 29px auto;
    display: grid;
    grid-template-columns: 1fr 1fr;

    .address{
        display: flex;
        justify-content: flex-end;

        ul{
            display: flex;
            gap:15px;
            align-items: center;
            
            span{
                width:1px;
                height:8px;
                background:#eee;
            }

            li{
              font-size:10px;
              font-weight: 700;
            }
        }
    }

    .logo-wrap {
      display: flex;
      gap: 20px;
      align-items: center;

      span {
        font-size: 10px;
        color: gray;
        font-weight: 600;
        opacity: 0.5;
      }
      .logo {
        text-transform: uppercase;
        font-size: 12px;
        font-weight: 900;
        display: flex;
        align-items: center;
        cursor: pointer;

        img {
          width: 13px;
        }
      }
    }
  }

   /* 반응형 */
   @include laptop {
    .footer-wrap {
      width:100%;
      padding:0 30px;
    }
  }

  @include iphone {
    .footer-wrap {
      padding:0 10px;
      margin: 15px auto;
      grid-template-columns: 1fr;
    }

    .address{
        display: none;
      }
  }
}
</style>
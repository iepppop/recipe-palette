<template>
  <div class="sub-banner-wrap">
    <div class="sub-banner">
      <div class="content">
        <span>건강한 식재료, 신선한 야채</span>
        <span>다양하게 보고 선택하세요.</span>
      </div>
      <button>더 알아보기</button>
    </div>
  </div>
</template>
<style lang="scss">
@import '@/assets/_mixin.scss';

.sub-banner-wrap {
  max-width: 1400px;
  margin: 110px auto 30px auto;

  .sub-banner {
    width: 100%;
    background-image: url('@/assets/images/minibanner.png');
    background-position: center bottom;
    background-color: #eef2cf;
    background-size: auto auto;
    height: 130px;
    border-radius: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .content {
      margin: 0 115px;
      display: flex;
      gap: 5px;
      flex-direction: column;
      height: 100%;
      justify-content: center;

      span {
        color: #1e1e1e;

        &:first-child {
          font-size: 14px;
          font-weight: 700;
        }

        &:last-child {
          font-size: 24px;
          font-weight: 800;
        }
      }
    }

    button {
      background: #fff;
      margin: 0 100px;
      padding: 12px 18px;
      border-radius: 5px;
      font-weight: 700;
    }
  }

  /* 반응형 */
  @include laptop {
    width: 100%;
    padding: 0 30px;

    .sub-banner {
      background-size: 0 100%;
      background-repeat: no-repeat;
    }
  }

  @include laptopToTablet {
    margin: 10px auto;
    .sub-banner {
      .content {
        margin: 0 70px;

        span {
          &:first-child {
            font-size: 13px;
            font-weight: 700;
          }

          &:last-child {
            font-size: 20px;
          }
        }
      }

      button {
        margin: 0 80px 0 0;
        font-size:12px;
      }
    }
  }

  @include iphone {
    padding: 0 0px;
    margin-top:-20px;

    .sub-banner {
        height: 80px;
        padding: 0 0px;
        margin:0;
        border-radius: 0;
        
      .content {
        margin: 0 20px;
        gap:3px;

        span {
          &:last-child {
            font-size: 13px;
          }
        }
      }

      button {
        margin:0;
        display: none;
      }
    }
  }
}
</style>
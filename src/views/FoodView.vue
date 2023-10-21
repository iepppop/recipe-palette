<template>
  <div class="food-view">
    <div class="food-info">
      <div class="image">
        <img :src="data.ATT_FILE_NO_MAIN" />
      </div>
      <div class="title">
        <div class="tag" :class="data.RCP_PAT2 === '반찬' && 'side-dish'">{{ data.RCP_PAT2 }}</div>
        <div class="name">{{ data.RCP_NM }}</div>
      </div>
      <div class="content">
        {{ data.RCP_NA_TIP }}
      </div>
      <ul class="nutrient">
        <li>
          <span>열량</span><span>{{ data.INFO_ENG }}kcal</span>
        </li>
        <li>
          <span>탄수화물</span><span>{{ data.INFO_CAR }}g</span>
        </li>
        <li>
          <span>단백질</span><span>{{ data.INFO_PRO }}g</span>
        </li>
        <li>
          <span>지방</span><span>{{ data.INFO_FAT }}g</span>
        </li>
        <li>
          <span>나트륨</span><span>{{ data.INFO_NA }}g</span>
        </li>
      </ul>
      <div class="ingredient-wrap">
        <div class="ingredient">
          <div class="icon">
            <svg
              width="14"
              xmlns="http://www.w3.org/2000/svg"
              class="ionicon"
              viewBox="0 0 512 512"
            >
              <path
                d="M416.07 272a160 160 0 10-160 160 160 160 0 00160-160zM142.12 91.21A46.67 46.67 0 00112 80l-2.79.08C83.66 81.62 64 104 64.07 131c0 13.21 4.66 19.37 10.88 27.23a4.55 4.55 0 003.24 1.77h.88a3.23 3.23 0 002.54-1.31L142.38 99a5.38 5.38 0 001.55-4 5.26 5.26 0 00-1.81-3.79zM369.88 91.21A46.67 46.67 0 01400 80l2.79.08C428.34 81.62 448 104 447.93 131c0 13.21-4.66 19.37-10.88 27.23a4.55 4.55 0 01-3.24 1.76h-.88a3.23 3.23 0 01-2.54-1.31L369.62 99a5.38 5.38 0 01-1.55-4 5.26 5.26 0 011.81-3.79z"
                fill="none"
                stroke="currentColor"
                stroke-miterlimit="10"
                stroke-width="32"
              />
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="32"
                d="M256.07 160v112h-80M416.07 432l-40-40M96.07 432l40-40"
              />
            </svg>
          </div>
          <div class="box">
            {{ data.RCP_PARTS_DTLS }}
          </div>
        </div>
      </div>
    </div>
    <div class="food-recipe">
      <div class="order">레시피 순서</div>
      <ul>
        <li v-for="(item, index) in extractedArray" :key="index">
          <div class="number">
            <div class="circle">
              <svg width="100%" height="100%">
                <circle
                  cx="50%"
                  cy="50%"
                  r="40%"
                  stroke="#e0e0e0"
                  stroke-width="1"
                  background="#fff"
                  fill="#fff"
                />
              </svg>
              <span>
                {{ index + 1 }}
              </span>
            </div>
            <div class="solid"></div>
          </div>
          <div class="explain">
            <div class="r-image">
              <img :src="item.img" />
            </div>
            <div class="text">
              {{ item.manual }}
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const data = ref({})
const extractedArray = ref([])

const getNewAray = () => {
  for (let i = 1; i <= 20; i++) {
    const propName = `MANUAL${i.toString().padStart(2, '0')}`
    const imgPropName = `MANUAL_IMG${i.toString().padStart(2, '0')}`

    if (data.value.hasOwnProperty(propName) && data.value.hasOwnProperty(imgPropName)) {
      const item = {
        manual: data.value[propName].slice(2, -1),
        img: data.value[imgPropName]
      }
      extractedArray.value.push(item)
    }
  }
  extractedArray.value = extractedArray.value.filter((item) => item.manual.trim() !== '')
}

onMounted(() => {
  data.value = JSON.parse(window.sessionStorage.getItem('info'))
  getNewAray()
  scrollAnimation()
})
</script>
<style lang="scss">
@import '@/assets/_mixin.scss';

#action {
  padding: 10px;
  font-size: 0.875em;
  margin: 10px;
  cursor: pointer;
  font-weight: 700;
  font-family: 'Roboto', sans-serif;
}

.food-view {
  width: 1400px;
  margin: 30px auto 0 auto;
  display: flex;
  gap: 100px;

  .food-recipe {
    width: 70%;

    .order {
      display: none;
    }

    ul {
      li {
        display: flex;
        gap: 60px;

        .explain {
          width: calc(100% - 100px);
        }

        .number {
          width: 100px;
          position: relative;

          .solid {
            width: 1px;
            height: 100%;
            background: #e0e0e0;
            position: absolute;
            left: 50%;
            top: 10px;
            z-index: -1;
          }

          .circle {
            position: relative;
            width: 100%;
            height: 100px;
          }

          span {
            color: #565656;
            font-weight: 700;
            position: absolute;
            top: 50px;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
        .r-image {
          width: 200px;
          overflow: hidden;
          height: 130px;
          border-radius: 15px;
          display: flex;
          align-items: center;
          margin: 10px 0 30px 0;
        }

        .text {
          margin: 0 0 100px 0;
        }

        &:last-child {
          .number {
            .solid {
              display: none;
            }
          }
        }
      }
    }
  }

  .food-info {
    width: 30%;

    .image {
      border-radius: 15px;
      overflow: hidden;
      max-height: 250px;
    }

    .title {
      display: flex;
      align-items: center;
      gap: 10px;
      margin: 20px 0 20px 0;

      .tag {
        font-size: 12px;
        font-weight: 600;
        color: #f89606;
        background: #fef0db;
        width: max-content;
        padding: 4px 7px 3px 7px;
        border-radius: 5px;
      }

      .name {
        font-weight: 700;
        font-size: 15px;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        word-wrap: break-word;
        overflow: hidden;
      }
    }

    .content {
      font-size: 14px;
      margin: 10px 0 0 0;
      line-height: 140%;
    }

    .nutrient {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      margin: 10px 0 0 0;

      li {
        display: flex;
        gap: 5px;
        margin: 6px 0 0 0;

        span {
          font-size: 13px;
          font-weight: 600;

          &:first-child {
            color: #84817e;
          }
        }
      }
    }

    .ingredient {
      width: 100%;
      background: #fafafa;
      display: flex;
      border: 1px solid #e8e8e8;
      border-radius: 10px;
      padding: 20px;
      margin: 25px 0 0 0;

      .icon {
        padding: 0 20px 0 0;
      }

      .box {
        font-size: 13px;
        line-height: 140%;
        font-weight: 500;
      }
    }
  }
  /* 반응형 */
  @include laptop {
    width: 100%;
    padding: 0 30px;
    gap: 80px;

    .food-info {
      width: 40%;
    }
  }

  @include laptopToTablet {
    gap: 60px;

    .food-info {
      width: 50%;
    }
  }

  @include tablet {
    flex-direction: column;
    .food-info {
      width: 100%;

      .image {
        max-height: 450px;
      }
    }

    .food-recipe {
      width: 100%;
    }
  }

  @include tabletToMobile {
    .food-info {
      .image {
        max-height: 350px;
      }
    }
  }

  @include iphone {
    padding: 0;
    margin:0;

    .food-info {
      .image {
        border-radius: 0px;
      }

      .title,
      .content,
      .nutrient,
      .ingredient-wrap {
        padding: 0 15px;
      }

      .ingredient {
        flex-direction: column;
        gap: 5px;
      }
    }

    .food-recipe {
      .order {
        display: block;
        padding: 0 15px;
        font-weight: 600;
        margin: 0 0 20px 0;
      }
      ul {
        li {
          flex-direction: column;
          gap: 0;

          .number {
            display: none;
          }

          .explain {
            width: 100%;
            padding: 0 15px;

            .r-image {
              width: 100%;
              height: 200px;
            }

            .text {
              margin: 0 0 40px 0;
            }
          }
        }
      }
    }
  }
}
</style>
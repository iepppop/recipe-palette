<template>
    <div class="sub-banner">
        <div class="content">
            <span>건강한 식재료, 신선한 야채</span>
            <span>다양하게 보고 선택하세요.</span>
        </div>
        <button>
            더 알아보기
        </button>
    </div>
</template>
<style lang="scss">
.sub-banner{
    max-width: 1400px;
    margin:80px auto;
    background-image:url('@/assets/images/minibanner.png');
    background-color:#eef2cf;
    height: 150px;
    border-radius: 15px;
    display: flex;
    justify-content:space-between;
    align-items:center;

    .content{
        margin:0 200px;
        display: flex;
        gap:5px;
        flex-direction: column;
        height: 100%;
        justify-content:center;

        span{
            color:#1e1e1e;
        &:first-child{
            font-size:16px;
            font-weight: 600;
        }

        &:last-child{
            font-size:28px;
            font-weight: 700;
        }
    }
    }

    button{
        background:#fff;
        margin:0 100px;
        padding:12px 18px;
        border-radius:5px;
        font-weight: 700;
    }
}
</style>
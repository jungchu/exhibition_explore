<template>
    <div>
        <div class="restaurant_item">
            <img class="restaurant_image" src="/src/assets/restaurant_1.jpg" alt="restaurant圖片">
            <div class="restaurant_text"> 
                <div class="restaurant_text_1"> 覓巷 </div>
                <div class="restaurant_text_2"> MI XIANG </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import '../assets/main.scss'

</script>
<style lang='scss' scoped>
@import '../assets/main.scss';

.restaurant_item{
    position: relative;
    width: 100%;
    height: 811px;

    .restaurant_image {
        display: block; // 為了移除多餘空白
        width: 100%;
        object-fit: cover;
        filter: brightness(80%);
    }

    .restaurant_text {
        position: absolute;
        bottom: 280px;
        width: 100%;
        font-size: 70px;
        color: white;
        text-align: center;
        animation: restaurant_text 2s;
        animation-timing-function: ease;

        .restaurant_text_1 {
            @include font-zh;
            font-size: 70px;
        }
        .restaurant_text_2 {
            @include font-en;
            font-size: 40px;
        }
    }
}

/* animation */
@keyframes restaurant_text {
    from {
        bottom: 20px;
    }
    to {
        bottom: 280px;
    }
}

</style>

<template>
    <div id="dishes">
        <Title>
            <template v-slot:titleEn> 
                <div class="dish_title_1"> New </div>
            </template>
            <template v-slot:titleZh> 
                <div class="dish_title_2"> 新品上市 </div>
            </template>
        </Title>

        <div>
            <div 
                v-for="(dish, dishIndex) in dish_list"
                :key="'dish_' + dishIndex"
            >
                <div 
                    v-if="dishIndex % 2 === 0"
                    :id="'dish_' + dishIndex"
                    class="dish_item_1"
                >
                    <img class="dish_image" :src="dish.image" :alt="'dish ' + dishIndex" loading='lazy'>
                    <div class="dish_description">
                        <div class="dish_name">{{ dish.name }}</div>
                        <div class="dish_des">{{ dish.description }}</div>
                    </div>
                </div>

                <div 
                    v-else
                    :id="'dish_' + dishIndex"
                    class="dish_item_2"
                >
                    <div class="dish_description">
                        <div class="dish_name">{{ dish.name }}</div>
                        <div class="dish_des">{{ dish.description }}</div>
                    </div>
                    <img class="dish_image" :src="dish.image" :alt="'dish ' + dishIndex" loading='lazy'>
                </div>

            </div>
        </div>
    </div>
</template>
<script setup>
import Title from './title.vue';
import { onMounted, ref } from 'vue';
import { get_dish_ajax } from '../js/utils/data';

onMounted(()=>{
    getDishData();
    scrollEvent();
})

let dish_list = ref([]);

const getDishData = async() => {
    dish_list.value = await get_dish_ajax();
};

const throttle = (fn, delay = 500) => {
    let timer = null;

    // throttle 本身會回傳一個函式，透過 ...args 拿到該函式的引數
    return function () {
        // 如果有計時器，表示還在 delay 的秒數內，不往下執行程式碼
        if (timer) return;

        // 設定計時器，在 delay 秒數之後，將計時器值為改為 null
        // 如果還不到 delay 的秒數，再執行一次的話
        // 因為 timer 的值不為 null，前面就先 return 不會進到這段邏輯
        // 可以達到將一段時間內的操作，集合一次執行
        timer = setTimeout(() => {
            timer = null;
        }, delay);

        // timer 變成 null，才能夠執行函式fn
        // 用 .apply 來呼叫，才能
        fn.apply(this);
    };
};

const showDishAnimation = throttle(() => {
    const scrollY = window.scrollY;
    const dish_0 = document.getElementById('dish_0');
    const dish_1 = document.getElementById('dish_1');
    const dish_2 = document.getElementById('dish_2');

    if (scrollY >= 500) dish_0.classList.add('show_dish_item');
    if (scrollY >= 750) dish_1.classList.add('show_dish_item');
    if (scrollY >= 950) dish_2.classList.add('show_dish_item');

    const isRemoveScrollEvent = 
        dish_0.classList.contains('show_dish_item') &&
        dish_1.classList.contains('show_dish_item') &&
        dish_2.classList.contains('show_dish_item');

    if (isRemoveScrollEvent) window.removeEventListener('scroll', showDishAnimation);
}, 200);


const scrollEvent = () => {
    window.addEventListener('scroll', showDishAnimation);
};

</script>
<style lang='scss' scoped>
@import '../assets/main.scss';

#dishes {
    display: flex; 
    flex-direction: column; 
    justify-content: center; 
    align-items:center; 
    width: 100%;
    background-color: #edede4;
}

.dish_title_1 {
    color: white;
}

.dish_title_2 {
    color: #1c1c1c;
}

.dish_item_1,
.dish_item_2 {
    @include font-zh;
    display: flex;
    justify-content: center;
    margin: 60px 0 80px 0; 

    .dish_image {
        width: 260px;
        height: 260px;
        object-fit: cover;
        border-radius: 50%;
    }

    .dish_description {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 250px;
        margin: 0 25px;

        .dish_name {
            margin-bottom: 10px;
            color: rgb(95, 95, 95);
            font-size: 20px;
            font-weight: 500;
        }
        .dish_des {
            color: rgb(94, 69, 33);
            line-height: 28px;
            text-align: center
        }
    }
}

.dish_item_1 {
    border-radius: 40% 0 0 40%;
    background:linear-gradient(to right, white 40%, #edede4);
    opacity: 0;
}

.dish_item_2 {
    border-radius: 0 40% 40% 0;
    background:linear-gradient(to left, white 40%, #edede4);
    opacity: 0;
}

.dish_item_1.show_dish_item,
.dish_item_2.show_dish_item {
    animation: dish_item 1s ease forwards;
}

/* animation */
@keyframes dish_item {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
</style>
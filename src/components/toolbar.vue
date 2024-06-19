<template>
    <div id="toolbar">
        <div 
            id='logo' 
            @click="goToPage('home')"
        >
            <img id='logo_img' src='../assets/logo_white_noword.png' alt='logo'>
            <div id='logo_text' > 覓&nbsp;巷&nbsp;&nbsp;&nbsp; </div>
        </div>

        <v-spacer/>

        <div
            v-for="btn in btnList" 
            :key="btn + '_btn'"
        >
            <v-btn 
                class="toolbar_btn"
                @click="goToPage(btn)"
            >
                {{ btn }}
            </v-btn>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'

const btnList = ref(['關於覓巷', '美味餐點', '線上訂位', '聯絡我們']);
const goToPage = (btn_name) => {
    const pageMap = {
        'home': '',
        '關於覓巷': 'about',
        '美味餐點': 'menu',
        '線上訂位': 'booking',
    };

    window.open(`http://localhost:5173/${pageMap[btn_name]}`, '_self');
};
</script>
<style lang='scss' scoped>
@import '../assets/main.scss';

#toolbar {
    position: fixed;
    top: 0;
    width: 100%;
    height: 80px;
    padding: 0 10px;
    z-index: 10;

    display: flex;
    align-items: center;
    background-color: black;

    #logo {
        @include font-zh;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        cursor: pointer;

        #logo_img {
            width: 60px;
            margin: 0 10px 0 0;
        }

        #logo_text {
            padding: 5px 0 0 0;
        }
    }

    .toolbar_btn {
        @include font-zh;
        margin: 0 20px 0 0;
        height: 80px;
        background-color: transparent;
        color: white;
        border: none;
        box-shadow: none;
        border-radius: 0;
    }
}
</style>

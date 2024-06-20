<template>
    <div id="menu">
        <Toolbar></Toolbar>

        <img class="menu_background" src="/src/assets/menu_background.jpg" alt="menu background">
        
        <div class="menu_content">
            <div>
                <Title>
                    <template v-slot:titleEn> 
                        <div class="dish_title_1"> Menu </div>
                    </template>
                    <template v-slot:titleZh> 
                        <div class="dish_title_2"> 美味餐點 </div>
                    </template>
                </Title>
            </div>
            <div>
                <img class="menu_img" src="/src/assets/menu.png" alt="menu">
            </div>
        </div>

        <Footer></Footer>
    </div>
</template>

<script setup>
    import Toolbar from './toolbar.vue';
    import Title from './title.vue';
    import Footer from './footer.vue';
</script>

<style lang='scss' scoped>
#menu {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-height: 100vh;
    height: 960px;
    background-color: rgb(36, 36, 36);

    .menu_background {
        display: block; // 為了移除多餘空白
        width: 100%;
        height: 100%;
        opacity: 0.9;
    }

    .menu_content {
        position: absolute;
        top: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 80px 0 0 0;
    }

    .dish_title_1 {
        color: #edede4;
    }

    .dish_title_2 {
        color: #1c1c1c;
    }

    .menu_img{
        width: 800px;
    }

    Footer {
        position: absolute;
        bottom: 0;
    }
}
</style>
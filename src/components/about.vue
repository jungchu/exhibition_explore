<template>
    <div id="about">
        <Toolbar></Toolbar>

        <div id="description">
            <img class="description_img" src="/src/assets/about_description.jpg" alt="about description">
            <div class="description_text">
                覓巷是一家藏身於城市一隅的特色餐廳，為您提供獨特的用餐體驗。<br/>
                我們精心挑選新鮮食材，融合傳統與創新的烹飪手法，每一道菜肴都凝聚了廚師的心血與靈感。<br/>
                來到覓巷，您不僅能享受美食，更能在這裡找到一片遠離喧囂的心靈淨土。<br/>
                無論是家庭聚餐、朋友聚會，還是浪漫約會，<br/>
                我們都致力於為您創造難忘的時光。
            </div>
        </div>

        <div id="pictures">
            <div class="left_col">1</div>
            <div class="right_col">2</div>
        </div>

        <Footer></Footer>
    </div>
</template>
<script setup>
    import Toolbar from './toolbar.vue';
    import Footer from './footer.vue';
</script>
<style lang='scss' scoped>
@import '../assets/main.scss';

#about {
    position: relative;
    width: 100%;
    min-height: 100vh;
    background-color: rgb(36, 36, 36);

    #description {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 700px;
        
        .description_img {
            display: block; // 為了移除多餘空白
            width: 100%;
            height: 100%;
            opacity: 0.7;
            object-fit: cover;
        }

        .description_text {
            @include font-zh;
            position: absolute;
            top: 45%;
            width: 700px;
            color: white;
            text-align: center;
            opacity: 0;

            animation: showDescription 1.5s ease forwards;
        }
    }

    #pictures {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 30px 0 0 0;
    }

    Footer {
        position: absolute;
        bottom: 0;
    }
}

/* animation */
@keyframes showDescription {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
</style>
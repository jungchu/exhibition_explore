<template>
    <div id="home">
        <Toolbar></Toolbar>
        <Restaurant></Restaurant>
        <Dishes></Dishes>
        <Footer></Footer>
    </div>
</template>
<script setup>
    import { onMounted } from 'vue';
    import Toolbar from './toolbar.vue';
    import Dishes from './dishes.vue';
    import Restaurant from './restaurant.vue';
    import Footer from './footer.vue';

    onMounted(() => {
        preLoadImg();
    });
    const preLoadImg = () => {
        const imgNameList = ['menu_background.jpg', 'menu.jpg', 'about_description.jpg'];
        setTimeout(() => {
            imgNameList.forEach(imgName => {
                const image = new Image();
                image.src = `/src/assets/${imgName}`;
            });
        }, 400);
    };
</script>
<style lang='scss' scoped>
#home {
    width: 100%;
    min-height: 100vh;
    background-color: rgb(36, 36, 36);

    Footer {
        position: absolute;
        bottom: 0;
    }
}
</style>

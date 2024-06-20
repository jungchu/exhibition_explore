<template>
    <div id="home">
        <Toolbar></Toolbar>
        <Restaurant></Restaurant>
        <Dishes></Dishes>
    </div>
</template>
<script setup>
    import { onMounted } from 'vue';
    import Toolbar from './toolbar.vue';
    import Dishes from './dishes.vue';
    import Restaurant from './restaurant.vue';

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
<style scoped>
#home {
    background-color: rgb(36, 36, 36);
}
</style>

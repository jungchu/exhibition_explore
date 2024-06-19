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
        setTimeout(() => {
            const restaurant_1 = new Image()
            restaurant_1.src = '/src/assets/restaurant_1.jpg';

            const about_description = new Image()
            about_description.src = '/src/assets/about_description.jpg';

            const restaurant_2 = new Image()
            restaurant_2.src = '/src/assets/restaurant_2.jpg';

        }, 400);
    };
</script>
<style scoped>
#home {
    background-color: rgb(36, 36, 36);
}
</style>

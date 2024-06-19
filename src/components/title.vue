<template>
    <div id="dish_title_1">
        <slot name="titleEn"></slot>

        <div id="dish_title_2">
            <slot name="titleZh"></slot>
        </div>
    </div>
</template>
<script setup>
</script>
<style lang='scss' scoped>
@import '../assets/main.scss';

#dish_title_1 {
    @include font-en;
    position: relative;
    display: inline-block;
    margin: 20px 0;
    width: fit-content;
    font-size: 85px;
    font-weight: 600;

    #dish_title_2 {
        @include font-zh;
        position: absolute;
        font-size: 22px;
        font-weight: 600;
        right: 0;
        bottom: 20px;
    }
}
</style>
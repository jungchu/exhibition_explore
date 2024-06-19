import { createRouter, createWebHistory } from 'vue-router';
import Home from "/src/components/home.vue";
import Menu from "/src/components/menu.vue";
import About from "/src/components/about.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home },
        { path: '/menu', component: Menu },
        { path: '/about', component: About },
    ]
});

export default router
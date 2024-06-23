import { createRouter, createWebHistory } from 'vue-router';
import Home from "/src/components/home.vue";
import About from "/src/components/about.vue";
import Menu from "/src/components/menu.vue";
import Booking from "/src/components/booking.vue";
import Contact from "/src/components/contact.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/', component: Home },
        { path: '/about', component: About },
        { path: '/menu', component: Menu },
        { path: '/booking', component: Booking },
        { path: '/contact', component: Contact },
    ]
});

export default router
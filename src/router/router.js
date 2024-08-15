import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue';
import NotFound from '@/views/NotFound.vue';
import routerPages from '@/views/pages/router-pages.js';

const routes = [
    { name: "home-link",        path: "/",                  component: Home },
    { name: "notfound-link",    path: "/:pathMatch(.*)*",   component: NotFound },
    ...routerPages,
];

const router = createRouter({
    routes: routes,
    history: createWebHistory(),
});

export default router

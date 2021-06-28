import { createRouter, createWebHistory } from "vue-router";
import store from "../store";

const routes = [
    {
        path: '/',
        name: 'views.index',
        component: () => import("../views/Index.vue"),
        meta: {
          requiresAuth: true
        }
    },
    {
        path: '/signin',
        name: 'views.signin',
        component: () => import("../views/Signin.vue")
    },
    {
        path: '/signup',
        name: 'views.signup',
        component: () => import("../views/Signup.vue")
    },
    {
        path: '/chat/:id',
        name: 'views.chat',
        component: () => import("../views/Chat.vue"),
        meta: {
          requiresAuth: true
        }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLoggedIn) {
            next()
            return
        }
        next('/signin')
    } else {
        next()
    }
})

export default router;
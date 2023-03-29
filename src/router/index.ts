import { localCache } from '@/utils/cache';
import { firstMenu } from '@/utils/MenuToRoutes';
import { createRouter, createWebHashHistory } from 'vue-router';
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            redirect: 'login'
        },
        {
            path: '/login',
            component: () => import('@/views/login/Login.vue')
        },
        {
            path: '/main',
            name: 'main',
            component: () => import('@/views/main/Main.vue')
        },
        {
            path: '/:pathMatch(.*)',
            component: () => import('@/views/not-found/NotFound.vue')
        }
    ]
});

// 导航守卫
router.beforeEach((to, from) => {
    const token = localCache.getCache('token');
    if (to.path !== '/login' && !token) {
        return '/login';
    }
    if (to.path === '/main') {
        return firstMenu!.path;
    }
});
export default router;

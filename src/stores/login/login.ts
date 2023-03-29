import { accountLoginRequest, getUserInfoById, getUserMenuByRoleId } from '@/service/login';
import type { IAccount } from '@/types';
import { localCache } from '@/utils/cache';
import { defineStore } from 'pinia';
import router from '@/router';
import { mapMenuToRoutes } from '@/utils/MenuToRoutes';
import { mapMenuListToPermissions } from '@/utils/mapMenu';
import useMainStore from '../main/main';

interface ILoginState {
    token: string;
    userInfo: any;
    userMenus: any[];
    permissions: string[];
}

const useLoginStore = defineStore('login', {
    state: (): ILoginState => ({
        token: '',
        userInfo: {},
        userMenus: [],
        permissions: []
    }),
    actions: {
        async loginAccountAction(account: IAccount) {
            const loginData = await accountLoginRequest(account);
            this.token = loginData.data.token;
            const id = loginData.data.id;
            localCache.setCache('token', this.token);
            // 获取用户的详细信息
            const userInfoResult = await getUserInfoById(id);
            const userInfo = userInfoResult.data;
            this.userInfo = userInfo;
            // 根据角色请求用户的权限(菜单)
            const menuResult = await getUserMenuByRoleId(this.userInfo.role.id);
            const userMenus = menuResult.data;
            this.userMenus = userMenus;
            // 进行本地缓存
            localCache.setCache('userInfo', userInfo);
            localCache.setCache('userMenus', userMenus);
            // 请求所有角色部门的数据
            const mainStore = useMainStore();
            mainStore.fetchEntireDataAction();
            // 获取登录用户的所有权限
            const permissions: string[] = mapMenuListToPermissions(userMenus);
            this.permissions = permissions;
            // 动态添加路由
            const routes = mapMenuToRoutes();
            routes.forEach((route) => router.addRoute('main', route));
            // 进行登录跳转
            router.push('/main');
        },
        getLocalCacheAction() {
            const token = localCache.getCache('token');
            const userInfo = localCache.getCache('userInfo');
            const userMenus = localCache.getCache('userMenus');
            if (token && userInfo && userMenus) {
                this.token = token || '';
                this.userInfo = userInfo || {};
                this.userMenus = userMenus || [];
                const permissions: string[] = mapMenuListToPermissions(userMenus);
                this.permissions = permissions;
                // 添加动态路由
                const routes = mapMenuToRoutes();
                routes.forEach((route) => router.addRoute('main', route));
                // 请求所有角色部门的数据
                const mainStore = useMainStore();
                mainStore.fetchEntireDataAction();
            }
        }
    }
});
export default useLoginStore;

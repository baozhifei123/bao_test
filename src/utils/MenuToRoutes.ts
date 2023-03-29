import routes from '@/router/routes';
import type { RouteRecordRaw } from 'vue-router';
import { localCache } from './cache';
const userMenus = localCache.getCache('userMenus');
let firstMenu: RouteRecordRaw | null;
// 获取菜单树中所有菜单
function getAllMenu() {
    const allMenu: any[] = [];
    const next = (userMenus: any) => {
        userMenus.forEach((menu: any) => {
            if (menu.children && menu.children.length > 0) {
                allMenu.push(menu);
                next(menu.children);
            } else {
                allMenu.push(menu);
            }
        });
    };
    next(userMenus);
    return allMenu;
}
// 根据菜单树，获取动态路由
export function mapMenuToRoutes() {
    const addRoute: RouteRecordRaw[] = [];
    const allMenu = getAllMenu();
    allMenu.forEach((element: any) => {
        const route = routes.find((route) => route.path === element.url);
        if (route) {
            addRoute.push(route);
        }
    });
    firstMenu = addRoute[0];
    return addRoute;
}
// 获取当前的路由
export function getCurrentMenu(currentPath: string) {
    const allMenu = getAllMenu();
    return allMenu.find((menu) => menu.url === currentPath);
}
// 获取当前路由的面包屑导航
export function getCurrentCrumb(currentPath: string) {
    const currentCrumb: any[] = [];
    userMenus.forEach((menu: any) => {
        menu.children.forEach((subMenu: any) => {
            if (subMenu.url === currentPath) {
                currentCrumb.push(menu);
                currentCrumb.push(subMenu);
            }
        });
    });
    return currentCrumb;
}
// 当前菜单的第一个
export { firstMenu };

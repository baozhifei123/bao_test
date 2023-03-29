// 获取根据菜单数组获取菜单id数组
export function mapMenuListToIds(menuList: any[]) {
    const ids: number[] = [];
    function next(menuList: any[]) {
        menuList.forEach((item) => {
            if (item.children && item.children.length > 0) {
                next(item.children);
            } else {
                ids.push(item.id);
            }
        });
    }
    next(menuList);
    return ids;
}
// 根据菜单获取按钮权限
export function mapMenuListToPermissions(menuList: any[]) {
    const permissions: string[] = [];
    function next(menus: any[]) {
        menus.forEach((item) => {
            if (item.type === 3) {
                permissions.push(item.permission);
            }
            if (item.children && item.children.length > 0) {
                next(item.children);
            }
        });
    }
    next(menuList);
    return permissions;
}

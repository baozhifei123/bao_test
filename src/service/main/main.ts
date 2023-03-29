import request from '../index';
export function getEntireRoles() {
    return request.post({
        url: '/role/list'
    });
}
export function getEntireDepartment() {
    return request.post({
        url: '/department/list'
    });
}
export function getEntireMenus() {
    return request.post({
        url: '/menu/list'
    });
}

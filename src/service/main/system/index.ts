import request from '../../index';
export function postUserListRequest(data: any) {
    return request.post({
        url: '/users/list',
        data
    });
}
export function deleteUserById(id: number) {
    return request.delete({
        url: `/users/${id}`
    });
}
export function createUserData(userData: any) {
    return request.post({
        url: `/users`,
        data: userData
    });
}
export function editUserData(id: number, userData: any) {
    return request.patch({
        url: `/users/${id}`,
        data: userData
    });
}

export function postPageListData(pageName: string, data: any) {
    return request.post({
        url: `/${pageName}/list`,
        data
    });
}
export function deletePageById(pageName: string, id: number) {
    return request.delete({
        url: `/${pageName}/${id}`
    });
}

export function createPageData(pageName: string, userData: any) {
    return request.post({
        url: `/${pageName}`,
        data: userData
    });
}

export function editPageData(pageName: string, id: number, userData: any) {
    return request.patch({
        url: `/${pageName}/${id}`,
        data: userData
    });
}

import type { IAccount } from '@/types';
import request from '../index';

export function accountLoginRequest(account: IAccount) {
    return request.post({
        url: '/login',
        data: account
    });
}

export function getUserInfoById(id: number) {
    return request.get({
        url: `/users/${id}`
    });
}

export function getUserMenuByRoleId(roleId: number) {
    return request.get({
        url: `/role/${roleId}/menu`
    });
}

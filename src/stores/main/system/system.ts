import { defineStore } from 'pinia';
import {
    postUserListRequest,
    deleteUserById,
    createUserData,
    editUserData,
    postPageListData,
    deletePageById,
    editPageData,
    createPageData
} from '@/service/main/system/index.js';
import useMainStore from '@/stores/main/main';
export interface ISystemState {
    userList: any[];
    usersTotalCount: number;
    pageList: any[];
    pageTotalCount: number;
}
const useSystemStore = defineStore('system', {
    state: (): ISystemState => ({
        userList: [],
        usersTotalCount: 0,
        pageList: [],
        pageTotalCount: 0
    }),
    actions: {
        async postUserListAction(data: any) {
            const userListResult = await postUserListRequest(data);
            const { totalCount, list } = userListResult.data;
            this.usersTotalCount = totalCount;
            this.userList = list;
        },
        async deleteUserByIdAction(id: number) {
            await deleteUserById(id);
            this.postUserListAction({ offset: 0, size: 10 });
        },
        async createUserDataAction(userData: any) {
            const createUserResult = await createUserData(userData);
            this.postUserListAction({ offset: 0, size: 10 });
            return createUserResult;
        },
        async editUserDataAction(id: number, userData: any) {
            const editUserResult = await editUserData(id, userData);
            this.postUserListAction({ offset: 0, size: 10 });
            return editUserResult;
        },
        async postPageListAction(pageName: string, data: any) {
            const pageListResult = await postPageListData(pageName, data);
            const { totalCount, list } = pageListResult.data;
            this.pageTotalCount = totalCount;
            this.pageList = list;
        },
        async deletePageListAction(pageName: string, id: number) {
            await deletePageById(pageName, id);
            this.postPageListAction(pageName, { offset: 0, size: 10 });
        },
        async createPageDataAction(pageName: string, userData: any) {
            const createPageResult = await createPageData(pageName, userData);
            this.postPageListAction(pageName, { offset: 0, size: 10 });
            // 每个页面创建的时候都重新刷新部门和角色
            const mainStore = useMainStore();
            mainStore.fetchEntireDataAction();
            return createPageResult;
        },
        async editPageDataAction(pageName: string, id: number, userData: any) {
            const editPageResult = await editPageData(pageName, id, userData);
            this.postPageListAction(pageName, { offset: 0, size: 10 });
            // 每个页面修改的时候都重新刷新部门和角色
            const mainStore = useMainStore();
            mainStore.fetchEntireDataAction();
            return editPageResult;
        }
    }
});
export default useSystemStore;

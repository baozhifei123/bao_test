import { getEntireDepartment, getEntireMenus, getEntireRoles } from '@/service/main/main';
import { defineStore } from 'pinia';

interface IMainState {
    entireRoles: any[];
    entireDepartment: any[];
    entireMenu: any[];
}

const useMainStore = defineStore('main', {
    state: (): IMainState => ({
        entireRoles: [],
        entireDepartment: [],
        entireMenu: []
    }),
    actions: {
        async fetchEntireDataAction() {
            const rolesResult = await getEntireRoles();
            const departmentResult = await getEntireDepartment();
            const menus = await getEntireMenus();
            this.entireRoles = rolesResult.data.list;
            this.entireDepartment = departmentResult.data.list;
            this.entireMenu = menus.data.list;
        }
    }
});
export default useMainStore;

import useLoginStore from '@/stores/login/login';

function usePermission(permissionId: string) {
    const loginStore = useLoginStore();
    return !!loginStore.permissions.find((item) => item.includes(permissionId));
}
export default usePermission;

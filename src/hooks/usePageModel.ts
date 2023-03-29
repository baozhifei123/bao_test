import { ref } from 'vue';
export default function usePageContent(reviewCallback: any) {
    const modelRef = ref();
    const handleEditBtnClick = (userData: any) => {
        modelRef.value?.setDialogFormVisible(false, userData);
        reviewCallback(userData.menuList);
    };
    const handleNewBtnClick = () => {
        modelRef.value?.setDialogFormVisible();
        reviewCallback([]);
    };
    return {
        modelRef,
        handleEditBtnClick,
        handleNewBtnClick
    };
}

import { ref } from 'vue';
export default function usePageSearch() {
    const contentRef = ref();

    const handleSearchClick = (searchData: any) => {
        contentRef.value?.fetchPageListFetch(searchData);
    };
    const handleResetClick = () => {
        contentRef.value?.fetchPageListFetch();
    };
    return {
        contentRef,
        handleResetClick,
        handleSearchClick
    };
}

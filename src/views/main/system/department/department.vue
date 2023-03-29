<template>
    <div class="department">
        <page-search
            @search-click="handleSearchClick"
            @reset-click="handleResetClick"
        ></page-search>
        <page-content
            ref="contentRef"
            @handleEditBtnClick="handleEditBtnClick"
            @handleNewBtnClick="handleNewBtnClick"
        ></page-content>
        <page-model ref="modelRef"></page-model>
    </div>
</template>

<script setup lang="ts">
import pageSearch from './c-cpns/page-search.vue';
import pageContent from './c-cpns/page-content.vue';
import pageModel from './c-cpns/page-model.vue';
import { ref } from 'vue';
const contentRef = ref<InstanceType<typeof pageContent>>();
const modelRef = ref<InstanceType<typeof pageModel>>();
const handleSearchClick = (searchData: any) => {
    contentRef.value?.fetchPageListFetch(searchData);
};
const handleResetClick = () => {
    contentRef.value?.fetchPageListFetch();
};
const handleEditBtnClick = (userData: any) => {
    modelRef.value?.setDialogFormVisible(false, userData);
};
const handleNewBtnClick = () => {
    modelRef.value?.setDialogFormVisible();
};
</script>

<style lang="less" scoped></style>

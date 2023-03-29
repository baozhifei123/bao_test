<template>
    <div class="user">
        <user-search @searchClick="handleSearchClick" @resetClick="handleResetClick"></user-search>
        <user-content
            ref="userContentRef"
            @handleEditBtnClick="handleEditBtnClick"
            @handleNewBtnClick="handleNewBtnClick"
        ></user-content>
        <user-model ref="modelRef"></user-model>
    </div>
</template>

<script setup lang="ts">
import userSearch from './c-cpns/user-search.vue';
import userContent from './c-cpns/user-content.vue';
import userModel from './c-cpns/user-model.vue';
import { ref } from 'vue';
const userContentRef = ref<InstanceType<typeof userContent>>();
const modelRef = ref<InstanceType<typeof userModel>>();

const handleSearchClick = (searchFrom: any) => {
    userContentRef.value?.listFetch(searchFrom);
};
const handleResetClick = () => {
    userContentRef.value?.listFetch();
};
const handleNewBtnClick = () => {
    modelRef.value?.setDialogFormVisible();
};
const handleEditBtnClick = (userData: any) => {
    modelRef.value?.setDialogFormVisible(false, userData);
};
</script>

<style lang="less" scoped></style>

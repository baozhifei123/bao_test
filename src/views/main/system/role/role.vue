<template>
    <div class="role">
        <page-search
            @search-click="handleSearchClick"
            @reset-click="handleResetClick"
            :search-config="roleSearchConfig"
        ></page-search>
        <page-content
            ref="contentRef"
            @handleEditBtnClick="handleEditBtnClick"
            @handleNewBtnClick="handleNewBtnClick"
            :content-config="roleContentConfig"
        ></page-content>
        <page-model ref="modelRef" :otherInfo="otherInfo" :modal-config="modalConfig">
            <template #menulist>
                <el-tree
                    ref="treeRef"
                    :data="mainStore.entireMenu"
                    show-checkbox
                    node-key="id"
                    :props="{ children: 'children', label: 'name' }"
                    @check="handleElTreeCheck"
                />
            </template>
        </page-model>
    </div>
</template>

<script setup lang="ts">
import pageSearch from '@/components/page-search.vue';
import pageContent from '@/components/page-content.vue';
import pageModel from '@/components/page-model.vue';
import usePageContent from '@/hooks/usePageModel';
import usePageSearch from '@/hooks/usePageSearch';
import { ref, nextTick } from 'vue';
import useMainStore from '@/stores/main/main';
import { mapMenuListToIds } from '@/utils/mapMenu';
const mainStore = useMainStore();
const treeRef = ref();
const roleSearchConfig = {
    pageName: 'role',
    formItems: [
        {
            type: 'input',
            prop: 'name',
            placeholder: '请输入查询的角色名称',
            label: '角色名称'
        },
        {
            type: 'input',
            prop: 'intro',
            placeholder: '请输入查询的权限介绍',
            label: '权限介绍'
        },
        {
            type: 'date-picker',
            prop: 'createAt',
            label: '创建时间'
        }
    ]
};

const roleContentConfig = {
    pageName: 'role',
    header: {
        title: '角色列表',
        btnTitle: '新建角色'
    },
    propsList: [
        { type: 'selection', label: '选择', width: '80px' },
        { type: 'index', label: '序号', width: '80px' },
        { type: 'normal', prop: 'name', label: '角色名称', width: '180px' },
        { type: 'normal', prop: 'intro', label: '角色权限', width: '180px' },
        { type: 'time', prop: 'createAt', label: '创建时间' },
        { type: 'time', prop: 'updateAt', label: '更新时间' },
        { type: 'handler', label: '操作', width: '180px' }
    ]
};

const modalConfig = {
    pageName: 'role',
    header: {
        newTitle: '新建角色'
    },
    formItems: [
        {
            type: 'input',
            label: '角色名称',
            prop: 'name',
            placeholder: '请输入角色名称'
        },
        {
            type: 'input',
            label: '权限介绍',
            prop: 'intro',
            placeholder: '请输入权限介绍'
        },
        {
            type: 'custom',
            slotName: 'menulist'
        }
    ]
};
const otherInfo = ref({});
const editTreeReviewCallback = (menuList: any[]) => {
    nextTick(() => {
        treeRef.value.setCheckedKeys(mapMenuListToIds(menuList), true);
    });
};
const { modelRef, handleEditBtnClick, handleNewBtnClick } = usePageContent(editTreeReviewCallback);
const { contentRef, handleResetClick, handleSearchClick } = usePageSearch();
const handleElTreeCheck = (check: any, allCheck: any) => {
    otherInfo.value = { menuList: [...allCheck.checkedKeys, ...allCheck.halfCheckedKeys] };
};
</script>

<style lang="less" scoped>
.role {
    color: red;
}
</style>

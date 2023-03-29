<template>
    <div class="menu">
        <page-content :content-config="menuPageContent"></page-content>
    </div>
</template>

<script setup lang="ts">
import pageContent from '@/components/page-content.vue';
const menuPageContent = {
    pageName: 'menu',
    header: {
        title: '菜单列表',
        btnTitle: '新建菜单'
    },
    propsList: [
        { type: 'normal', label: '菜单名称', prop: 'name', width: '180px' },
        { type: 'normal', label: '级别', prop: 'type', width: '120px' },
        { type: 'normal', label: '菜单url', prop: 'url', width: '150px' },
        { type: 'normal', label: '菜单icon', prop: 'icon', width: '150px' },
        { type: 'normal', label: '排序', prop: 'sort', width: '120px' },
        { type: 'normal', label: '权限', prop: 'permission', width: '150px' },
        { type: 'time', label: '创建时间', prop: 'createAt' },
        { type: 'time', label: '修改时间', prop: 'updateAt' },
        { type: 'handler', label: '操作', width: '160px' }
    ],
    childrenTree: {
        rowKey: 'id',
        treeProps: {
            children: 'children'
        }
    }
};
</script>

<style lang="less" scoped>
.menu {
    color: red;
}
</style>

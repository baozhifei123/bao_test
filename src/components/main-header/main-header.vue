<template>
    <div class="nav-header">
        <div class="menu-icon" @click="handleMenuIconClick">
            <el-icon size="28">
                <component :is="isFold ? 'fold' : 'expand'"></component>
            </el-icon>
        </div>
        <div class="content">
            <header-crumb></header-crumb>
            <header-info></header-info>
        </div>
    </div>
</template>

<script setup lang="ts">
import headerInfo from './c-cpns/header-info.vue';
import headerCrumb from './c-cpns/header-crumb.vue';
const emit = defineEmits(['foldChange']);
defineProps({
    isFold: {
        type: Boolean,
        default: false
    }
});
const handleMenuIconClick = () => {
    emit('foldChange');
};
</script>

<style lang="less" scoped>
.nav-header {
    display: flex;
    align-items: center;
    flex: 1;
    height: 100%;

    .menu-icon {
        display: flex;
        align-items: center;
        cursor: pointer;
    }
    .content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex: 1;
        padding: 0 18px;
    }
}
</style>

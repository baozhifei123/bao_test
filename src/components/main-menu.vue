<template>
    <div class="main-menu">
        <div class="logo">
            <img class="img" src="@/assets/image/logo.svg" alt="" />
            <h2 v-show="!isFold" class="title">武暴管理系统</h2>
        </div>
        <el-menu :collapse="isFold" :default-active="defaultActive">
            <el-sub-menu v-for="item in loginStore.userMenus" :key="item.id" :index="item.id + ''">
                <template #title>
                    <!-- 字符串: el-icon-monitor => 组件 -->
                    <el-icon>
                        <component :is="item.icon.split('-icon-')[1]"></component>
                    </el-icon>
                    <span>{{ item.name }}</span>
                </template>
                <el-menu-item
                    :index="menuItem.id + ''"
                    v-for="(menuItem, itemIndex) in item.children"
                    :key="itemIndex"
                    @click="handleItemClick(menuItem)"
                >
                    {{ menuItem.name }}
                </el-menu-item>
            </el-sub-menu>
        </el-menu>
    </div>
</template>

<script setup lang="ts">
import useLoginStore from '@/stores/login/login';
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getCurrentMenu } from '@/utils/MenuToRoutes';
defineProps({
    isFold: {
        type: Boolean,
        default: false
    }
});
const router = useRouter();
const route = useRoute();
const loginStore = useLoginStore();
// 根据url动态修改菜单默认激活菜单
const defaultActive = computed(() => {
    const currentMenu = getCurrentMenu(route.path);
    return currentMenu.id + '';
});
const handleItemClick = (item: any) => {
    const url = item.url;
    router.push(url);
};
</script>

<style lang="less" scoped>
.main-menu {
    height: 100%;
    background-color: #001527;
}
.logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    overflow: hidden;
    .img {
        height: 100%;
        margin: 0 10px;
    }
    .title {
        font-size: 16px;
        font-weight: 700;
        color: white;
        white-space: nowrap;
    }
}
.el-menu {
    border-right: none;
    // user-select: none;
    --el-menu-bg-color: #001529;
    --el-menu-text-color: #b7bdc3;
    --el-menu-active-color: #fff;
}

.el-sub-menu {
    .el-menu-item {
        padding-left: 50px !important;
        background-color: #0c2135;
    }
    .el-menu-item:hover {
        color: #fff;
    }
    .el-menu-item.is-active {
        background-color: #0a60bd;
    }
}
</style>

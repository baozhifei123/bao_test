<template>
    <div class="main">
        <el-container class="main-content">
            <el-aside :width="isFold ? '60px' : '200px'">
                <main-menu :isFold="isFold"></main-menu>
            </el-aside>
            <el-container>
                <el-header height="50px">
                    <main-header :isFold="isFold" @foldChange="foldChange"></main-header>
                </el-header>
                <el-main> <router-view></router-view> </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import mainMenu from '@/components/main-menu.vue';
import mainHeader from '@/components/main-header/main-header.vue';
const isFold = ref(false);
const foldChange = () => {
    isFold.value = !isFold.value;
};
</script>

<style lang="less" scoped>
.main {
    height: 100vh;
    .main-content {
        height: 100vh;

        .el-aside {
            overflow-x: hidden;
            overflow-y: auto;
            line-height: 200px;
            text-align: left;
            cursor: pointer;
            background-color: #001529;
            transition: width 0.3s linear;
            scrollbar-width: none;
            -ms-overflow-style: none;
            &::-webkit-scrollbar {
                display: none;
            }
        }
    }
}
</style>

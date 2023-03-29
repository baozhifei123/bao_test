<script setup lang="ts">
import zhCn from 'element-plus/dist/locale//zh-cn.mjs';
import { ref, onUpdated, nextTick } from 'vue';
const locale = zhCn;
</script>

<template>
    <div class="app">
        <el-config-provider :locale="locale">
            <router-view></router-view>
        </el-config-provider>
    </div>
</template>

<style scoped>
.app {
    width: 100vw;
    height: 100vh;
}
</style>

<template>
    <div class="header-crumb">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="item.url" :key="item.id" v-for="item in breadcrumb">{{
                item.name
            }}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script setup lang="ts">
import { getCurrentCrumb } from '@/utils/MenuToRoutes';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const breadcrumb = computed(() => {
    return getCurrentCrumb(route.path);
});
</script>

<style lang="less" scoped>
.header-crumb {
    color: red;
}
</style>

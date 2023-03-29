<template>
    <div class="login-panel">
        <h1 class="title">后台管理系统</h1>
        <div>
            <el-tabs stretch type="border-card" v-model="currentTab">
                <el-tab-pane name="user">
                    <template #label>
                        <span class="label">
                            <el-icon><UserFilled /></el-icon>
                            <span class="text">账号登陆</span>
                        </span>
                    </template>
                    <panel-account ref="accountRef"></panel-account>
                </el-tab-pane>
                <el-tab-pane name="iphone">
                    <template #label>
                        <div class="label">
                            <el-icon><Iphone /></el-icon>
                            <span class="text">手机登录</span>
                        </div>
                    </template>
                    <panel-phone></panel-phone>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="control-account">
            <el-checkbox v-model="isKeepPwd" label="记住密码" size="large" />
            <el-link type="primary">忘记密码</el-link>
        </div>
        <el-button type="primary" size="large" class="login-btn" @click="handleLoginAction"
            >立即登录</el-button
        >
    </div>
</template>

<script setup lang="ts">
import PanelAccount from './panel-account.vue';
import PanelPhone from './panel-phone.vue';
import { ref, watch } from 'vue';
import { localCache } from '@/utils/cache';

const isKeepPwd = ref(localCache.getCache('isKeepPwd') ?? '');
watch(isKeepPwd, (newValue) => {
    localCache.setCache('isKeepPwd', newValue);
});
const accountRef = ref<InstanceType<typeof PanelAccount>>();
const currentTab = ref('user');
const handleLoginAction = () => {
    accountRef.value?.loginAction(isKeepPwd.value);
};
</script>

<style lang="less" scoped>
.login-panel {
    width: 330px;
    margin-bottom: 150px;

    .title {
        text-align: center;
        margin-bottom: 15px;
    }

    .label {
        display: flex;
        align-items: center;
        justify-content: center;

        .text {
            margin-left: 5px;
        }
    }

    .control-account {
        margin-top: 12px;
        display: flex;

        justify-content: space-between;
    }

    .login-btn {
        margin-top: 10px;
        width: 100%;
    }
}
</style>

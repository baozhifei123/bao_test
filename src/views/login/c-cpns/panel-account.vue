<template>
    <div class="panel-account">
        <el-form size="large" :rules="formRules" ref="formRef" :model="account">
            <el-form-item label="账号" label-width="60" prop="name">
                <el-input v-model="account.name" />
            </el-form-item>
            <el-form-item label="密码" label-width="60" prop="password">
                <el-input v-model="account.password" type="password" />
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import type { FormRules, FormInstance } from 'element-plus';
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';
import type { IAccount } from '@/types';

import useLoginStore from '@/stores/login/login';
import { localCache } from '@/utils/cache';

const loginStore = useLoginStore();

const formRef = ref<FormInstance>();

const account = reactive<IAccount>({
    name: localCache.getCache('name') ?? '',
    password: localCache.getCache('password') ?? ''
});
const formRules = reactive<FormRules>({
    name: [
        { required: true, message: '必须输入账号信息', trigger: 'blur' },
        { min: 6, max: 20, message: '必须是6-18数字或者字母的组成', trigger: 'change' }
    ],
    password: [
        { required: true, message: '必须输入密码信息', trigger: 'blur' },
        { pattern: /^[a-z0-9]{6,18}$/, message: '必须是6-18数字或者字母的组成', trigger: 'change' }
    ]
});
function loginAction(isKeepPwd: boolean) {
    if (formRef.value) {
        formRef.value.validate((valid) => {
            if (valid) {
                loginStore
                    .loginAccountAction({
                        name: account.name,
                        password: account.password
                    })
                    .then(() => {
                        if (isKeepPwd) {
                            localCache.setCache('name', account.name);
                            localCache.setCache('password', account.password);
                        } else {
                            localCache.removeCache('name');
                            localCache.removeCache('password');
                        }
                    });
            } else {
                ElMessage.error('Oops, 请输入正确的格式.');
            }
        });
    }
}
defineExpose({
    loginAction
});
</script>

<style lang="less" scoped></style>

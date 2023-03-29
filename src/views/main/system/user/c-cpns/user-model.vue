<template>
    <div class="model">
        <el-dialog
            :title="isCreateRef ? '新建用户' : '编辑用户'"
            center
            v-model="dialogFormVisible"
        >
            <div class="form">
                <el-form ref="fromRef" label-width="80px" size="large">
                    <el-form-item label="用户名" prop="name">
                        <el-input placeholder="请输入用户名" v-model="formData.name" />
                    </el-form-item>
                    <el-form-item label="真实姓名" prop="realname">
                        <el-input placeholder="请输入真实姓名" v-model="formData.realname" />
                    </el-form-item>
                    <el-form-item v-if="isCreateRef" label="密码" prop="password">
                        <el-input placeholder="请输入密码" v-model="formData.password" />
                    </el-form-item>
                    <el-form-item label="电话号码" prop="name">
                        <el-input placeholder="请输入电话号码" v-model="formData.cellPhone" />
                    </el-form-item>
                    <el-form-item label="选择角色" prop="roleId">
                        <el-select v-model="formData.roleId" style="width: 100%">
                            <el-option
                                v-for="item in mainStore.entireRoles"
                                :key="item.id"
                                :value="item.id"
                                :label="item.name"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="选择部门" prop="departmentId">
                        <el-select v-model="formData.departmentId" style="width: 100%">
                            <el-option
                                v-for="item in mainStore.entireDepartment"
                                :key="item.id"
                                :value="item.id"
                                :label="item.name"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="handleConfirmClick"> 确 定 </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import type { ElForm, FormRules } from 'element-plus';
import { ref, reactive } from 'vue';
import useMainStore from '@/stores/main/main';
import useSystemStore from '@/stores/main/system/system';
const dialogFormVisible = ref(false);
const isCreateRef = ref(true);
const editId = ref();
const fromRef = ref<InstanceType<typeof ElForm>>();
const mainStore = useMainStore();
const SystemStore = useSystemStore();
let formData = reactive<any>({
    name: '',
    realname: '',
    password: '',
    cellPhone: '',
    roleId: '',
    departmentId: ''
});
const setDialogFormVisible = (isCreate: boolean = true, userData?: any) => {
    dialogFormVisible.value = true;
    isCreateRef.value = isCreate;
    if (!isCreate && userData) {
        for (const key in formData) {
            formData[key] = userData[key];
            editId.value = userData.id;
        }
    } else {
        for (const key in formData) {
            formData[key] = '';
        }
    }
};
const handleConfirmClick = () => {
    if (isCreateRef.value) {
        SystemStore.createUserDataAction(formData);
        fromRef.value?.resetFields();
    } else {
        SystemStore.editUserDataAction(editId.value, formData);
    }

    dialogFormVisible.value = false;
};
defineExpose({ setDialogFormVisible });
</script>

<style lang="less" scoped>
.form {
    padding: 0 20px;
}
</style>

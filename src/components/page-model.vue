<template>
    <div class="model">
        <el-dialog
            :title="isCreateRef ? modalConfig.header?.newTitle : modalConfig.header?.editTitle"
            center
            v-model="dialogFormVisible"
        >
            <div class="form">
                <el-form ref="fromRef" label-width="80px" size="large">
                    <template v-for="item in modalConfig.formItems" :key="item.prop">
                        <el-form-item :prop="item.prop" :label="item.label">
                            <template v-if="item.type === 'input'">
                                <el-input
                                    v-model="formData[item.prop]"
                                    :placeholder="item.placeholder"
                                />
                            </template>
                            <template v-else-if="item.type === 'date-picker'">
                                <el-date-picker
                                    v-model="formData[item.prop]"
                                    type="daterange"
                                    range-separator="-"
                                    start-placeholder="开始时间"
                                    end-placeholder="结束时间"
                                />
                            </template>
                            <template v-else-if="item.type === 'select'">
                                <el-select
                                    v-model="formData[item.prop]"
                                    :placeholder="item.placeholder"
                                    style="width: 100%"
                                >
                                    <el-option
                                        v-for="option in item.options"
                                        :key="option.value"
                                        :value="option.value"
                                        :label="option.label"
                                    ></el-option>
                                </el-select>
                            </template>
                            <template v-else-if="item.type === 'custom'">
                                <slot :name="item.slotName"></slot>
                            </template>
                        </el-form-item>
                    </template>
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
import useSystemStore from '@/stores/main/system/system';

interface IProps {
    modalConfig: {
        pageName: string;
        header?: {
            newTitle?: string;
            editTitle?: string;
        };
        formItems: any[];
    };
    otherInfo?: any;
}

const props = defineProps<IProps>();
const initForm: any = {};
props.modalConfig.formItems.forEach((item) => {
    if (item.prop) {
        initForm[item.prop] = item.initialValue ?? '';
    }
});
let formData = reactive<any>(initForm);
const dialogFormVisible = ref(false);
const isCreateRef = ref(true);
const editId = ref();
const fromRef = ref<InstanceType<typeof ElForm>>();
const SystemStore = useSystemStore();
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
    let infoData = { ...formData };
    if (props.otherInfo) infoData = { ...infoData, ...props.otherInfo };
    if (isCreateRef.value) {
        SystemStore.createPageDataAction(props.modalConfig.pageName, infoData);
        fromRef.value?.resetFields();
    } else {
        SystemStore.editPageDataAction(props.modalConfig.pageName, editId.value, infoData);
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

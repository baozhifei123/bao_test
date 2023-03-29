<template>
    <div class="user-search" v-if="isQuery">
        <el-form ref="formRef" size="large" :model="searchFrom" label-width="80px">
            <el-row>
                <template v-for="(item, index) in searchConfig.formItems" :key="index">
                    <el-col :span="8">
                        <el-form-item :prop="item.prop" :label="item.label">
                            <template v-if="item.type === 'input'">
                                <el-input
                                    v-model="searchFrom[item.prop]"
                                    :placeholder="item.placeholder"
                                />
                            </template>
                            <template v-else-if="item.type === 'date-picker'">
                                <el-date-picker
                                    v-model="searchFrom[item.prop]"
                                    type="daterange"
                                    range-separator="-"
                                    start-placeholder="开始时间"
                                    end-placeholder="结束时间"
                                />
                            </template>
                            <template v-else-if="item.type === 'select'">
                                <el-select
                                    v-model="searchFrom[item.prop]"
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
                        </el-form-item>
                    </el-col>
                </template>
            </el-row>
        </el-form>
        <div class="btns">
            <el-button icon="Refresh" @click="handleReset">重置</el-button>
            <el-button icon="Search" @click="handleSearch" type="primary">查询</el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ElForm } from 'element-plus';
import { reactive, ref } from 'vue';
import usePermission from '@/hooks/usePermission';

// 接口声明
interface IProps {
    searchConfig: {
        pageName: string;
        formItems: any[];
    };
}

const emit = defineEmits(['searchClick', 'resetClick']);
const props = defineProps<IProps>();
const isQuery = usePermission(`${props.searchConfig.pageName}:query`);
const initForm: any = {};
props.searchConfig.formItems.forEach((item) => {
    initForm[item.prop] = item.initialValue ?? '';
});
const searchFrom = reactive(initForm);

const formRef = ref<InstanceType<typeof ElForm>>();

const handleReset = () => {
    formRef.value?.resetFields();
    emit('resetClick');
};
const handleSearch = () => {
    emit('searchClick', searchFrom);
};
</script>

<style lang="less" scoped>
.user-search {
    background-color: #fff;
    padding: 20px;

    .el-form-item {
        padding: 20px;
        margin-bottom: 0;
    }
    .btns {
        text-align: right;
        padding: 0 50px 10px 0;
    }
}
</style>

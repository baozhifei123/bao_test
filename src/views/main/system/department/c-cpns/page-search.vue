<template>
    <div class="user-search">
        <el-form ref="formRef" size="large" :model="searchFrom" label-width="80px">
            <el-row>
                <el-col :span="8">
                    <el-form-item prop="name" label="部门名称">
                        <el-input v-model="searchFrom.name" />
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item prop="leader" label="部门领导">
                        <el-input v-model="searchFrom.leader" />
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item prop="createAt" label="创建时间">
                        <el-date-picker
                            v-model="searchFrom.createAt"
                            type="daterange"
                            range-separator="-"
                            start-placeholder="开始时间"
                            end-placeholder="结束时间"
                        />
                    </el-form-item>
                </el-col>
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
const emit = defineEmits(['searchClick', 'resetClick']);
const searchFrom = reactive({
    name: '',
    leader: '',
    createAt: ''
});

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

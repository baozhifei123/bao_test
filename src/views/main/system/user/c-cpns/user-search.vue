<template>
    <div class="user-search">
        <el-form ref="formRef" size="large" :model="searchFrom" label-width="80px">
            <el-row>
                <el-col :span="8">
                    <el-form-item prop="name" label="用户名">
                        <el-input v-model="searchFrom.name" />
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item prop="realname" label="真实姓名">
                        <el-input v-model="searchFrom.realname" />
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item prop="cellphone" label="电话号码">
                        <el-input v-model="searchFrom.cellphone" />
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="状态" prop="enable">
                        <el-select
                            v-model="searchFrom.enable"
                            placeholder="Select"
                            style="width: 100%"
                        >
                        </el-select>
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
    realname: '',
    cellphone: '',
    enable: '',
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

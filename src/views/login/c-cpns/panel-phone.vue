<template>
    <div class="panel-phone">
        <el-form size="large" ref="formRef">
            <el-form-item label="手机号" label-width="60">
                <el-input />
            </el-form-item>
            <el-form-item label="验证码" label-width="60">
                <div class="verify-code">
                    <el-input />
                    <el-button class="get-btn" type="primary">获取验证码</el-button>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.verify-code {
    display: flex;

    .get-btn {
        margin-left: 8px;
    }
}
</style>

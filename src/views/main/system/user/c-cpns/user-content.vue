<template>
    <div class="content">
        <div class="header">
            <h3 class="title">用户列表</h3>
            <el-button @click="handleCreateUserClick">新增用户</el-button>
        </div>
        <div class="table">
            <el-table :data="userList" :border="true" style="width: 100%">
                <el-table-column align="center" type="selection" width="55" />
                <el-table-column align="center" label="序号" type="index" width="60" />、
                <el-table-column align="center" label="用户名" prop="name" />
                <el-table-column align="center" label="真实姓名" prop="realname" />
                <el-table-column align="center" label="电话号码" prop="cellphone" />
                <el-table-column align="center" label="状态" prop="enable">
                    <template #default="scope">
                        <el-button
                            size="small"
                            :type="scope.row.enable ? 'primary' : 'danger'"
                            plain
                            >{{ scope.row.enable ? '启用' : '禁用' }}</el-button
                        >
                    </template>
                </el-table-column>
                <el-table-column align="center" label="创建时间" prop="createAt">
                    <template #default="scope">
                        {{ formatUTC(scope.row.createAt) }}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="更新时间" prop="updateAt">
                    <template #default="scope">
                        {{ formatUTC(scope.row.updateAt) }}
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="160px">
                    <template #default="scope">
                        <el-button
                            @click="handleEditClick(scope.row)"
                            size="small"
                            icon="Edit"
                            type="primary"
                            text
                            >编辑</el-button
                        >
                        <el-button
                            @click="handleDeleteClick(scope.row.id)"
                            size="small"
                            icon="Delete"
                            type="danger"
                            text
                        >
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pagination">
            <el-pagination
                v-model:current-page="currentPage"
                v-model:page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="usersTotalCount"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import useSystemStore from '@/stores/main/system/system.js';
import { toRefs, ref, watch } from 'vue';
import { formatUTC } from '@/utils/format';
const emit = defineEmits(['handleNewBtnClick', 'handleEditBtnClick']);
const systemStore = useSystemStore();
systemStore.postUserListAction({ offset: 0, size: 10 });
const currentPage = ref(1);
const pageSize = ref(10);
const { userList, usersTotalCount } = toRefs(systemStore);
// 修改页面size
const handleSizeChange = () => {
    listFetch();
};
// 翻页
const handleCurrentChange = () => {
    listFetch();
};
// 删除功能
const handleDeleteClick = (id: number) => {
    // 删除数据
    systemStore.deleteUserByIdAction(id);
    // 重新发送请求
    listFetch();
};
// 新建功能
const handleCreateUserClick = () => {
    emit('handleNewBtnClick');
};
// 修改功能
const handleEditClick = (userData: any) => {
    emit('handleEditBtnClick', userData);
};
const listFetch = (searchFrom: any = {}) => {
    const size = pageSize.value;
    const offset = (currentPage.value - 1) * size;
    const info = { size, offset, ...searchFrom };
    systemStore.postUserListAction(info);
};
defineExpose({
    listFetch
});
</script>

<style lang="less" scoped>
.content {
    padding: 20px;
    margin-top: 20px;
    background-color: #fff;
    .header {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-bottom: 10px;
        .title {
            font-size: 22px;
        }
    }
    .table {
        .el-table_cell {
            padding: 12px 0;
        }
        .el-button {
            margin-left: 0;
            padding: 5px 8px;
        }
    }
    .pagination {
        display: flex;
        justify-content: flex-end;
        margin-top: 10px;
    }
}
</style>

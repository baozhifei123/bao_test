<template>
    <div class="content">
        <div class="header">
            <h3 class="title">{{ contentConfig.header?.title ?? '数据列表' }}</h3>
            <el-button v-if="isCreate" @click="handleCreateUserClick">{{
                contentConfig.header?.btnTitle ?? '新增数据'
            }}</el-button>
        </div>
        <div class="table">
            <el-table
                :data="pageList"
                :border="true"
                style="width: 100%"
                v-bind="contentConfig.childrenTree"
            >
                <template v-for="item in contentConfig.propsList" :key="item.prop">
                    <template v-if="item.type === 'time'">
                        <el-table-column
                            align="center"
                            :width="item.width"
                            :label="item.label"
                            :prop="item.prop"
                        >
                            <template #default="scope">
                                {{ formatUTC(scope.row[item.prop]) }}
                            </template>
                        </el-table-column>
                    </template>
                    <template v-else-if="item.type === 'handler'">
                        <el-table-column :label="item.label" align="center" :width="item.width">
                            <template #default="scope">
                                <el-button
                                    v-if="isUpdate"
                                    @click="handleEditClick(scope.row)"
                                    size="small"
                                    icon="Edit"
                                    type="primary"
                                    text
                                    >编辑</el-button
                                >
                                <el-button
                                    v-if="isDelete"
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
                    </template>
                    <template v-else-if="item.type === 'custom'">
                        <!-- 通过作用域插槽，自定义内容 -->
                        <el-table-column label="操作" align="center" :width="item.width">
                            <!-- 这是控件elTable的插槽 -->
                            <template #default="scope">
                                <!-- 这是自定义插槽 —— 这是调用本组件传进来的插槽 -->
                                <slot :name="item.slotName" v-bind="scope"></slot>
                            </template>
                        </el-table-column>
                    </template>
                    <template v-else>
                        <el-table-column
                            align="center"
                            :prop="item.prop"
                            :label="item.label"
                            :width="item.width"
                        />
                    </template>
                </template>
            </el-table>
        </div>
        <div class="pagination">
            <el-pagination
                v-model:current-page="currentPage"
                v-model:page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pageTotalCount"
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
import usePermission from '@/hooks/usePermission';

interface IProps {
    contentConfig: {
        header?: {
            title?: string;
            btnTitle?: string;
        };
        propsList: any[];
        pageName: string;
        childrenTree?: any;
    };
}
const props = defineProps<IProps>();
const emit = defineEmits(['handleNewBtnClick', 'handleEditBtnClick']);
const isCreate = usePermission(`${props.contentConfig.pageName}:create`);
const isUpdate = usePermission(`${props.contentConfig.pageName}:update`);
const isDelete = usePermission(`${props.contentConfig.pageName}:delete`);
const isQuery = usePermission(`${props.contentConfig.pageName}:query`);
const currentPage = ref(1);
const pageSize = ref(10);
const systemStore = useSystemStore();
const unsubscribe = systemStore.$onAction(({ name, after }) => {
    after(() => {
        if (
            name === 'createPageDataAction' ||
            name === 'deletePageListAction' ||
            name === 'editPageDataAction'
        ) {
            currentPage.value = 1;
        }
    });
});
systemStore.postPageListAction(props.contentConfig.pageName, { offset: 0, size: 10 });

const { pageList, pageTotalCount } = toRefs(systemStore);
// 修改页面size
const handleSizeChange = () => {
    fetchPageListFetch();
};
// 翻页
const handleCurrentChange = () => {
    fetchPageListFetch();
};
// 删除功能
const handleDeleteClick = (id: number) => {
    // 删除数据
    systemStore.deletePageListAction(props.contentConfig.pageName, id);
    // 重新发送请求
    fetchPageListFetch();
};
// 新建功能
const handleCreateUserClick = () => {
    emit('handleNewBtnClick');
};
// 修改功能
const handleEditClick = (userData: any) => {
    emit('handleEditBtnClick', userData);
};
const fetchPageListFetch = (searchFrom: any = {}) => {
    const size = pageSize.value;
    const offset = (currentPage.value - 1) * size;
    const info = { size, offset, ...searchFrom };
    systemStore.postPageListAction(props.contentConfig.pageName, info);
};
defineExpose({
    fetchPageListFetch
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

<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { PlusOutlined, ReloadOutlined, SearchOutlined } from '@ant-design/icons-vue';

/**
 * antD 组件示例页（模板页）。
 *
 * 组员写业务页面时直接照这一页的结构抄：
 *   a-form 查询区 + a-table 列表 + a-pagination 分页 + a-modal 表单弹窗。
 * 目前数据是本地 mock，等后端接口就绪后，把 loadTaskList / handleSave 内部换成 api 调用即可。
 */

// 任务状态字典（真实项目里由后端字典接口下发）
const STATUS_OPTIONS = [
  { label: '待开始', value: 'todo' },
  { label: '进行中', value: 'doing' },
  { label: '已完成', value: 'done' },
];

// 状态值与标签文案、颜色的映射
const STATUS_MAP = {
  todo: { text: '待开始', color: 'default' },
  doing: { text: '进行中', color: 'processing' },
  done: { text: '已完成', color: 'success' },
};

// 模拟数据源：真实项目里由后端任务列表接口返回
const mockTaskList = [
  { taskNo: 'XS-1001', taskTitle: '统一全组开发环境与版本基线', ownerName: 'taffy', statusCode: 'done', deadlineDate: '2026-09-20' },
  { taskNo: 'XS-1002', taskTitle: '搭建前后端骨架并跑通端到端链路', ownerName: 'taffy', statusCode: 'done', deadlineDate: '2026-09-20' },
  { taskNo: 'XS-1003', taskTitle: '整理编码规范 v2.8 并宣贯到组员', ownerName: 'dev-a', statusCode: 'doing', deadlineDate: '2026-09-23' },
  { taskNo: 'XS-1004', taskTitle: '数据库表结构设计评审', ownerName: 'dev-b', statusCode: 'doing', deadlineDate: '2026-09-24' },
  { taskNo: 'XS-1005', taskTitle: '登录与权限模块开发', ownerName: 'dev-a', statusCode: 'todo', deadlineDate: '2026-09-28' },
  { taskNo: 'XS-1006', taskTitle: '迭代一燃尽图与每日站会记录', ownerName: 'dev-c', statusCode: 'doing', deadlineDate: '2026-09-25' },
  { taskNo: 'XS-1007', taskTitle: '编写接口文档（springdoc-openapi）', ownerName: 'dev-b', statusCode: 'todo', deadlineDate: '2026-09-30' },
  { taskNo: 'XS-1008', taskTitle: '迭代一演示与回顾会议材料', ownerName: 'dev-c', statusCode: 'todo', deadlineDate: '2026-10-08' },
];

// 查询表单默认值
const queryFormState = {
  keywords: '', // 任务编号 / 任务标题
  statusCode: undefined, // 任务状态
  pageNum: 1,
  pageSize: 5,
};

// 查询表单（响应式）
const queryForm = reactive({ ...queryFormState });

// 表格列定义
const columnsRef = ref([
  { title: '任务编号', dataIndex: 'taskNo', key: 'taskNo', width: 110 },
  { title: '任务标题', dataIndex: 'taskTitle', key: 'taskTitle' },
  { title: '负责人', dataIndex: 'ownerName', key: 'ownerName', width: 100 },
  { title: '状态', dataIndex: 'statusCode', key: 'statusCode', width: 100 },
  { title: '截止日期', dataIndex: 'deadlineDate', key: 'deadlineDate', width: 120 },
  { title: '操作', key: 'action', width: 90 },
]);

// 表格当前页数据
const tableDataRef = ref([]);
// 查询结果总条数
const totalRef = ref(0);
// 列表查询中标记
const loadingRef = ref(false);

// 表单弹窗显示标记
const modalVisibleRef = ref(false);
// 当前正在编辑的任务编号，为空表示「新增」
const editingTaskNoRef = ref('');

// 表单弹窗标题
const modalTitleRef = computed(() => (editingTaskNoRef.value ? '编辑任务' : '新增任务'));

// 表格分页配置
const paginationRef = computed(() => ({
  current: queryForm.pageNum,
  pageSize: queryForm.pageSize,
  total: totalRef.value,
  showSizeChanger: true,
  pageSizeOptions: ['5', '10', '20'],
  showTotal: (total) => `共 ${total} 条`,
}));

// 表单弹窗的字段默认值
const saveFormState = {
  taskNo: '', // 任务编号
  taskTitle: '', // 任务标题
  ownerName: '', // 负责人
  statusCode: 'todo', // 任务状态
  deadlineDate: null, // 截止日期
};

// 表单弹窗（响应式）
const saveForm = reactive({ ...saveFormState });

/**
 * 查询任务列表。
 *
 * 这里模拟「后端分页」：先按条件过滤，再只取当前页返回。
 * 接后端时把函数体换成 listTaskApi(queryForm) 即可。
 */
function loadTaskList() {
  loadingRef.value = true;
  const keywords = queryForm.keywords.trim().toLowerCase();
  const filteredList = mockTaskList.filter((item) => {
    const hitKeywords =
      !keywords ||
      item.taskTitle.toLowerCase().includes(keywords) ||
      item.taskNo.toLowerCase().includes(keywords);
    const hitStatusCode = !queryForm.statusCode || item.statusCode === queryForm.statusCode;
    return hitKeywords && hitStatusCode;
  });
  totalRef.value = filteredList.length;
  const startIndex = (queryForm.pageNum - 1) * queryForm.pageSize;
  tableDataRef.value = filteredList.slice(startIndex, startIndex + queryForm.pageSize);
  loadingRef.value = false;
}

// 查询按钮：条件变化后要回到第 1 页
function handleSearch() {
  queryForm.pageNum = 1;
  loadTaskList();
}

// 重置按钮：恢复默认查询条件并重查
function handleReset() {
  Object.assign(queryForm, queryFormState);
  loadTaskList();
}

// 表格分页变化：同步分页参数后重查
function handleTableChange(pagination) {
  queryForm.pageNum = pagination.current;
  queryForm.pageSize = pagination.pageSize;
  loadTaskList();
}

// 打开「新增」弹窗
function handleCreate() {
  editingTaskNoRef.value = '';
  Object.assign(saveForm, saveFormState);
  modalVisibleRef.value = true;
}

// 打开「编辑」弹窗，把当前行数据回填到表单
function handleEdit(record) {
  editingTaskNoRef.value = record.taskNo;
  Object.assign(saveForm, record);
  modalVisibleRef.value = true;
}

// 保存表单：本地 mock 写法，接后端时换成 saveTaskApi(saveForm)
function handleSave() {
  if (!saveForm.taskTitle) {
    return;
  }
  if (editingTaskNoRef.value) {
    const index = mockTaskList.findIndex((item) => item.taskNo === editingTaskNoRef.value);
    if (index > -1) {
      mockTaskList[index] = { ...mockTaskList[index], ...saveForm };
    }
  } else {
    const nextNo = `XS-${1000 + mockTaskList.length + 1}`;
    mockTaskList.unshift({ ...saveForm, taskNo: nextNo });
  }
  modalVisibleRef.value = false;
  loadTaskList();
}

onMounted(loadTaskList);
</script>

<template>
  <a-card title="antD 组件示例 · 敏捷任务列表" :bordered="false">
    <template #extra>
      <a-button type="primary" @click="handleCreate">
        <template #icon><PlusOutlined /></template>
        新增任务
      </a-button>
    </template>

    <a-form layout="inline" class="query-form">
      <a-form-item label="关键词">
        <a-input
          v-model:value="queryForm.keywords"
          placeholder="任务编号 / 任务标题"
          allow-clear
          style="width: 220px"
        />
      </a-form-item>

      <a-form-item label="状态">
        <a-select
          v-model:value="queryForm.statusCode"
          :options="STATUS_OPTIONS"
          placeholder="全部"
          allow-clear
          style="width: 140px"
        />
      </a-form-item>

      <a-form-item>
        <a-space>
          <a-button type="primary" @click="handleSearch">
            <template #icon><SearchOutlined /></template>
            查询
          </a-button>
          <a-button @click="handleReset">
            <template #icon><ReloadOutlined /></template>
            重置
          </a-button>
        </a-space>
      </a-form-item>
    </a-form>

    <a-table
      :columns="columnsRef"
      :data-source="tableDataRef"
      :loading="loadingRef"
      :pagination="paginationRef"
      row-key="taskNo"
      size="middle"
      @change="handleTableChange"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'statusCode'">
          <a-tag :color="STATUS_MAP[record.statusCode].color">
            {{ STATUS_MAP[record.statusCode].text }}
          </a-tag>
        </template>
        <template v-else-if="column.key === 'action'">
          <a-button type="link" size="small" @click="handleEdit(record)">编辑</a-button>
        </template>
      </template>
    </a-table>

    <a-modal
      v-model:open="modalVisibleRef"
      :title="modalTitleRef"
      ok-text="保存"
      cancel-text="取消"
      @ok="handleSave"
    >
      <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }" class="save-form">
        <a-form-item label="任务标题" required>
          <a-input v-model:value="saveForm.taskTitle" placeholder="请输入任务标题" />
        </a-form-item>
        <a-form-item label="负责人">
          <a-input v-model:value="saveForm.ownerName" placeholder="请输入负责人" />
        </a-form-item>
        <a-form-item label="状态">
          <a-select v-model:value="saveForm.statusCode" :options="STATUS_OPTIONS" />
        </a-form-item>
        <a-form-item label="截止日期">
          <a-date-picker
            v-model:value="saveForm.deadlineDate"
            value-format="YYYY-MM-DD"
            placeholder="请选择日期"
            style="width: 100%"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </a-card>
</template>

<style scoped>
.query-form {
  margin-bottom: 16px;
  row-gap: 12px;
}

.save-form {
  margin-top: 20px;
}
</style>

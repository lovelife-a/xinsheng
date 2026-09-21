<script setup>
import { ref, onMounted } from 'vue';
import { ReloadOutlined } from '@ant-design/icons-vue';
import { getHealthApi } from '@/api/system/health.js';

// 环境自检返回结果：{ status, project, javaVersion, redis }
const healthInfoRef = ref(null);
// 后端连接失败时的错误信息
const errorMsgRef = ref('');
// 请求进行中标记
const loadingRef = ref(false);

/**
 * 环境自检：请求后端 /api/health，验证「前端 → 后端 → Redis」整条链路。
 */
async function loadHealth() {
  loadingRef.value = true;
  errorMsgRef.value = '';
  healthInfoRef.value = null;
  try {
    healthInfoRef.value = await getHealthApi();
  } catch (e) {
    errorMsgRef.value = e.message || String(e);
  } finally {
    loadingRef.value = false;
  }
}

onMounted(loadHealth);
</script>

<template>
  <a-card title="环境自检" :bordered="false" class="health-card">
    <template #extra>
      <a-button type="primary" :loading="loadingRef" @click="loadHealth">
        <template #icon><ReloadOutlined /></template>
        重新检测
      </a-button>
    </template>

    <p class="health-tip">
      本页用来验证「前端 5173 → 后端 8080 → Redis」整条链路是否打通。
    </p>

    <a-spin :spinning="loadingRef" tip="检测中…">
      <a-alert
        v-if="errorMsgRef"
        type="error"
        show-icon
        :message="`后端没连上：${errorMsgRef}`"
        description="请确认后端已启动 —— 在 backend 目录执行 mvn spring-boot:run，端口 8080。"
      />

      <a-descriptions v-else-if="healthInfoRef" bordered :column="1" size="small">
        <a-descriptions-item
          v-for="[label, value] in Object.entries(healthInfoRef)"
          :key="label"
          :label="label"
        >
          {{ value }}
        </a-descriptions-item>
      </a-descriptions>

      <a-empty v-else-if="!loadingRef" description="暂无数据，点右上角「重新检测」" />
    </a-spin>
  </a-card>
</template>

<style scoped>
.health-card {
  max-width: 720px;
}

.health-tip {
  margin: 0 0 16px;
  color: #64748b;
  font-size: 13px;
  line-height: 1.7;
}
</style>

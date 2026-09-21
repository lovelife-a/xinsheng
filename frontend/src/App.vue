<script setup>
import { computed } from 'vue';
import { RouterView, useRoute, useRouter } from 'vue-router';
import zhCN from 'ant-design-vue/es/locale/zh_CN';

const route = useRoute();
const router = useRouter();

// 顶部导航当前选中项：跟随路由自动变化
const selectedKeysRef = computed(() => [String(route.name)]);

// 顶部导航点击：跳转到对应路由
function handleMenuClick({ key }) {
  router.push({ name: key });
}
</script>

<template>
  <!-- ConfigProvider 统一中文化：分页、日期选择、空数据等内置文案都会变中文 -->
  <a-config-provider :locale="zhCN">
    <a-layout class="app-layout">
      <a-layout-header class="app-header">
        <div class="app-logo">新升 · 敏捷项目管理</div>
        <a-menu
          :selected-keys="selectedKeysRef"
          mode="horizontal"
          class="app-menu"
          @click="handleMenuClick"
        >
          <a-menu-item key="home">环境自检</a-menu-item>
          <a-menu-item key="antd-demo">antD 示例</a-menu-item>
        </a-menu>
      </a-layout-header>

      <a-layout-content class="app-content">
        <RouterView />
      </a-layout-content>
    </a-layout>
  </a-config-provider>
</template>

<style>
* {
  box-sizing: border-box;
}
html,
body {
  margin: 0;
  font-family: -apple-system, 'Segoe UI', 'Microsoft YaHei', sans-serif;
  background: #f5f7fa;
}
</style>

<style scoped>
.app-layout {
  min-height: 100vh;
}

/* antD 的 header 默认是深色底，这里按项目配色改成白底 */
.app-header {
  display: flex;
  align-items: center;
  gap: 32px;
  height: 60px;
  padding: 0 32px;
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
}

.app-logo {
  font-size: 17px;
  font-weight: 600;
  color: #1677ff;
  white-space: nowrap;
}

.app-menu {
  flex: 1;
  border-bottom: none;
}

.app-content {
  padding: 24px 32px;
}
</style>

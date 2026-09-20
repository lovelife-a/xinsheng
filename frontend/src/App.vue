<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app">
    <header class="header">
      <h1>新升 · 敏捷项目管理</h1>
      <nav>
        <RouterLink to="/">首页</RouterLink>
      </nav>
    </header>
    <main class="main">
      <RouterView />
    </main>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  font-family: -apple-system, 'Segoe UI', 'Microsoft YaHei', sans-serif;
  background: #f5f7fa;
  color: #1f2937;
}
.header {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 16px 32px;
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
}
.header h1 {
  margin: 0;
  font-size: 18px;
  color: #2563eb;
}
.header nav a {
  color: #475569;
  text-decoration: none;
}
.header nav a.router-link-active {
  color: #2563eb;
  font-weight: 600;
}
.main {
  padding: 32px;
}
</style>

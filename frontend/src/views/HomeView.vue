<script setup>
import { ref, onMounted } from 'vue'
import request from '@/api/request'

const info = ref(null)
const error = ref('')
const loading = ref(false)

async function check() {
  loading.value = true
  error.value = ''
  info.value = null
  try {
    info.value = await request.get('/health')
  } catch (e) {
    error.value = e.message || String(e)
  } finally {
    loading.value = false
  }
}

onMounted(check)
</script>

<template>
  <div class="card">
    <h2>环境自检</h2>
    <p class="tip">
      这一页用来验证「前端 5173 → 后端 8080 → Redis」整条链路是否打通。
    </p>

    <p v-if="loading" class="loading">检测中…</p>

    <div v-else-if="error" class="err">
      <p>后端没连上：{{ error }}</p>
      <p class="tip">
        请确认后端已启动 —— 在 <code>backend</code> 目录执行
        <code>mvn spring-boot:run</code>，端口 8080。
      </p>
    </div>

    <table v-else-if="info">
      <tbody>
        <tr v-for="(v, k) in info" :key="k">
          <th>{{ k }}</th>
          <td>{{ v }}</td>
        </tr>
      </tbody>
    </table>

    <button @click="check">重新检测</button>
  </div>
</template>

<style scoped>
.card {
  max-width: 720px;
  background: #fff;
  border-radius: 10px;
  padding: 24px 28px;
  box-shadow: 0 1px 4px rgba(15, 23, 42, 0.08);
}
h2 {
  margin: 0 0 8px;
  font-size: 17px;
}
.tip {
  color: #64748b;
  font-size: 13px;
  line-height: 1.7;
}
.loading {
  color: #2563eb;
}
.err {
  color: #b91c1c;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  padding: 12px 16px;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0;
}
th,
td {
  text-align: left;
  padding: 8px 12px;
  border-bottom: 1px solid #f1f5f9;
  font-size: 14px;
}
th {
  width: 130px;
  color: #64748b;
  font-weight: 600;
}
button {
  padding: 8px 20px;
  border: none;
  border-radius: 6px;
  background: #2563eb;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
}
button:hover {
  background: #1d4ed8;
}
code {
  background: #f1f5f9;
  padding: 1px 5px;
  border-radius: 4px;
  font-size: 12.5px;
}
</style>

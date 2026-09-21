import request from '@/api/request'

/**
 * 环境自检接口。
 *
 * 对应后端 HealthController：GET /api/health
 * 命名规范（编码规范 v2.8 §1.8）：导入解构的方法统一以 Api 后缀结尾，与本地方法区分。
 *
 * @returns {Promise<Object>} { status, project, javaVersion, redis }
 */
export function getHealthApi() {
  return request.get('/health')
}

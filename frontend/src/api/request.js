import axios from 'axios';

/**
 * 统一请求封装。
 *
 * baseURL 用 '/api'，由 vite.config.js 里的 proxy 转发到 http://localhost:8080
 * 这样开发时不用处理跨域，打包上线时也只需要改一处配置。
 */
const request = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

request.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const msg =
      error.response?.data?.message ||
      error.response?.statusText ||
      error.message ||
      '请求失败';
    console.error('[request]', error.config?.url, msg);
    return Promise.reject(new Error(msg));
  }
);

export default request;

import { createRouter, createWebHistory } from 'vue-router';
import homeView from '@/views/home-view.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: homeView,
    },
    {
      // antD 组件示例页，作为组员写业务页面的模板
      path: '/antd-demo',
      name: 'antd-demo',
      component: () => import('@/views/antd-demo-view.vue'),
    },
    {
      // 兜底：未匹配到的地址统一回首页
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
});

export default router;

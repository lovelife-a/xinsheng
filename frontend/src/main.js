import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);

/**
 * Ant Design Vue 全量注册。
 *
 * 注册后模板里可以直接写 <a-button> / <a-table> / <a-modal> 等组件，不需要逐个 import。
 * 课设阶段优先保证「组员写起来不出错」；将来要压体积再换按需引入
 * （unplugin-vue-components + AntDesignVueResolver），组件写法完全不用改。
 */
app.use(Antd);

app.mount('#app');

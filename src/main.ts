import { createApp } from 'vue';
import App from './App.vue';
import 'normalize.css';
import './assets/css/index.less';
import router from './router';
import pinia from './stores';
import registerIcons from './global/register-icons';
import 'element-plus/theme-chalk/el-message.css'; // 引入element-plus中反馈组件的css。例如el-message
import useLoginStore from './stores/login/login';
const app = createApp(App);
app.use(pinia);
// 动态路由的持久化，防止刷新
const loginStore = useLoginStore();
loginStore.getLocalCacheAction();
// 注册全局图标
app.use(registerIcons);
app.use(router);

app.mount('#app');

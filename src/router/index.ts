import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/home/index.vue';

// 同步引入所有模块化路由文件
const modules = import.meta.globEager('../views/**/router/index.ts');
const tempRoute: RouteRecordRaw[] = [];
Object.keys(modules).forEach((key) => {
  tempRoute.push(...modules[key].default);
});

// 动态引入模块，每个模块会在构建时分离为独立的chunk
// const module = import.meta.glob('../views/**/*.js');
// Object.keys(module).forEach((key) => {
//   module[key]().then(mod => {
//     console.log(mod.default);
//   })
// })

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '首页'
    }
  },
  ...tempRoute
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

import { RouteRecordRaw } from 'vue-router';

const route: RouteRecordRaw = {
  path: '/antmodal-example',
  name: 'antmodalexample',
  component: () => import('../index.vue'),
  meta: {
    title: '对话框'
  }
};

export default [route];
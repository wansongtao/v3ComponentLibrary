import { RouteRecordRaw } from 'vue-router';

const route: RouteRecordRaw = {
  path: '/select-example',
  name: 'selectxample',
  component: () => import('../index.vue'),
  meta: {
    title: '选择器'
  }
};

export default [route];
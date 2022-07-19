import { RouteRecordRaw } from 'vue-router';

const route: RouteRecordRaw = {
  path: '/pag-example',
  name: 'pagexample',
  component: () => import('../index.vue'),
  meta: {
    title: '分页器'
  }
};

export default [route];
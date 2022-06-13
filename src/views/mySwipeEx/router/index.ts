import { RouteRecordRaw } from 'vue-router';

const route: RouteRecordRaw = {
  path: '/myswipeex',
  name: 'mySwipeEx',
  component: () => import('../index.vue'),
  meta: {
    title: '自定义轮播组件示例'
  }
};

export default [route];
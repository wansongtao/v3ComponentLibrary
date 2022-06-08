import { RouteRecordRaw } from 'vue-router';

const route: RouteRecordRaw = {
  path: '/domtoimg',
  name: 'domToImg',
  component: () => import('../index.vue'),
  meta: {
    title: '元素转图片示例'
  }
};

export default [route];

import { RouteRecordRaw } from "vue-router";

const route: RouteRecordRaw = {
  path: '/fileselectexam',
  name: 'FileSelectExample',
  component: () => import('../index.vue'),
  meta: {
    title: '文件选择器组件示例'
  }
};

export default [route];
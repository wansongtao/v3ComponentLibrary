import { RouteRecordRaw } from 'vue-router';

const route: RouteRecordRaw = {
  path: '/datepicker-example',
  name: 'datepickerexample',
  component: () => import('../index.vue'),
  meta: {
    title: '日期选择器'
  }
};

export default [route];
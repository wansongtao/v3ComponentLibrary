import router from '@/router/index';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({showSpinner: false});

router.beforeEach((to) => {
  NProgress.start();

  if (to.meta?.title) {
    document.title = to.meta.title as string;
  }
});

router.afterEach(() => {
  NProgress.done();
});

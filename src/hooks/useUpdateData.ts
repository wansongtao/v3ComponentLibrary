import { onActivated, onDeactivated, ref } from 'vue';

/**
 * 在onActivated生命周期定时执行方法，onDeactivated生命周期移除定时器(进入页面也会刷新数据)
 * 页面隐藏时，不执行定时方法
 * @param fn 需要定时执行的函数
 * @param isInitial 在onActivated生命周期是否先执行一遍方法，默认是
 * @param time 间隔时间，单位秒，默认10秒刷新
 */
const useUpdateData = (
  fn: Function,
  isInitial: boolean = true,
  time: number = 10
) => {
  const timer = ref<NodeJS.Timer>();

  /**
   * 设置定时器，定时执行方法
   */
  const setTimer = () => {
    if (timer.value) {
      return;
    }

    timer.value = setInterval(() => {
      fn();
    }, time * 1000);
  };

  /**
   * 移除定时器
   */
  const removeTimer = () => {
    timer.value && clearInterval(timer.value);

    timer.value = undefined;
  };

  const pageStateChange = () => {
    const state = document.visibilityState;
    const methods = {
      visible() {
        setTimer();
      },
      hidden() {
        removeTimer();
      }
    };

    methods[state]();
  };

  onActivated(() => {
    if (isInitial) {
      fn();
    }

    setTimer();
    document.addEventListener('visibilitychange', pageStateChange);
  });

  onDeactivated(() => {
    removeTimer();

    document.removeEventListener('visibilitychange', pageStateChange);
  });

  return {
    setTimer,
    removeTimer
  };
};

export default useUpdateData;

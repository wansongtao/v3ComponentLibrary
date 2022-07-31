import { onActivated, onDeactivated, ref } from 'vue';

/**
 * 定期执行方法：在onActivated生命周期定时执行方法，onDeactivated生命周期移除定时器(进入页面也会刷新数据)。
 * 页面隐藏时，移除定时器。页面显示后，再添加定时器。
 * @param fn 需要定时执行的函数
 * @param isInitial 在onActivated生命周期是否先执行一遍方法，默认是
 * @param duration 间隔时间，单位秒，默认10秒刷新
 */
const useRegularUpdate = (
  fn: Function,
  isInitial: boolean = true,
  duration: number = 10
) => {
  const timer = ref<NodeJS.Timer | null>(null);

  /**
   * 添加定时器，定时执行方法
   */
  const addTimer = () => {
    if (timer.value) {
      return;
    }

    timer.value = setInterval(() => {
      fn();
    }, duration * 1000);
  };

  /**
   * 移除定时器
   */
  const removeTimer = () => {
    timer.value && clearInterval(timer.value);
    timer.value = null;
  };

  /**
   * 在页面状态改变时，添加/移除定时器
   */
  const pageStateChange = () => {
    const methods = {
      visible: () => {
        addTimer();
      },
      hidden: () => {
        removeTimer();
      }
    };

    const state = document.visibilityState;
    methods[state]();
  };

  onActivated(() => {
    if (isInitial) {
      fn();
    }

    addTimer();
    document.addEventListener('visibilitychange', pageStateChange);
  });

  onDeactivated(() => {
    removeTimer();

    document.removeEventListener('visibilitychange', pageStateChange);
  });

  return {
    addTimer,
    removeTimer
  };
};

export default useRegularUpdate;

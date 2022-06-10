/**
 * @description 获取传入数据的类型，小写字符串
 * @param obj
 * @returns
 */
export const getDataType = (obj: any): string => {
  let res = Object.prototype.toString.call(obj).split(' ')[1];
  res = res.substring(0, res.length - 1).toLowerCase();
  return res;
};

/**
 * @description 复制内容到剪贴板（document.execCommand已废弃，推荐使用库）
 * @param {string} text 要复制的文本
 */
export const clipboard = (text: string) => {
  const el = document.createElement('textarea');
  el.value = text;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);

  // 检查之前是否曾选中过内容如果找到，则保存选中没有标记为false
  const selection = document.getSelection();
  const selected =
    selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : false;

  el.select();
  // 复制 - 仅当作为用户操作的响应结果时才可以工作(比如，点击事件)
  document.execCommand('copy');
  document.body.removeChild(el);

  // 如果在复制前已存在选中的内容
  if (selected) {
    // 取消 HTML 文档中所有的选中部分，恢复原来的选中
    const lastSelect = document.getSelection() as Selection;
    lastSelect.removeAllRanges();
    lastSelect.addRange(selected);
  }
};

/**
 * @description 获取相应的时间格式字符串
 * @param {Date} [date] Date对象，默认当前时间
 * @param {String} [format] 输出格式字符串，默认：yyyy/MM/dd HH:mm:ss。yy: 输出两位数的年份，
 * h：输出12小时制，H：输出24小时制，M：月份，m：分钟，一位字母则不补零
 * @returns {String}
 */
export const formatTime = (
  date: Date = new Date(),
  format: string = 'yyyy/MM/dd HH:mm:ss'
): string => {
  if (!format) {
    return format;
  }

  const formatObj = {
    yy: () => {
      return date.getFullYear().toString().substring(2, 4);
    },
    yyyy: () => {
      return date.getFullYear().toString();
    },
    M: () => {
      const month = date.getMonth() + 1;
      return month.toString();
    },
    MM: () => {
      const month = date.getMonth() + 1;
      return month.toString().padStart(2, '0');
    },
    d: () => {
      return date.getDate().toString();
    },
    dd: () => {
      return date.getDate().toString().padStart(2, '0');
    },
    h: () => {
      let hours = date.getHours();
      if (hours > 12) {
        hours -= 12;
      }

      return hours.toString();
    },
    hh: () => {
      let hours = date.getHours();
      if (hours > 12) {
        hours -= 12;
      }

      return hours.toString().padStart(2, '0');
    },
    H: () => {
      return date.getHours().toString();
    },
    HH: () => {
      return date.getHours().toString().padStart(2, '0');
    },
    m: () => {
      return date.getMinutes().toString();
    },
    mm: () => {
      return date.getMinutes().toString().padStart(2, '0');
    },
    s: () => {
      return date.getSeconds().toString();
    },
    ss: () => {
      return date.getSeconds().toString().padStart(2, '0');
    }
  };

  type key =
    | 'yy'
    | 'yyyy'
    | 'MM'
    | 'M'
    | 'd'
    | 'dd'
    | 'h'
    | 'hh'
    | 'H'
    | 'HH'
    | 'm'
    | 'mm'
    | 's'
    | 'ss';
  const replaceFunc = (val: string): string => {
    let func = formatObj[val as key];
    if (func instanceof Function) {
      return func();
    }

    func = formatObj[val.toLowerCase() as key];
    if (func instanceof Function) {
      return func();
    }

    // 没有匹配的方法，返回原字符串
    return val;
  };

  return format.replace(
    /([Yy]{2,4}|[M]+|[Dd]+|[Hh]+|[m]+|[Ss]+)/g,
    replaceFunc
  );
};

/**
 * @description 函数式编程实现，从左往右执行，函数返回值会传给下一个执行的函数
 * @param funcs
 * @returns
 */
export const compose = (...funcs: Function[]) => {
  if (funcs.length <= 1) {
    return (arg: any) => arg;
  }

  return funcs.reduce((a, b) => {
    return (...args: any[]) => {
      return b(a(...args));
    };
  });
};

/**
 * @description 节流函数，触发一次后，下次触发需要间隔一定的时间
 * @param fn 需要执行的函数
 * @param delay 间隔时间，默认1s，单位ms
 * @returns
 */
export const throttle = (fn: Function, delay: number = 1000) => {
  if (delay < 0) {
    delay = Math.abs(delay);
  }

  // 浮点数取整
  if (~~delay !== delay) {
    delay = delay | 0;
  }

  let lastTime = 0;
  return function <T>(this: any, ...args: T[]) {
    const nowTime = Date.now();

    if (nowTime - lastTime < delay) {
      return;
    }

    lastTime = nowTime;
    fn.apply(this, args);
  };
};

/**
 * @description 防抖函数，一定时间内多次触发，只执行最后触发的一次，可能永远不会执行
 * @param fn 需要防抖的函数
 * @param delay 间隔时间，默认200ms，单位ms
 * @param immediate 第一次是否立即执行，默认false
 * @returns
 */
export const debounce = (
  fn: Function,
  delay: number = 200,
  immediate: boolean = false
) => {
  if (delay < 0) {
    delay = Math.abs(delay);
  }

  // 浮点数取整
  if (~~delay !== delay) {
    delay = delay | 0;
  }

  let timer: NodeJS.Timeout | null = null;
  let isFirst = true;
  return function <T>(this: any, ...args: T[]) {
    timer && clearTimeout(timer);

    if (immediate && isFirst) {
      isFirst = false;
      fn.apply(this, args);
      return;
    }

    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};

/**
 * @description 柯里化：将多变量函数拆解为单变量（或部分变量）的多个函数并依次调用
 * @param fn
 * @param args
 * @returns
 */
export const curry = (fn: Function, ...args: any[]) => {
  const length = fn.length;

  if (args.length < length) {
    return function (...params: any[]) {
      return curry(fn, ...args, ...params);
    };
  }

  return fn(...args);
};

/**
 * @description 将文件切片
 * @param {File} file 文件对象
 * @param {number} [start = 0] 从文件的哪里开始，默认0
 * @param {number} [piece = 1024 * 512] 每一块大小，默认512k
 * @returns {Blob[]} 返回一个文件切片数组
 */
export const fileSlice = (
  file: File,
  start: number = 0,
  piece: number = 1024 * 512
): Blob[] => {
  const total = file.size;
  let end = start + piece;

  // 结束位置不能超出文件大小
  if (end > total) {
    end = total;
  }

  const chunks: Blob[] = [];
  while (end <= total) {
    const blob = file.slice(start, end);
    chunks.push(blob);

    if (end === total) {
      break;
    }

    start = end;
    end = start + piece;

    // 结束位置不能超出文件大小
    if (end > total) {
      end = total;
    }
  }

  return chunks;
};

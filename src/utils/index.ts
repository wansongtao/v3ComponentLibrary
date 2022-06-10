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

/**
 * @description 希尔排序，改变原数组
 * @param arr 待排序的数组
 * @param [fn] 比较函数，如：降序 (a, b) => a - b > 0
 * @returns
 */
export const shellSort = <T = number>(
  arr: T[],
  fn?: (a: T, b: T) => boolean
): T[] => {
  if (arr.length < 2) {
    return arr;
  }

  // 设置动态间隔
  let h = 1;
  while (h < arr.length / 3) {
    h = h * 3 + 1;
  }

  while (h > 0) {
    for (let i = 0; i < arr.length; i++) {
      let prevIdx = i - h;
      const currVal = arr[i];

      while (
        prevIdx >= 0 &&
        (fn instanceof Function
          ? fn(currVal, arr[prevIdx])
          : arr[prevIdx] > currVal)
      ) {
        arr[prevIdx + h] = arr[prevIdx];
        prevIdx -= h;
      }

      arr[prevIdx + h] = currVal;
    }

    h = (h - 1) / 3;
  }

  return arr;
};

/**
 * @description 预加载图片
 * @param imgs 图片列表
 * @returns 全部加载成功resolve()，有一张图片加载失败reject(url)
 */
export const preloadingImgs = (imgs: string[]) => {
  /**
   * @description 加载图片
   * @param url
   * @returns 成功resolve()，失败reject(url)
   */
  const loadImg = (url: string) => {
    return new Promise<void>((resolve, reject) => {
      const imgEle = new Image();

      imgEle.onload = () => {
        resolve();
      };

      imgEle.onerror = () => {
        reject(url);
      };

      imgEle.src = url;
    });
  };

  return Promise.all(imgs.map((item) => loadImg(item)));
};

/**
 * @description 时区转换
 * @param time 待转换时间
 * @param [timeZone=8] 转换为哪个时区，默认东八区(东区传入1至12，西区传入-1~-12)
 * @param [currTimeZone] 当前时区，默认本地时区(东区传入1至12，西区传入-1~-12)
 * @returns 返回对应时区时间
 */
export const convertTimeZone = (
  time: Date | string | number,
  timeZone: number = 8,
  currTimeZone?: number
) => {
  let newTime: Date | null = null;

  if (time instanceof Date) {
    newTime = time;
  } else if (typeof time === 'string') {
    // 在safari中，Date构造函数不能识别‘-’
    const str = time.replace('-', '/');
    newTime = new Date(str);

    if (isNaN(newTime as unknown as number)) {
      throw new Error('time argument error');
    }
  } else if (typeof time === 'number') {
    newTime = new Date(time);

    if (isNaN(newTime as unknown as number)) {
      throw new Error('time argument error');
    }
  } else {
    throw new TypeError('time argument type error');
  }

  if (timeZone < -12 || timeZone > 12) {
    throw new Error('timeZone argument error');
  }

  let offset = 0; // 传入时间与格林威治时间的时间差，单位毫秒
  if (currTimeZone === undefined) {
    // 获取本地时间与格林威治时间的时间差
    offset = new Date().getTimezoneOffset() * 60 * 1000;
  } else if (currTimeZone >= -12 && currTimeZone <= 12) {
    offset -= currTimeZone * 60 * 60 * 1000;
  } else {
    throw new Error('currTimeZone argument error');
  }

  const locale = newTime.getTime() + offset + timeZone * 60 * 60 * 1000;
  return new Date(locale);
};

/**
 * @description 是否为闰年
 * @param year 年份
 * @returns 是true，否false
 */
export const isLeapYear = (year: number) => {
  // 能被400整除为闰年
  if (year % 400 === 0) {
    return true;
  }

  // 能被4整除但不能被100整除为闰年
  if (year % 4 === 0 && year % 100 !== 0) {
    return true;
  }

  return false;
};

/**
 * @description 深拷贝实现(支持Map、Set、RegExp、Date、Function类型和循环引用，不会拷贝symbol属性)
 * @param obj 需要深拷贝的对象
 * @returns 返回一个新对象
 */
export const deepClone = <T = any>(obj: T): T => {
  // 用来保存引用关系，解决循环引用问题
  const copyObj: any = {};

  const clone = (data: any) => {
    // 简单数据类型直接返回值
    if (!(data instanceof Object)) {
      return data;
    }

    const newObj: any = Array.isArray(data) ? [] : {};

    for (const key in data) {
      // 跳过原型上的属性
      if (!data.hasOwnProperty(key)) {
        continue;
      }

      // 简单数据类型直接返回值
      if (!(data[key] instanceof Object)) {
        newObj[key] = data[key];
        continue;
      }

      if (data[key] instanceof Date) {
        newObj[key] = new Date(data[key].getTime());
        continue;
      }

      if (data[key] instanceof RegExp) {
        newObj[key] = new RegExp(data[key]);
        continue;
      }

      if (data[key] instanceof Function) {
        newObj[key] = new Function(`return ${data[key].toString()}`)();
        continue;
      }

      if (data[key] instanceof Map) {
        newObj[key] = new Map();

        data[key].forEach((val: any, mapKey: any) => {
          if (!(mapKey instanceof Object) && !(val instanceof Object)) {
            newObj[key].set(mapKey, val);
          } else {
            newObj[key].set(clone(mapKey), clone(val));
          }
        });

        continue;
      }

      if (data[key] instanceof Set) {
        newObj[key] = new Set();
        data[key].forEach((val: any) => {
          if (!(val instanceof Object)) {
            newObj[key].add(val);
          } else {
            newObj[key].add(clone(val));
          }
        });

        continue;
      }

      // 判断是否为循环引用
      if (copyObj[key] === data[key]) {
        newObj[key] = data[key];
        continue;
      }

      copyObj[key] = data[key];
      newObj[key] = clone(data[key]);
    }

    return newObj;
  };

  return clone(obj);
};

/**
 * @description 创建a标签下载文件
 * @param url 下载地址
 * @param [filename] 自定义下载文件名
 */
export const createAEleDownloadFile = (url: string, filename?: string) => {
  const aElement = document.createElement('a');
  aElement.download = filename || Date.now().toString();
  aElement.href = url;
  aElement.click();
};

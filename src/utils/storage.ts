/**
 * 为什么不支持加密存储？
 * 1.单一职责，只负责存储，不管存储什么样的数据。
 * 2.加密需要引入库，会增加代码大小和复杂度，但这不是必要的。
 * 3.加密功能，完全可以另外封装一个方法，将数据加密后再行存储，而不是耦合到存储方法中！
 */

/** */
type ISession = 'sessionStorage';
type ILocal = 'localStorage';

interface IConfig<T> {
  key: string;
  value: T;
  type?: ISession | ILocal;
  maxAge?: number;
  prefix?: string;
}

/**
 * 默认前缀
 */
const PREFIX = 'v3-';
const MODE_SESSION: ISession = 'sessionStorage';
// const MODE_LOCAL: ILocal = 'localStorage';

/**
 * 本地/会话存储，支持设置过期时间
 * @param config
 * @param config.type 默认本地存储
 * @param config.key 键
 * @param config.value 值
 * @param [config.maxAge] 多少秒后过期
 * @param [config.prefix] 前缀，不传入将使用设置的默认前缀
 * @returns
 */
export const setStorage = <T = any>(config: IConfig<T>) => {
  const storage = { data: config.value, expire: 0 };

  if (config.maxAge) {
    storage.expire = Date.now() + config.maxAge * 1000;
  }

  try {
    const value = JSON.stringify(storage);
    const name =
      config.prefix === undefined
        ? `${PREFIX}${config.key}`
        : `${config.prefix}${config.key}`;

    if (config.type === MODE_SESSION) {
      sessionStorage.setItem(name, value);
      return;
    }

    localStorage.setItem(name, value);
  } catch (ex) {
    console.error(ex);
  }
};

/**
 * 取出本地/会话存储中未过期的数据，已过期、未找到返回null
 * @param key
 * @param type 默认本地存储
 * @param prefix 前缀，不传则采用设置的默认前缀
 * @returns
 */
export const getStorage = <T = any>(
  key: string,
  type?: ISession | ILocal,
  prefix: string = PREFIX
): T | null => {
  const name = `${prefix}${key}`;
  const storage =
    type === MODE_SESSION
      ? sessionStorage.getItem(name)
      : localStorage.getItem(name);

  if (storage === null) {
    console.error(`not found ${name}`);
    return null;
  }

  const value: { data: T; expire: number } = JSON.parse(storage);
  if (value.expire && value.expire <= Date.now()) {
    console.error(`${name}: data expired!`);
    return null;
  }

  return value.data;
};

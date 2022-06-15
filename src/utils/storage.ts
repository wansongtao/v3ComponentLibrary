interface IConfig<T> {
  key: string;
  value: T;
  type?: 'session' | 'local';
  maxAge?: number;
}

/**
 * 本地/会话存储，支持设置过期时间
 * @param config 
 * @param config.type 默认本地存储
 * @param config.key
 * @param config.value
 * @param [config.maxAge] 多少秒后过期
 * @returns 
 */
export const setStorage = <T = any>(config: IConfig<T>) => {
  const storage = { data: config.value, expire: 0 };

  if (config.maxAge) {
    storage.expire = Date.now() + config.maxAge * 1000;
  }

  try {
    const value = JSON.stringify(storage);

    if (config.type === 'session') {
      sessionStorage.setItem(config.key, value);
      return;
    }

    localStorage.setItem(config.key, value);
  } catch (ex) {
    console.error(ex);
  }
};

/**
 * 取出本地/会话存储中未过期的数据，已过期、未找到返回null
 * @param key 
 * @param type 默认本地存储
 * @returns 
 */
export const getStorage = <T = any>(key: string, type?: 'local' | 'session'): T | null => {
  let storage: string | null = '';
  if (type === 'session') {
    storage = sessionStorage.getItem(key);
  } else {
    storage = localStorage.getItem(key);
  }

  if (!storage) {
    console.error(`not found ${key}`);
    return null;
  }

  const data: { data: T, expire: number } = JSON.parse(storage);
  if (data.expire && data.expire <= Date.now()) {
    return null;
  }

  return data.data;
}

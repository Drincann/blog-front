const RUNTIME_CACHE_PERFIX = '$RUNTIME_CACHE_';
/**
 * 依赖 localstorage 实现的运行时缓存
 */
const save = (namespace: string, object: Record<string, any>) => {
  try {
    localStorage.setItem(RUNTIME_CACHE_PERFIX + namespace, JSON.stringify(object));
  } catch { }
};

const load = (namespace: string) => {
  try {
    return JSON.parse(localStorage.getItem(RUNTIME_CACHE_PERFIX + namespace) ?? '{}');
  } catch { }
  return {};
};

export const cacheFactory = {
  create: (namespace: string) => {
    const cache = new Proxy(load(namespace), {
      set: (target, key, value) => {
        target[key] = value;
        save(namespace, target);
        return true;
      },
      get: (target, key) => target[key],
    });
    return cache;
  }
}

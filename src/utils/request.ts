import axios, { AxiosError } from 'axios';
import messageNotice from './message';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000,
  withCredentials: true
});

instance.interceptors.request.use(
  (config) => {
    // 发送请求前做些什么
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    const data = res.data;

    return data;
  },
  (error: AxiosError) => {
    // 超出 2xx 范围的http状态码都会触发该函数
    messageNotice({
      content: error.response?.statusText,
      type: 'error'
    });

    return Promise.reject(error);
  }
);

export default instance;

import instance from '@/utils/request';
import { IBaseResponse } from './types/interface';

export const test = <T = any>(): Promise<IBaseResponse<T>> => {
  return instance.get('');
};

export const login = <T = any>() => {
  return instance.request<IBaseResponse<T>>({
    url: '',
    method: 'post'
  });
};


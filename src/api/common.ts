import instance from "@/utils/request";

export const test = <T = any,>(): Promise<{code: number, message: string, data: T}> => {
  return instance.get('');
}

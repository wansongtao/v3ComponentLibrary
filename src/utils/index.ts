/**
 * @description 获取传入数据的类型，小写字符串
 * @param obj 
 * @returns 
 */
export const getDataType = (obj: any): string => {
  let res = Object.prototype.toString.call(obj).split(' ')[1];
  res = res.substring(0, res.length -1).toLowerCase();
  return res;
};
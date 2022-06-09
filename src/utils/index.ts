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
  const selected = selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : false;

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

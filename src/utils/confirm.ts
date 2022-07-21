import { Modal, ModalFuncProps } from 'ant-design-vue';
import 'ant-design-vue/es/modal/style/css';

/**
 * 确认框
 * @param config 详见Ant Design Vue的modal组件参数
 * @returns 点击确定resolve()，反之reject()
 */
const showConfirm = (config?: ModalFuncProps) => {
  return new Promise<void>((resolve, reject) => {
    const defaultConfig = {
      title: '删除提示',
      cancelText: '取消',
      okText: '确定',
      content: '此操作将永久删除该数据, 是否继续?',
      closable: true,
      onOk() {
        resolve();
      },
      onCancel() {
        reject();
      }
    };
  
    let obj = {...defaultConfig};
    if (config) {
      obj = Object.assign(obj, config);
    }
  
    Modal.confirm(obj);
  });
};

export default showConfirm;

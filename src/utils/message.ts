import { message, MessageArgsProps } from 'ant-design-vue';
import 'ant-design-vue/es/message/style/css';

/**
 * @description 全局提示，ant-design的message组件
 * @param config 
 */
const messageNotice = (config: MessageArgsProps) => {
  message.open(config);
};

export default messageNotice;
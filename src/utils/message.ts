import { message, MessageArgsProps } from 'ant-design-vue';
import 'ant-design-vue/es/message/style/css';

/**
 * @description 全局提示，ant-design的message组件
 * @param config 
 * @param {string | VueNode} config.content
 * @param {number} [config.duration] 自动关闭的延时，单位秒。设为 0 时不自动关闭。
 * @param {string} [config.type] 'info' | 'success' | 'error' | 'warning' | 'loading'
 * @param {string} [config.prefixCls]
 * @param {string} [config.rootPrefixCls]
 * @param {Function} [config.getPopupContainer]
 * @param {Function} [config.onClose]
 * @param {Function | VueNode} [config.icon]
 * @param {string | number} [config.key]
 * @param {CSSProperties} [config.style]
 * @param {string} [config.class]
 * @param {any} [config.appContext]
 * @param {Function} [config.onClick]
 * @returns 返回一个函数，可以调用该函数关闭弹窗
 */
const messageNotice = (config: MessageArgsProps) => {
  return message.open(config);
};

export default messageNotice;
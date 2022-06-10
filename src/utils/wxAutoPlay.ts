/**
 * @description 用微信打开网页时自动播放音视频
 * @param {HTMLAudioElement | HTMLVideoElement} av 音视频对象
 */
const autoPlay = (av: HTMLAudioElement | HTMLVideoElement) => {
  try {
    if (
      typeof WeixinJSBridge !== 'object' &&
      typeof WeixinJSBridge.invoke !== 'function'
    ) {
      return;
    }

    WeixinJSBridge.invoke('getNetworkType', {}, () => {
      av.play();
    });
  } catch (ex) {
    console.error(ex, 'WeixinJSBridge');
  }
};

export default autoPlay;
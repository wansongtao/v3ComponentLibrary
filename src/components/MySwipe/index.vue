<script lang="ts" setup>
import {
  onMounted,
  onBeforeUnmount,
  ref,
  reactive,
  toRefs,
  provide
} from 'vue';
import MySwipeItem from '../MySwipeItem/index.vue';

interface Props {
  loop?: boolean;
  autoplay?: number;
  duration?: number;
  showIndicators?: boolean;
  indicatorClass?: string;
  activeIndicatorClass?: string;
  width?: number;
}

const props = withDefaults(defineProps<Props>(), {
  loop: true,
  autoplay: 1500,
  duration: 500,
  showIndicators: true,
  indicatorClass: 'swipe_indicator_item',
  activeIndicatorClass: 'swipe_indicator_item--active',
  width: 0
});
// 每一页轮播结束后触发change事件，抛出当前页的索引
const emit = defineEmits<{ (e: 'change', idx: number): void }>();
// 将轮播的每一项的宽度传给子组件
provide('width', props.width);

/**
 * @description 轮播的dom元素实例
 */
const swipeEle = ref<HTMLDivElement | null>(null);
const swipe = reactive<{
  total: number;
  activeIdx: number;
  timer: NodeJS.Timer | null;
}>({
  total: 0, // 轮播页的总数
  activeIdx: 0,
  timer: null
});

/**
 * @description 更改当前活动索引
 * @param {number} idx 轮播页索引
 */
const setActiveIdx = (idx: number) => {
  if (idx < 0 || idx > swipe.total) {
    return;
  }

  swipe.activeIdx = idx;
};

/**
 * @description 自动轮播
 */
const setAutoPlay = () => {
  swipe.timer = setInterval(() => {
    swipe.activeIdx++;

    swipeTo(
      swipeEle.value as HTMLDivElement,
      props.duration,
      swipe.activeIdx,
      props.width
    );

    // 动画结束后，抛出change事件
    setTimeout(() => {
      emit('change', swipe.activeIdx);
    }, props.duration);
  }, props.autoplay);
};

onMounted(() => {
  // 获取轮播的项目数
  swipe.total = (swipeEle.value as HTMLDivElement).childElementCount;

  if (props.width) {
    (swipeEle.value as HTMLDivElement).setAttribute(
      'style',
      `width: ${swipe.total * props.width}px;`
    );
  }

  if (props.loop) {
    setAutoPlay();
  }
});

const handlerStopLoop = () => {
  if (!swipe.timer) {
    return;
  }
  clearInterval(swipe.timer);
};

const handlerStartLoop = () => {
  if (!props.loop) {
    return;
  }

  setAutoPlay();
};

const handlerGoPage = (idx: number) => {
  if (idx < -1 || idx > swipe.total) {
    return;
  }

  swipe.activeIdx = idx;

  swipeTo(swipeEle.value as HTMLDivElement, props.duration, idx, props.width);

  // 动画结束后，抛出change事件
  setTimeout(() => {
    emit('change', swipe.activeIdx);
  }, props.duration);
};

onBeforeUnmount(() => {
  if (!swipe.timer) {
    return;
  }

  clearInterval(swipe.timer);
});

/**
 * @description 切换到指定页码
 * @param {HTMLElement} ele 轮播的dom元素实例
 * @param {number} duration 动画持续时间，单位ms
 * @param {number} idx 页码
 * @param {number} [width] 每一页的宽度
 */
function swipeTo(
  ele: HTMLDivElement,
  duration: number,
  idx: number,
  width?: number
) {
  const childTotal = ele.childElementCount;
  const childWidth = width || (ele.children[0] as HTMLElement).offsetWidth;
  const moveDistance = childWidth * idx;
  let style = '';
  if (width) {
    style = `width: ${width * childTotal}px;`;
  }

  // 使用过渡动画切换到指定页码
  ele.setAttribute(
    'style',
    `${style}transition-duration: ${duration}ms; transform: translateX(${-moveDistance}px);`
  );

  // 从最后一个切换到第一个，需要做特殊处理，以实现无缝滚动的效果
  if (idx === childTotal) {
    // 将第一个子元素移动到最后一个元素的后面
    ele.children[0].setAttribute(
      'style',
      `width: ${childWidth}px; transform: translateX(${moveDistance}px);`
    );

    setActiveIdx(0);

    // 当移动到第一项时，等动画结束后，重置样式
    setTimeout(() => {
      ele.setAttribute('style', `${style}transform: translateX(0px);`);
      ele.children[0].setAttribute('style', `width: ${childWidth}px; `);
    }, duration);
    return;
  }

  // 从第一个切换到最后一个，做特殊处理以实现无缝滚动效果
  if (idx === -1) {
    const moveWidth = (childTotal - 1) * childWidth;

    ele.children[childTotal - 1].setAttribute(
      'style',
      `width: ${childWidth}px; transform: translateX(-${
        childWidth * childTotal
      }px);`
    );

    setActiveIdx(childTotal - 1);

    setTimeout(() => {
      ele.children[childTotal - 1].setAttribute(
        'style',
        `width: ${childWidth}px;`
      );
      ele.setAttribute(
        'style',
        `${style}transform: translateX(-${moveWidth}px);`
      );
    }, duration);
    return;
  }
}

const { activeIdx, total } = toRefs(swipe);
defineExpose({
  handlerGoPage
});
</script>

<template>
  <div
    class="swipe"
    :style="width ? `width: ${width}px;` : ''"
    @mouseover.stop="handlerStopLoop"
    @mouseleave.stop="handlerStartLoop"
  >
    <div ref="swipeEle" class="swipe_track">
      <slot>
        <MySwipeItem
          ><div style="width: 100%; height: 200px; background: red"></div
        ></MySwipeItem>
        <MySwipeItem
          ><div style="width: 100%; height: 200px; background: #333"></div
        ></MySwipeItem>
        <MySwipeItem
          ><div style="width: 100%; height: 200px; background: orange"></div
        ></MySwipeItem>
        <MySwipeItem
          ><div style="width: 100%; height: 200px; background: #999"></div
        ></MySwipeItem>
      </slot>
    </div>
    <div
      class="swipe_arrow swipe_arrow--left"
      @click="handlerGoPage(activeIdx - 1)"
    >
      <slot name="arrow-left">
        <span class="arrow_icon--left"></span>
      </slot>
    </div>
    <div
      class="swipe_arrow swipe_arrow--right"
      @click="handlerGoPage(activeIdx + 1)"
    >
      <slot name="arrow-right">
        <span class="arrow_icon--right"></span>
      </slot>
    </div>
    <div class="swipe_indicator" v-if="showIndicators">
      <!-- :idx="index" 为父级提供插槽数据 -->
      <slot name="indicator" v-for="(item, index) in total" :idx="index">
        <i
          :class="{
            [indicatorClass]: true,
            [activeIndicatorClass]: activeIdx === index
          }"
          :key="index"
        ></i>
      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.swipe {
  position: relative;
  overflow: hidden;

  .swipe_track {
    display: flex;
    height: 100%;
  }

  .swipe_indicator {
    position: absolute;
    bottom: 12px;
    left: 50%;
    display: flex;
    transform: translateX(-50%);

    .swipe_indicator_item--active {
      background: rgba(0, 0, 0, 0.6);
    }
  }

  .swipe_arrow {
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.6);
  }

  .swipe_arrow--left {
    left: 20px;

    .arrow_icon--left {
      position: relative;
      left: -5px;
      width: 0;
      height: 0;
      border-right: 8px solid #fff;
      border-left: 8px solid transparent;
      border-top: 8px solid transparent;
      border-bottom: 8px solid transparent;
    }
  }

  .swipe_arrow--right {
    right: 20px;

    .arrow_icon--right {
      position: relative;
      left: 5px;
      width: 0;
      height: 0;
      border-left: 8px solid #fff;
      border-right: 8px solid transparent;
      border-top: 8px solid transparent;
      border-bottom: 8px solid transparent;
    }
  }
}

.swipe_indicator_item {
  margin-right: 6px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
}
</style>

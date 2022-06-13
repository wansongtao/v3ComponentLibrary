<script lang="ts" setup>
import MySwipe from '@/components/MySwipe/index.vue';
import MySwipeItem from '@/components/MySwipeItem/index.vue';

const handlerChangeState = (idx: number) => {
  console.log(idx);
}
</script>

<template>
  <div class="swipe_demo">
    <MySwipe :loop="true" :autoplay="3000" :duration="1000" indicatorClass="indicator" @change="handlerChangeState">
      <MySwipeItem>
        <div class="swipe_item" style="background: salmon;">1</div>
      </MySwipeItem>
      <MySwipeItem>
        <div class="swipe_item" style="background: rosybrown;">2</div>
      </MySwipeItem>
      <MySwipeItem>
        <div class="swipe_item" style="background: orange;">3</div>
      </MySwipeItem>
      <MySwipeItem>
        <div class="swipe_item" style="background: gray;">4</div>
      </MySwipeItem>
      <!-- 自定义指示器(data为子组件传出来的数据，idx为子组件定义的属性名称) -->
      <!-- <template v-slot:indicator="data">
        <div>{{data.idx}}</div>
      </template> -->
      <!-- <template v-slot:arrow-left>
        hihih
      </template> -->
    </MySwipe>
  </div>
</template>

<style lang="scss" scoped>
.swipe_demo {
  margin: 50px auto;
  width: 600px;
  height: 200px;
  border: 1px solid #eee;
}

.swipe_item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 200px;
}

:deep(.indicator) {
  margin-right: 6px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(247, 224, 224, 0.6);
}
</style>

<script lang="ts" setup>
import { inject, ref } from 'vue';

const width = inject<number>('width');
const style = ref('');

if (width) {
  style.value = `width: ${width}px;`;
}
</script>

<template>
  <div class="swipe_item" :style="style">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.swipe_item {
  position: relative;
  flex-shrink: 0;
  width: 100%;
  height: 100%;
}
</style>

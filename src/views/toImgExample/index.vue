<script setup lang="ts">
import { ref } from 'vue';
import domToImage from '../../utils/domToImg';

const ele = ref<HTMLElement | null>(null);
const imgUrl = ref('');
const loading = ref(false);
const onGetImg = () => {
  loading.value = true;

  domToImage(ele.value as HTMLElement, {scale: 1}).then((url) => {
    imgUrl.value = url;
    loading.value = false;
  }).catch(() => {
    loading.value = false;
  });
};
</script>

<template>
  <div class="toimg_box" ref="ele">
    <p>不过是大梦一场空</p>
    <p>不过是孤影照惊鸿</p>
    <p>不过是白驹之过一场梦</p>
    <p>有道是万物皆虚空</p>
  </div>
  <n-button type="primary" :loading="loading" @click="onGetImg"> 生成图片 </n-button>
  <div class="box" v-show="imgUrl">
    <h4>生成的图片</h4>
    <img :src="imgUrl" alt="" class="box_img">
  </div>
</template>

<style lang="scss" scoped>
.toimg_box {
  margin: 20px auto;
  padding: 5px 10px;
  width: 300px;
  border: 1px dotted #666;

  p {
    font-size: 14px;
  }
}

.box {
  margin: 20px auto;

  .box_img {
    display: block;
    margin: 10px auto;
    width: 300px;
  }
}
</style>

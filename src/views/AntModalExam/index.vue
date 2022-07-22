<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(false);
const onSuccess = () => {
  console.log('success');
}
</script>

<template>
  <a-button type="primary" @click="visible = true">弹出</a-button>
  <AntModal v-model:visible="visible" @update-success="onSuccess">
    <p>哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</p>
  </AntModal>
</template>

<style lang="scss" scoped>

</style>
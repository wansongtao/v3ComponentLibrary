<script lang="ts" setup>
import FileSelector from '@/components/FileSelector/index.vue';

const onGetFiles = (files: File[]) => {
  console.log(files);
};
</script>

<template>
  <!-- 外面套一层div，才能用深度选择器修改样式 -->
  <div>
    <FileSelector
      accept="image/*"
      :drag="true"
      :multiple="true"
      :limit="3"
      @change="onGetFiles"
    >
      图片
    </FileSelector>
  </div>
</template>

<style lang="scss" scoped>
:deep(.file_btn) {
  border: 1px dotted #666;
}
</style>

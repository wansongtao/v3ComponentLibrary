<script lang="ts" setup>
import { ref } from 'vue';
import FileSelector from '@/components/FileSelector/index.vue';

const fileEle = ref<InstanceType<typeof FileSelector> | null>(null);

const onGetFiles = (files: File[]) => {
  console.log(files);
};
</script>

<template>
  <!-- 外面套一层div，才能用深度选择器修改样式 -->
  <div>
    <FileSelector
      ref="fileEle"
      accept="image/*"
      :drag="true"
      :multiple="true"
      :limit="3"
      @change="onGetFiles"
    >
      图片
      <!-- <template v-slot:default="{ disabled }">
        <AButton type="primary" block :disabled="disabled">导入表格</AButton>
      </template> -->
    </FileSelector>
  </div>
</template>

<style lang="scss" scoped>
:deep(.default_btn) {
  border: 1px dotted #666;
}
</style>

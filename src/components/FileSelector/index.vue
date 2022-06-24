<script lang="ts" setup>
import { DragNodeEvent } from 'ant-design-vue/lib/vc-tree/interface';
import { ref } from 'vue';
const props = defineProps({
  /**
   * @description 是否允许选择多个文件
   */
  multiple: {
    type: Boolean,
    default: false
  },
  /**
   * @description 唯一文件类型说明符，请参考w3c
   */
  accept: String,
  /**
   * @description 最大允许选择文件个数
   */
  limit: {
    type: Number,
    validator(value: number) {
      return value > 0 && Number.isInteger(value);
    }
  },
  /**
   * @description 是否启用拖拽获取文件信息
   */
  drag: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits(['change']);

const disabled = ref(false);
const fileEle = ref<HTMLInputElement | null>(null);

const onOpenFileDialog = () => {
  if (!fileEle.value) {
    return;
  }

  if (disabled.value) {
    return;
  }

  fileEle.value.click();
};

const files = ref<File[]>([]);
const saveFileInfo = (checkedFiles: File[]) => {
  if (!checkedFiles.length) {
    return;
  }

  // 单选
  if (!props.multiple) {
    if (files.value.length >= 1) {
      return;
    }
    disabled.value = true;
    files.value = checkedFiles;
    emit('change', files.value);
    return;
  }

  // 多选未限制个数
  if (props.multiple && !props.limit) {
    files.value.push(...checkedFiles);
    emit('change', files.value);
    return;
  }

  // 多选，限制了个数
  if (files.value.length >= (props.limit as number)) {
    return;
  }
  const total = files.value.length + checkedFiles.length;
  if (total >= (props.limit as number)) {
    disabled.value = true;
  }
  const all = [...files.value, ...checkedFiles];
  all.splice(props.limit as number);
  files.value = all;
  emit('change', files.value);
  return;
};

const deleteFile = (idx: number) => {
  if (idx < 0 || idx >= files.value.length) {
    return;
  }

  files.value.splice(idx, 0);

  if (disabled.value) {
    disabled.value = false;
  }
};

const clearFiles = () => {
  disabled.value = false;
  files.value = [];
};

const onSelectFile = (e: any) => {
  const checkedFiles = e.target.files;
  saveFileInfo(checkedFiles);
};
const onDragFile = (e: any) => {
  const checkedFiles = e.dataTransfer.files;
  saveFileInfo(checkedFiles);
};

defineExpose({
  onOpenFileDialog,
  deleteFile,
  clearFiles
});
</script>

<template>
  <input
    ref="fileEle"
    type="file"
    name="files"
    :multiple="multiple"
    :accept="accept"
    class="file_input"
    @change="onSelectFile"
  />
  <div
    class="file_btn"
    :class="disabled ? 'file_btn--stop' : ''"
    @click="onOpenFileDialog"
    v-if="!drag"
  >
    <slot :disabled="disabled"> 选择文件 </slot>
  </div>
  <div
    class="file_btn"
    :class="disabled ? 'file_btn--stop' : ''"
    @click="onOpenFileDialog"
    @dragenter.prevent
    @dragover.prevent
    @drop.prevent="onDragFile"
    v-if="drag"
  >
    <slot :disabled="disabled"> 选择文件 </slot>
  </div>
</template>

<style lang="scss" scoped>
.file_input {
  display: none;
}
.file_btn {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: 100px;
  height: 100px;
  border: 1px solid #eee;
  cursor: pointer;
}
.file_btn--stop:hover {
  cursor: not-allowed;
}
</style>
